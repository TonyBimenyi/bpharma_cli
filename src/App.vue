<template>
  <v-app>
      <div v-if="$store.state.user">
          
      </div>
      <div v-else>
        <app-header></app-header>
        <router-view></router-view>
        <!-- <app-account></app-account> -->
      </div>
  </v-app>
</template>
<script>
  import appAccount from './views/Login_User.vue';
   import appHeader from './views/Header.vue';
  export default{
    name:"App",
    components:{
      appAccount,
      appHeader
    },
    data: () => ({}),
	mounted() {
		var user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			this.$store.state.user = null
		}
	},
	watch: {
		'$store.state.user': {
			deep: true,
			handler(new_val){
				if (new_val) {
					localStorage.setItem('user', JSON.stringify(new_val))
				} else {
					localStorage.removeItem('user')
				}
                
			}
		}
	}
  }
</script>
