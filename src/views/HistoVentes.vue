<template>
    <div class="cat-container">
       <div class="top_part">
               <div class="search_box">
                   <div class="date_debut">
                       <strong style="font-size:13px">Du: </strong><input type="date">
                   </div>
                   <div class="date_debut">
                       <strong style="font-size:13px">Au: </strong><input type="date">
                   </div>
                   <div class="search">
                        <input  type="text" name="" value="" placeholder="rechercher">
                   </div>
               </div>
               <div class="add_btn">
                   <p >Stock Rompu</p>
               <!-- <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button> -->
               </div>

           </div>   
           <div class="cat_list">
               <div class="table">
                   <table>
                       <thead>
                           <tr cell>
                                   <th>#ID</th>
                                   <th>Client</th>
                                   <th>Client</th>
                                   <th>Montant_Total</th>
                                   <th>Montant Paye</th>
                                   <th>Reste</th>
                                   <th>User</th>
                                   <th>Date</th>
                                  <th>Options</th>
                           </tr>
                       </thead>
                       <tbody>
                              <tr v-for="order in orders " :key="order.id_order">
                                  <td>{{order.id_order}}</td>
                                  <td>Commande du {{datetime(order.created_at)}}</td>
                                  <td>{{order.nom_client}}</td>
                                  <td>{{money(order.montant_total)}} Fbu</td>
                                  <td>{{money(order.montant_paye)}} Fbu</td>
                                  <td>{{money(order.montant_paye-order.montant_total)}} Fbu</td>
                                  <td>{{order.user[0]?.name}}</td>
                                  <td>{{datetime(order.created_at)}}</td>
                                  <td ><button @click="details=true;getDetails()" ><p>Details</p></button></td>
                              </tr>
                       
                       
                               <tr id="tot">
                                   <td>Total</td>
                                   <td colspan="3"></td>
                                    <td></td>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                   <td colspan="8"></td>
                               </tr>
                       
                       </tbody>
                   </table>
               </div> 
           </div>
           <vente-details @close="close" v-if="details"></vente-details>
    </div>
</template>
<script>
import venteDetails from '../components/venteDetails.vue'
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
    components:{
        venteDetails,
    },
   data() {
       return {
           order_details:[],
          details:false,
          orders:[]
       }
   },
   methods: {
      getOrders(){
        axios
            .get(this.$store.state.url+'orders')
            .then((res)=>{
                this.orders = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
      },
      getDetails(){
          this.$store.state.orders = this.orders;
      },
      close(){
            this.details = false
        },
   },
   mounted() {
    this.getOrders();
     
   },
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>