export const R = (min: number, max: number) => {
  const random = min + Math.random() * (max - min)
  return random
}
