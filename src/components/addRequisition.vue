<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Sortir {{this.$store.state.stock.name_medecine}}</div>
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
                purchase_price:this.$store.state.stock.total_price,
                sale_price:this.$store.state.stock.price_medecine,
                stock_name:this.$store.state.stock.name_medecine+'du'+this.$store.state.stock.created_at_stock,
                id_user:this.$store.state.stock.id,
                unit_price:this.total_price/this.qty_stock,
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