<template>
    <div>
         <h1>Login</h1>
         <p v-if="loading" >Loading..</p>
         <p v-if="error" style="color:red" >{{ error }}</p>
        <label for="">Email</label>
        <input type="email" name="" v-model="form.email" id=""><br><br>
        <label for="">Password</label>
        <input type="password" name="" v-model="form.password" id=""><br><br>
        <button @click="loginUser">Login</button>
    </div>
</template>
<script>
import axios from 'axios';
    export default{
        data(){
            return{
                form:{
                     email:'',
                    password:'',
                },
                loading:false,
                 errors:null
            }
        },
         methods: {
            loginUser(){
                this.error = null;

                axios.post(this.$store.state.url+'login',this.form)
                .then(res=>{
                    alert('you re loged in');
                    this.$store.state.user = res.data 
                    this.loading = false;
                    this.$router.push('/dashboard');
                }).catch((error)=>{
                    this.errors = error.response.data.errors;
                })
               
            }
        },
    }
</script>