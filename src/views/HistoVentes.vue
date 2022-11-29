<template>
    <div class="cat-container">
       <div class="top_part">
               <div class="search_box">
                   <div class="date_debut">
                       <strong style="font-size:13px">Du: </strong><input type="date" v-model="start_date">
                   </div>
                   <div class="date_debut">
                       <strong style="font-size:13px">Au: </strong><input type="date" v-model="end_date">
                   </div>
                   <div class="search-btn">
                        <button id="search" @click="searchInDB" ><i class="fa-solid fa-search"></i></button>
                    </div>
                   <div class="search">
                        <input   type="text" name="" v-model="inputSearch" @keydown="inputSearchMethods" placeholder="rechercher">
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
                                  <td ><button @click="details=true;getDetails(order)" ><p>Details</p></button></td>
                              </tr>
                       
                       
                               <tr id="tot">
                                   <td>Total</td>
                                   <td></td>
                                    <td></td>
                                   <td>{{money(totalPrice())+' Fbu'}}</td>
                                   <td>{{money(payetotalPrice())+' Fbu'}}</td>
                                   <td>{{money(payetotalPrice()-totalPrice())+' Fbu'}}</td>
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
         start_date : '',
            end_date : '',
           order_details:[],
          details:false,
          orders:[],
          inputSearch:'',
          allData:[]
       }
   },
   methods: {
    searchInDB(){
            axios
            .get(this.$store.state.url+'orders?start_date=' + this.start_date + '&end_date=' +this.end_date )
            .then((res)=>{
                this.$store.state.orders=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

        },
    inputSearchMethods(){
            this.$store.state.orders = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))          
        },
    totalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.$store.state.orders){
            total = total + this.$store.state.orders[i].montant_total
        }
        return total;
        },
        payetotalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.$store.state.orders){
            total = total + this.$store.state.orders[i].montant_paye
        }
        return total;
        },
        
      getOrders(){
        axios
            .get(this.$store.state.url+'orders')
            .then((res)=>{
                this.$store.state.orders = res.data
                this.allData = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
      },
      getDetails(med){
          this.$store.state.orders_d = med;
      },
      close(){
            this.details = false
        },
   },
   mounted() {
    this.getOrders();
     
   },
   computed:{
        orders(){
            return this.$store.state?.orders
        }
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>