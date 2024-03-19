import gsap from 'gsap'
import { Container, Sprite } from 'pixi.js'

import { getPixiGrid } from '#pixi/pixiGrid'
import { R } from '#src/utils'

const randomStartTimeout = (fnc: () => void) => {
  setTimeout(fnc, R(0, 2000))
}

interface AnimateSpriteIdleProps {
  container: Container
  x: number
}

const animateSpriteIdle = ({ container, x }: AnimateSpriteIdleProps) => {
  const { app } = getPixiGrid()
  gsap.to(container, {
    x,
    y: app.renderer.height + R(40, 100), // to bottom
    alpha: 0,
    ease: 'bounce.out',
    yoyoEase: 'circ.out',
    duration: R(1.6, 2.5),
    rotation: (R(-60, 60) * Math.PI) / 180,
    yoyo: true,
    repeat: -1,
  })
}

interface AnimateSpriteFadeInrops {
  container: Container
  x: number
  y: number
  tileWidth: number
}

const animateSpriteIn = ({ container, x, y, tileWidth }: AnimateSpriteFadeInrops) => {
  gsap.to(container, {
    x: x + R(0, tileWidth / 2),
    y,
    ease: 'circ.out',
    rotation: 0,
    duration: R(1.6, 2.5),
    alpha: R(0.3, 1),
    onComplete: () => {
      animateSpriteIdle({ container, x })
    },
  })
}

interface AnimateHoverOutProps {
  container: Container
  x: number
  y: number
}

const animateHoverOut = ({ container, x, y }: AnimateHoverOutProps) => {
  const { app, tileWidth } = getPixiGrid()
  gsap.to(container, {
    y: app.renderer.height + R(40, 100), // to bottom
    ease: 'circ.in',
    duration: R(0.8, 1.4),
    onComplete: () => {
      randomStartTimeout(() => {
        animateSpriteIn({
          container,
          x,
          y,
          tileWidth,
        })
      })
    },
  })
}

interface AnimateHoverInProps {
  container: Container
  sprite: Sprite
  x: number
  y: number
  tileWidth: number
}

const animateHoverIn = ({ container, sprite, x, y }: AnimateHoverInProps) => {
  const widthToRendererRatio = 200
  const heightToRendererRatio = 200

  if (gsap.isTweening(sprite)) return
  gsap.killTweensOf(container)
  gsap.killTweensOf(sprite)
  gsap.killTweensOf(sprite.scale)

  gsap.to(sprite, {
    x: Math.random() > 0.5 ? -widthToRendererRatio : widthToRendererRatio,
    y: Math.random() > 0.5 ? -heightToRendererRatio : heightToRendererRatio,
    ease: 'circ.out',
    duration: R(0.4, 1),
    onComplete: () => {
      animateHoverOut({
        container,
        x,
        y,
      })
      gsap.to(sprite, {
        x: 0,
        y: 0,
        ease: 'power.in',
        duration: R(0.8, 1.4),
      })
    },
  })
}

export const animateGrid = () => {
  const { tiles, app, tileWidth } = getPixiGrid()

  tiles.forEach(tile => {
    const { container, sprite, x, y } = tile

    gsap.killTweensOf(container)
    gsap.killTweensOf(sprite)
    gsap.killTweensOf(sprite.scale)

    // set values to tween from
    gsap.set(container, {
      x,
      y: app.renderer.height + R(40, 100), // to bottom
      alpha: 0,
      rotation: (R(-60, 60) * Math.PI) / 180,
    })

    randomStartTimeout(() => {
      animateSpriteIn({
        container,
        x,
        y,
        tileWidth,
      })
    })

    randomStartTimeout(() => {
      const scaleShared = R(0, 1)
      gsap.to(container.scale, {
        x: scaleShared,
        y: scaleShared,
        duration: R(0.6, 1),
        repeat: -1,
        yoyo: true,
      })
    })
  })
}

export const animatePointerMove = (triggerIDs: number[]) => {
  const { tiles, tileWidth } = getPixiGrid()

  triggerIDs.forEach(id => {
    const { sprite, container, x, y } = tiles[id]

    animateHoverIn({
      container,
      sprite,
      x,
      y,
      tileWidth,
    })
  })
}
