import gsap from 'gsap'
import { Application } from 'pixi.js'

import { Tile } from '#pixi/types'
import { PixiConfig } from '#src/lib/constants'
import { R } from '#src/utils'

export const animateGrid = (grid: Tile[], app: Application) => {
  grid.forEach(tile => {
    const { sprite, x, y } = tile
    gsap.set(sprite, {
      x: x + R(0, PixiConfig.tileWidth / 2),
      y: app.renderer.height + R(PixiConfig.tileWidth, 100),
    })
    gsap.to(sprite.scale, {
      x: R(0, 10),
      y: R(0, 10),
      duration: R(0.6, 1),
      repeat: -1,
      yoyo: true,
    })
    // gsap.to(sprite.skew, {
    //   x: (R(-10, 10) * Math.PI) / 180,
    //   y: (R(-10, 10) * Math.PI) / 180,
    //   duration: R(0.6, 1),
    //   repeat: -1,
    //   yoyo: true,
    // })
    gsap.to(sprite, {
      duration: R(0.6, 0.1),
      alpha: R(0, 0.9),
      repeat: -1,
      yoyo: true,
    })
    gsap.to(sprite, {
      duration: R(0.6, 0.1),
      rotation: (R(-60, 60) * Math.PI) / 180,
      repeat: -1,
      // yoyo: true,
    })
    gsap.to(sprite, {
      x: x + R(0, PixiConfig.tileWidth / 2),
      y: y,
      duration: R(1.6, 2.5),
      repeat: -1,
      yoyo: true,
    })
  })
}
