<template>
    <div>
        <h1>Register an accounnt</h1>
        <label for="">Name</label>
        <input type="text" name="" v-model="form.name" id=""><br><br>
        <label for="">Email</label>
        <input type="email" name="" v-model="form.email" id=""><br><br>
        <label for="">Password</label>
        <input type="password" name="" v-model="form.password" id=""><br><br>
        <label for="">Confirm password</label>
        <input type="text" name="" v-model="form.password_confirmation" id=""><br><br>
        <button @click="saveForm()">Register</button>
    </div>
</template>
<script>
import axios from 'axios';
    export default{
        data(){
            return{
                form:{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                },
                errors:[]
            }
        },
        methods: {
            saveForm(){
                axios.post('http://127.0.0.1:8000/api/register',this.form)
                .then(()=>{
                    alert('saved');
                }).catch((error)=>{
                    this.errors = error.response.data.errors;
                })
            }
        },
    }
</script>