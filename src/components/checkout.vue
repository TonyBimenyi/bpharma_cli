<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Valider le Paiement</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Nom du Client </span>
                <input v-model="form.nom_client" type="text" placeholder="Entrer le nom" required>
                </div>
    
                <!-- <div class="input-box">
                <span class="details">Prix de Vente Unitaire</span>
                <select name="" id="">
                    <option value="">Pas de Dette</option>
                    <option value="">Dette</option>
                </select>
                </div> -->
                <div class="input-box">
                <span class="details">Montant Paye</span>
                <input v-model="form.somme_retourner" type="number" placeholder="Entrer le montant" required>
                </div>
                <div class="input-box">
                <p>----------------------------------------</p>
                </div>

                <div class="input-box">
                <p>--------------------------------------</p>
                </div>

                <div class="input-box">
                <h5>Montant Total du Commande: {{money(totalPrice())}} Fbu</h5>
                </div>

                <div class="input-box">
                    <div  v-if="ayasubizwa()<0">
                        <h5>Reste: 0</h5>
                    </div>
                     <div  v-else>
                        <h5>Reste: {{money(ayasubizwa())}} Fbu</h5>
                     </div>
               
                </div>

                
                

              
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
        
                <input @click="addOrder()" type="submit" value="Valider le paiement">
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

    data() {
        return {
           
            form:{
                nom_client:'',               
                nif_client:'',
                montant_total:this.totalPrice(),
                carts:this.$store.state.carts,
                id_user:this.$store.state.user.data.user.id,
                somme_retourner : this.totalPrice(),
                

            },
              
        }
    },
    methods:{

        totalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.$store.state.carts){
            total = total + (this.$store.state.carts[i]?.quantite * this.$store.state.carts[i]?.price_medecine)
        }
        return total;
        },
        ayasubizwa(){
            let reste;
            reste = this.form.somme_retourner-this.totalPrice();
            return reste;
        },
        addOrder(){
         
            axios
            .post(this.$store.state.url+'addOrder',this.form,this.headers)
            .then((res)=>{
          
                console.log(res["data"]["status"]);
                this.form.nom_client='',
                this.form.nif_client='',
                this.form.montant_total='',
                this.form.montant_a_paye = '',       
                this.form.carts = "",      
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
                text:   "Commande est ajoute avec succes",
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
        this.totalPrice();
        this.ayasubizwa();
        this.getMedecines();
     
    },
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>