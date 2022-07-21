<template>
  <v-app>
      <div v-if="$store.state.user">
            <router-view></router-view>
      </div>
      
      <div v-else>
       <app-account></app-account>
      </div>
  </v-app>
</template>
<script>
  import appAccount from './components/Login_User.vue';

  export default{
    name:"App",
    components:{
      appAccount,

    },
    data: () => ({}),
	mounted() {
	var user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			this.$store.state.user = user
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
