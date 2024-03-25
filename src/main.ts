import { initStage } from '#pixi/initStage'

import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>here starts the client sided pixi v8 stage - <span id="tileCount"></span>✨</div>
  <div class="relative bg-dark">
    <div class="absolute inset-0 z-10 pointer-events-none">
      <div class="flex justify-center items-center h-full text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">come try hover</div>
    </div>
    <div id="stage" class="border border-2 border-darkLight lg:h-2xl z-1 relative" style="height: 60vh"></div>
  </div>
`

if (document.readyState !== 'loading') {
  const stage = document.querySelector<HTMLDivElement>('#stage')
  initStage(stage)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector<HTMLDivElement>('#stage')
    initStage(stage)
  })
}
