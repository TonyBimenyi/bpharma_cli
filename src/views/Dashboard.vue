<template>
    <div>
        <h1>Dashboard</h1> 
        {{ $store.state.user.data.user.name }}
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
            return{
                user:null
            }
        },
        mounted() {
            axios.get('http://127.0.0.1:8000/api/me')
            .then((res)=>{
                this.user = res.data
            })
        },
    }
</script>