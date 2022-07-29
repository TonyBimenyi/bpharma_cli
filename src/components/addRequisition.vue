<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Sortir {{this.$store.state.medecine.name_medecine}}</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Quantite</span>
                <input v-model="form.initial_qty_requi" type="number" min="0"  placeholder="Entrer la quantite achete"  required>
                </div>
    
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input @click="addRequisition()" type="submit" :value="btn">
            </div>
            </div>
        </div>
        </div>
    </transition>  
  </body>
    </div>
</template>
<script>
import axios from 'axios'
// import Swal from 'sweetalert2'
export default {
      props:['requisitionner'],
    data() {
        return {
            form:{
                initial_qty_requi:0,
                unit_price:this.total_price/this.qty_stock,
                exp_date:'',
                total_price:'',
                unite:'',
                id_user:this.$store.state.user.data.user.id,
                id_medecine:this.$store.state.medecine.id_medecine,
            },
                btn: 'Requisitionner'
        }
    },
    methods: {
           getMedecines(){
            axios
            .get(this.$store.state.url+'getMedecine')
            .then((res)=>{
                this.medecines = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        close(){
            this.$emit('close')
        }
        
    },
    mounted() {
        this.getMedecines()
    },
}
</script>
<style src='../assets/css/modal.css' scoped>
     .content .form .user-details{
        width: 200%;
     }
</style>