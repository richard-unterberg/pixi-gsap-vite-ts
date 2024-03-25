import { Text, TextOptions, TextStyle, TextStyleOptions } from 'pixi.js'

import { PixiConfig } from '#src/lib/constants'
import { R } from '#src/utils'

export interface CreateTextProps {
  value: string
  x?: number
  y?: number
  anchor?: number
}

export const createText = ({ value, x = 0, y = 0, anchor = 0.5 }: CreateTextProps) => {
  const { tileWidth } = PixiConfig

  const textBaseAtts = {
    style: {
      fontFamily: 'Arial',
      fontWeight: '700',
      fontSize: R(tileWidth, tileWidth * 3),
      fill: 0xffffff,
    },
  }

  const text = new Text({
    x,
    y,
    text: value,
    anchor,
    ...textBaseAtts,
  } as TextOptions<TextStyle, TextStyleOptions>)

  return text
}
