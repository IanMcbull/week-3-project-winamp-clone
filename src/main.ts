import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'
import AudioVisual from 'vue-audio-visual'

createApp(App).use(createPinia()).use(router).use(AudioVisual).mount('#app')
