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
                <input v-model="form.qty_stock" type="number" min="0"  placeholder="Entrer la quantite achete"  required>
                </div>
    
                <div class="input-box">
                <span class="details">Prix d'achat Total</span>
                <input v-model="form.total_price" type="number" placeholder="Entrer le Prix" required>
                <small style="font-weight:bold">Prix d'achat Unitaire: {{money(form.total_price/form.qty_stock)+' Fbu'}}</small><br>
                <small style="font-weight:bold;color:green">Prix de vente Unitaire: {{money(this.$store.state.medecine.price_medecine)+' Fbu'}}</small>
                <input type="hidden" v-model="form.unit_price">
                </div>
                <div class="input-box">
                <span class="details">Date d'expiration</span>
                <input type="date" v-model="form.exp_date" placeholder="Generique ou Specialite" required>
                </div>
                <div class="input-box">
                <span class="details">Unite</span>
                <input type="text" v-model="form.unite" placeholder="Cartons,Plaquttes,Bouteilles,..." required>
                </div>
               
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input  @click="addStock()" type="submit" :value="btn">
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
                qty_stock:0,
                unit_price:this.total_price/this.qty_stock,
                exp_date:'',
                total_price:'',
                unite:'',
                id_user:this.$store.state.user.data.user.id,
                id_medecine:this.$store.state.medecine.id_medecine,
            },
                btn: 'Acheter',
                isButtonDisabled : false
        }
    },
    methods:{
        addStock(){
           
            axios
            .post(this.$store.state.url+'addStock2/'+this.$store.state.medecine.id_medecine,this.form)
            .then((res)=>{
                 this.$store.state.medecine= res.data
                console.log(res["data"]["status"]);
                this.form.qty_stock='',
                this.form.total_price='',
                this.form.exp_date='',
                this.id_user='',
                this.id_medecine='',
                this.unite=''
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
            this.getMedecines()
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
            this.$emit('getMedecines')
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