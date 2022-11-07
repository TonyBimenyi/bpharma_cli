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
                <p>----------------------------------------</p>
                </div>

                <div class="input-box">
                <p>--------------------------------------</p>
                </div>

                <div class="input-box">
                <h5>Montant Total du Commande: Fbu</h5>
                </div>

                <div class="input-box">
                   
                </div>

                
                

              
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
        
                <input @click="" type="submit" value="Valider le paiement">
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
            //   numero_commande : this.$store.state.orders.id_order, 
            //   nom_client : this.$store.state.orders.nom_client, 
            //   montant_total : this.$store.state.orders.montant_total, 
            //   montant_paye : this.$store.state.orders.montant_paye, 
            //   date : this.$store.state.orders.created_at,
            //   name_medecine : this.$store.state.orders.order_details[0]?.name_medecine,
            //   qty : this.$store.state.orders.order_details[0]?.qty,
            //   pv : this.$store.state.orders.order_details[0]?.pv,
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
       
        this.getMedecines();
     
    },
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>