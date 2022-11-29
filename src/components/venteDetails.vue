<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Details</div>
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
                <p>Pharmacien: {{this.$store.state.orders_d.user[0]?.name}}</p>
            </div>
            <div class="invoce_details">
                <p><strong>#Facture: </strong>{{$store.state.orders_d.id_order}}</p>
                <p><strong>Date: </strong>{{datetime($store.state.orders_d.created_at)}}</p>
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
                              <td>{{money(det.pv)+' Fbu'}}</td>
                              <td>{{det.qty}}</td>
                              <td>{{money(det.pv*det.qty)+ 'Fbu'}}</td>
                           </tr>
                         
                    
                    
                            
                    
                    </tbody>
                </table>
            </div> 
        </div>
        <div class="total_part">
            <div class="merci">
                <!-- <div class="montant">
                    <p><strong>Montant Paye: </strong>50.000Fbu</p>
                    <p><strong>Reste: </strong>5.000Fbu</p>
                </div> -->
            </div>
            <div class="total">
                <div class="subtotal">
                    <p><strong>Sous Total: </strong>50.000Fbu</p>
                    <p><strong>TVA: </strong>0%</p>
                </div>
                <div class="totalOG">
                    <p><strong>Total: </strong>{{money(totalPrice())+' Fbu'}}</p>
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
            id_order:this.$store.state.orders_d.id_order,
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
        for(let i in this.details){
            total = total + (this.details[i].qty * this.details[i].pv)
        }
        return total;
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