import { initStage } from '#pixi/initStage'

import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="p-3">here starts the client sided pixi v8 stage ✨</div>
  <div id="stage"></div>
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
