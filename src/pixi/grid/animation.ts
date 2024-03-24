import gsap from 'gsap'
import { Container, Sprite } from 'pixi.js'

import { getStore } from '#pixi/store'
import { R } from '#src/utils'

interface AnimateSpriteIdleProps {
  container: Container
  x: number
}

const animateSpriteIdle = ({ container, x }: AnimateSpriteIdleProps) => {
  const { app } = getStore()
  gsap.to(container, {
    x,
    y: app.renderer.height + R(40, 100), // to bottom w/ offset
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
    delay: R(0, 2),
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
  sprite: Sprite
  x: number
  y: number
}

const animateHoverOut = ({ container, sprite, x, y }: AnimateHoverOutProps) => {
  const { app, tileWidth } = getStore()

  gsap.to(container, {
    y: app.renderer.height + R(40, 100), // to bottom
    alpha: 0,
    rotation: (R(-60, 60) * Math.PI) / 180,
    ease: 'circ.in',
    duration: R(0.4, 1),
    onComplete: () => {
      gsap.set(container, {
        x,
      })
      gsap.set(sprite, {
        x: 0,
        y: 0,
      })
      animateSpriteIn({
        container,
        x,
        y,
        tileWidth,
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
  const widthToRendererRatio = 100
  const heightToRendererRatio = 100

  // todo: potential performance bottleneck
  // try to improve this by storing playing / pausing timelines within the tile store
  // instead of killing / adding tweens all over the place
  if (gsap.isTweening(sprite)) return
  gsap.killTweensOf(sprite)
  gsap.killTweensOf(container)

  gsap.to(sprite, {
    x: Math.random() > 0.5 ? -widthToRendererRatio : widthToRendererRatio,
    y: Math.random() > 0.5 ? -heightToRendererRatio : heightToRendererRatio,
    ease: 'circ.out',
    duration: R(0.4, 1),
    onComplete: () => {
      animateHoverOut({
        container,
        sprite,
        x,
        y,
      })
    },
  })
}

interface AnimateScaleIdleProps {
  container: Container
}

const animateScaleIdle = ({ container }: AnimateScaleIdleProps) => {
  const scaleShared = R(0.3, 1)
  gsap.to(container.scale, {
    x: scaleShared,
    y: scaleShared,
    delay: R(0, 2),
    duration: R(0.6, 1),
    repeat: -1,
    yoyo: true,
  })
}

export const startGridAnimations = () => {
  const { tiles, app, tileWidth } = getStore()

  tiles.forEach(tile => {
    const { container, x, y } = tile

    // set values to tween from
    gsap.set(container, {
      x,
      y: app.renderer.height + R(40, 100), // to bottom
      alpha: 0,
      rotation: (R(-60, 60) * Math.PI) / 180,
    })

    animateScaleIdle({ container })
    animateSpriteIn({
      container,
      x,
      y,
      tileWidth,
    })
  })
}

export const triggerAnimateTile = (triggerIDs: number[]) => {
  const { tiles, tileWidth } = getStore()

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
