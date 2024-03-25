import { Application, Text } from 'pixi.js'

interface CreateTextureProps {
  text: Text
  app: Application
}

export const createTexture = ({ text, app }: CreateTextureProps) => {
  const texture = app.renderer.generateTexture(text)
  return texture
}
