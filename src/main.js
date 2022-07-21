import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'




createApp(App).use(store).use(router).mount('#app')
const myMixin = {
    
    computed:{
        header(){
            return {
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.access}`,
                },
            };
        }

    },
  
}
