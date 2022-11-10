<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Ajouter un perte </div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Quantite</span>
                <input  type="number" min="0"  placeholder="Entrer la quantite achete"  required>
                </div>   
                <div class="input-box">
                <span class="details">Description</span>
                <input  type="text" min="0"  placeholder="Entrer la le motif de perte"  required>
                </div>   
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input type="submit" :value="btn">
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
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2'
export default {
    data(){
        return{
            form:{

            },
            btn: 'Requisitionner'
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style src='../assets/css/modal.css' scoped>
     .content .form .user-details{
        width: 200%;
     }
</style>