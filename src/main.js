import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { faEdit, faTrash,faThumbsUp,faThumbsDown} from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrash,faThumbsUp,faThumbsDown)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use( createPinia() )              
app.mount('#app')
