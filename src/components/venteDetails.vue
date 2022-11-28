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
            <div class="facture_container">
        <div class="logo_part">
            <div class="logo">
                <h1>LOGO HERE</h1>
            </div>
        </div>
        <div class="divider">
            <p></p>
        </div>
        <div class="invoice_pres">
            <div class="ese">
                <h2>    Bimbo Pharma</h2>
                <p>NIF: 9384736</p>
                <p>RC:423847234</p>
            </div>
            <div class="invoce_details">
                <p><strong>#Facture: </strong>{{$store.state.orders.id_order}}</p>
                <p><strong>Date: </strong>23/11/2022</p>
            </div>
        </div>
        <div class="cat_list">
            <div class="table">
                <table>
                    <thead>
                        <tr >
                               
                                <th>Medicament</th>
                                <th>Prix</th>
                                <th>Qte</th>
                                <th>Prix Total</th>
                                
                               
                        </tr>
                    </thead>
                    <tbody>
                           <tr v-for="det in details" :key="det.id_item" >
                              <td>{{det.name_medecine}}</td>
                              <td>1300 Fbu</td>
                              <td>5</td>
                              <td>6000 Fbu</td>
                           </tr>
                         
                    
                    
                            
                    
                    </tbody>
                </table>
            </div> 
        </div>
        <div class="total_part">
            <div class="merci">
                <div class="montant">
                    <p><strong>Montant Paye: </strong>50.000Fbu</p>
                    <p><strong>Reste: </strong>5.000Fbu</p>
                </div>
            </div>
            <div class="total">
                <div class="subtotal">
                    <p><strong>Sous Total: </strong>50.000Fbu</p>
                    <p><strong>TVA: </strong>0%</p>
                </div>
                <div class="totalOG">
                    <p><strong>Total: </strong>50.000 Fbu</p>
                </div>
            </div>
        </div>
        <div class="divider2">
            <p></p>
        </div>
        <div class="contact">
            <div class="phone">
                <p><strong>Phone: </strong>+2577985285</p>
            </div>
            <div class="addresse">
                <p><strong>Addresse: </strong>Gihosha, Bujumbura-Burundi</p>
            </div>
            <div class="email">
                <p><strong>Email: </strong>bimbo@gmail.com</p>
            </div>
        </div>
        <div class="divider3">
            <p></p>
        </div>
        <div class="merci">
            <p>Merci,Murakoze,Thank You!</p>
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
            details:[],
            id_order:this.$store.state.orders.id_order,
              numero_commande : this.$store.state.orders.id_order, 
              nom_client : this.$store.state.orders.nom_client, 
              montant_total : this.$store.state.orders.montant_total, 
              montant_paye : this.$store.state.orders.montant_paye, 
              date : this.$store.state.orders.created_at,
              name_medecine : this.$store.state.orders[0]?.name_medecine,
              qty : this.$store.state.orders[0]?.qty,
              pv : this.$store.state.orders[0]?.pv,
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
         getDetails(){
            axios
            .get(this.$store.state.url+'order_detail/'+this.id_order)
            .then((res)=>{
                this.details = res.data
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
       
        this. getDetails();
     
    },
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>