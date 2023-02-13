<template>
 <body>
   <head>
    <meta charset="UTF-8">
    <title>Connextion</title>
    <!--<title> Login and Registration Form in HTML & CSS | CodingLab </title>-->
    <link rel="stylesheet" href="style.css">
    <!-- Fontawesome CDN Link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
  <div class="container">
    <input type="checkbox" id="flip">
    <div class="cover">
      <div class="front">
        <!--<img src="images/frontImg.jpg" alt="">-->
        <div class="text">
          <span class="text-1">Everything you do,  <br> do it well and perfectlly</span>
          <span class="text-2"></span>
        </div>
      </div>
      <div class="back">
        <!--<img class="backImg" src="images/backImg.jpg" alt="">-->
        <div class="text">
          <span class="text-1">Complete miles of journey <br> with one step</span>
          <span class="text-2">Everything you do, do it well and perfectlly</span>
        </div>
      </div>
    </div>
    <div class="forms">
        <div class="form-content">
          <div class="login-form">
            <div class="title">BIMBO Pharma</div>
          <form v-on:submit.prevent="login_user" >
            <div class="input-boxes">
              <div class="input-box">
                <i class="fas fa-envelope"></i>
                <input type="text" placeholder="Entrer votre nom d'utilisateur" v-model="form.email" required>
              </div>
              <div class="input-box">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Entrer votre mot de passe" v-model="form.password" required>
              </div>
              <!-- <div class="text"><a href="#">Mot de passe oublie?</a></div> -->
              <div class="button input-box">
                <button>{{loading?"Chargement...":"Se connecter"}}</button>
              </div>
            </div>
        </form>
      </div>
      
    </div>
    </div>
  </div>
</body>
</template>
<script>
  import axios from 'axios';
  import Swal from 'sweetalert2'

export default{
  data(){
    return{
      form:{
        email:'',
        password:''
      },
      loading:false,
    }
  },
  methods:{
     login_user(){
        this.loading = true;
          axios
          .post(this.$store.state.url+'login',this.form)
          .then((resp) =>{
              console.log(resp["data"]["status"]);
              this.$store.state.user = resp.data 
              //this.loadlist();
              //reset form
             this.form.email = '';
             this.form.password = '';
             if(resp["data"]["status"] == "error")
             {
               Swal.fire({
                title: 'OPPS',
                text:   "error",
                icon: 'warning',
              
            });
             }
             else
             {
              
               Swal.fire({
                title: 'Hurry',
                text:   "You have been logged-in successfully",
                icon: 'success',
              
            });
            this.$router.push('/ventes')
             }
              
          })
          .catch((e)=>{
            this.loading = false;
              console.log(e);
               Swal.fire({
              title: 'Hurry',
              text:   e,
              icon: 'warning',
              
            });
          })
        }

  }
}

</script>
<style src='../assets/css/login.css' scoped>

</style>