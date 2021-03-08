import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Custom js
/*eslint-disable */
import { firstName, lastName } from './js/my'

createApp(App).use(store).use(router).mount('#app')

console.log(firstName)
console.log(lastName)