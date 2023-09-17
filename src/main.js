import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'





/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCapsules, faMoneyBillTrendUp, faUserSecret,faBox,faBorderAll,faTrash,faChartSimple,faUsers,faRightFromBracket
  ,faBell,faUser,faCartShopping,faSearch,faCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret,faCapsules,faMoneyBillTrendUp,faBox,faBorderAll,faTrash,faChartSimple,faUsers,faRightFromBracket
  ,faBell,faUser,faCartShopping,faSearch,faCheck)


const app = createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon)
app.mixin({


    computed: {
        url(){
          return this.$store.state.url
        },
        
        headers(){
          return {
            headers:{
              "Authorization":"Bearer "+this.$store.state.user.access
            }
          }
        }
      },
      methods: {
        datetime(x) {
            if (!x) return "-"
            let date = new Date(x);
            return new Intl.DateTimeFormat(
              'en-US'
            ).format(date)
          },
        money(x) {
            x = parseInt(x).toFixed(0)
            if(!x) return "-";
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          },
      },
  
})

app.mount('#app')