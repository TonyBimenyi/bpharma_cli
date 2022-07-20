<template>
    <div>
         <h1>Login</h1>
        <label for="">Email</label>
        <input type="email" name="" v-model="form.email" id=""><br><br>
        <label for="">Password</label>
        <input type="password" name="" v-model="form.password" id=""><br><br>
        <button @click="prevent.loginUser">Register</button>
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
                 errors:[]
            }
        },
         methods: {
            loginUser(){
                axios.post(this.url+'login',this.form)
                .then(()=>{
                    alert('you re loged in');
                    this.$router.push('/dashboard');
                }).catch((error)=>{
                    this.errors = error.response.data.errors;
                })
            }
        },
    }
</script>