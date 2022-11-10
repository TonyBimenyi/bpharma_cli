<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Ajouter un perte {{this.$store.state.perte.name_medecine}}</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Quantite</span>
                <input  type="number" min="0" v-model="form.qty"  placeholder="Entrer la quantite achete"  required>
                </div>   
                <div class="input-box">
                <span class="details">Description</span>
                <input  type="text" min="0" v-model="form.description"  placeholder="Entrer la le motif de perte"  required>
                </div>   
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input type="submit" @click="addPerte()" :value="btn">
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
                qty:'',
                description:'',
                id_requi:this.$store.state.perte.id_requi,
                id_stock:this.$store.state.perte.id_stock,
                id_user:this.$store.state.user.data.user.id,
                id_medecine:this.$store.state.perte.id_medecine,

            },
            btn: 'Ajouter'
        }
    },
    methods:{
        close(){
            this.$emit('close')
        },
        addPerte(){
            axios
            .post(this.$store.state.url+'addPerte/'+this.$store.state.perte.id_requi,this.form)
            .then((res)=>{
                this.$store.state.stock = res.data
                console.log(res["data"]["status"]);
           
                if(res["data"]["status"] == "error")
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
                title: 'Succes',
                text:   "Perte est ajoute",
                icon: 'success',
              
            });
            this.close()
        }
        })
        .catch((e)=>{
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
<style src='../assets/css/modal.css' scoped>
     .content .form .user-details{
        width: 200%;
     }
</style>