import gsap from 'gsap'
import { Application } from 'pixi.js'

import { getStore } from '#pixi/store'
import { Tile } from '#pixi/types'
import { PixiConfig } from '#src/lib/constants'
import { R } from '#src/utils'

export enum TIMELINE {
  IDLE,
  HOVER,
}

export type Timelines = {
  [key in TIMELINE]: gsap.core.Timeline
}

interface CreateTimelinesProps {
  tiles: Tile[]
  app: Application
}

export const createTimelines = async ({ tiles, app }: CreateTimelinesProps) => {
  const { tileWidth } = PixiConfig
  const timelinesList: Timelines[] = []

  tiles.forEach(tile => {
    const timelines: Timelines = {
      [TIMELINE.IDLE]: gsap.timeline({
        repeat: -1,
      }),
      [TIMELINE.HOVER]: gsap.timeline({
        paused: true,
        onComplete: () => {
          timelines[TIMELINE.IDLE].progress(0)
          timelines[TIMELINE.IDLE].play()
          timelines[TIMELINE.HOVER].pause()
        },
      }),
    }

    const tileInDuration = R(1.6, 2.5)
    const delayIn = R(0, 2)
    const scaleIn = R(1, 1.2)
    const scaleOut = R(0.3, 0.8)
    const skewXOut = R(-10, 10)
    const skewYOut = R(-10, 10)

    const scaleHover = R(1.3, 1.7)
    const hoverInDuration = R(0.3, 0.8)
    const hoverOutDuration = R(0.5, 1.5)

    timelines[TIMELINE.IDLE].set(tile.container, {
      x: tile.x,
      y: app.renderer.height + R(40, 100), // to bottom
      alpha: 0,
      rotation: (R(-60, 60) * Math.PI) / 180,
    })
    timelines[TIMELINE.IDLE].set(tile.sprite, {
      x: 0,
      y: 0,
    })
    timelines[TIMELINE.IDLE].set(tile.container.skew, {
      x: skewXOut,
      y: skewYOut,
    }),
      timelines[TIMELINE.IDLE].set(tile.container.scale, {
        x: 1,
        y: 1,
      }),
      timelines[TIMELINE.IDLE].to(
        tile.container,
        {
          x: tile.x + R(0, tileWidth / 2),
          y: tile.y * 2,
          delay: delayIn,
          ease: 'circ.out',
          rotation: 0,
          duration: tileInDuration,
          alpha: R(0.5, 0.8),
        },
        'in',
      )
    timelines[TIMELINE.IDLE].to(
      tile.container.scale,
      {
        x: scaleIn,
        y: scaleIn,
        delay: delayIn,
        ease: 'circ.out',
        duration: tileInDuration,
      },
      'in',
    )
    timelines[TIMELINE.IDLE].to(
      tile.container.skew,
      {
        x: 0,
        y: 0,
        delay: delayIn,
        ease: 'circ.out',
        duration: tileInDuration,
      },
      'in',
    )
    timelines[TIMELINE.IDLE].to(
      tile.container,
      {
        x: tile.x,
        y: app.renderer.height + R(40, 100), // to bottom w/ offset
        alpha: 0,
        ease: 'circ.inOut',
        duration: tileInDuration,
        rotation: (R(-60, 60) * Math.PI) / 180,
      },
      'out',
    )
    timelines[TIMELINE.IDLE].to(
      tile.container.scale,
      {
        x: scaleOut,
        y: scaleOut,
        ease: 'circ.inOut',
        duration: tileInDuration,
      },
      'out',
    )

    /* HOVER */
    timelines[TIMELINE.HOVER].to(
      tile.container,
      {
        x: tile.x,
        y: tile.y,
        ease: 'bounce.in',
        alpha: R(0.8, 1),
        duration: hoverInDuration / 4,
      },
      'in',
    )
    timelines[TIMELINE.HOVER].to(
      tile.container.skew,
      {
        x: 0,
        y: 0,
        ease: 'bounce.in',
        duration: hoverInDuration / 4,
      },
      'in',
    )
    timelines[TIMELINE.HOVER].to(
      tile.container.scale,
      {
        x: scaleHover,
        y: scaleHover,
        ease: 'power.in',
        duration: hoverInDuration,
      },
      'in',
    )
    timelines[TIMELINE.HOVER].to(
      tile.sprite,
      {
        x: R(-50, 50),
        y: R(-50, 50),
        ease: 'power.in',
        duration: hoverInDuration,
      },
      'in',
    )
    timelines[TIMELINE.HOVER].to(
      tile.container,
      {
        x: tile.x,
        y: app.renderer.height + R(100, 200), // to bottom
        ease: 'circ.inOut',
        alpha: R(0.2, 0.5),
        duration: hoverOutDuration,
      },
      'out',
    )
    timelines[TIMELINE.HOVER].to(
      tile.container.scale,
      {
        x: scaleOut,
        y: scaleOut,
        ease: 'circ.inOut',
        duration: hoverOutDuration,
      },
      'out',
    )

    timelinesList.push(timelines)
    tiles[tile.id].timelines = timelines
  })

  return timelinesList
}

export const triggerAnimateHover = (triggerIDs: number[]) => {
  const { tiles } = getStore()

  triggerIDs.forEach(id => {
    const { timelines } = tiles[id]

    if (timelines[TIMELINE.HOVER].isActive()) return
    timelines[TIMELINE.IDLE].pause()
    timelines[TIMELINE.HOVER].progress(0)
    timelines[TIMELINE.HOVER].play()
  })
}
