<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Acheter {{this.$store.state.medecine.name_medecine}}</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Quantite</span>
                <input v-model="form.qty_purchase" type="number" min="0"  placeholder="Entrer la quantite achete"  required>
                </div>
    
                <div class="input-box">
                <span class="details">Prix d'achat Total</span>
                <input v-model="form.price_purchase" type="number" placeholder="Entrer le Prix" required>
                <small>Prix d'achat Unitaire: {{money(form.price_purchase/form.qty_purchase)+'Fbu'}}</small>
                </div>
                <div class="input-box">
                <span class="details">Date d'expiration</span>
                <input type="date" v-model="form.date_purchase" placeholder="Generique ou Specialite" required>
                </div>
               
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input @click="addStock()" type="submit" :value="btn">
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

export default {
    props:['acheter'],
    data() {
        return {
            form:{
                qty_purchase:0,
                price_purchase:'',
                date_purchase:'',
                id_user:this.$store.state.user.data.user.id
            },
                btn: 'Acheter'
        }
    },
    methods:{
        addStock(){
            axios
            
            .put(this.$store.state.url+'addStock/'+this.$store.state.medecine.id_medecine,this.form)
            .then((res)=>{
                 this.$store.state.medecine= res.data
                console.log(res["data"]["status"]);
                this.form.qty_purchase='',
                this.form.price_purchase='',
                this.form.date_purchase='',
                this.id_user=''
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
                text:   "Medicament est ajoute avec succes",
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
        },
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
     
</style>