<template>
     <div class="cat-container">
        <div class="top_part">
                <div class="search_box">
                    <div class="date_debut">
                        <strong style="font-size:13px">Du: </strong><input v-model="start_date" type="date">
                    </div>
                    <div class="date_debut">
                        <strong style="font-size:13px">Au: </strong><input v-model="end_date" type="date">
                    </div>
                    <div class="search-btn">
                        <button id="search" @click="searchInDB" ><i class="fa-solid fa-search">
                            <font-awesome-icon icon="fa-solid fa-search" />
                        </i></button>
                    </div>
                    <div class="search">
                         <input  type="text"  name="" v-model="inputSearch" @keydown="inputSearchMethods" placeholder="rechercher">
                    </div>
                   
                </div>
                <div class="add_btn">
                    <!-- <p >Stock Rompu</p> -->
                <!-- <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button> -->
                </div>

            </div>   
            <div class="cat_list">
                <div class="table">
                    <table>
                        <thead>
                            <tr cell>
                                    <th>#ID</th>
                                    <th>Medicament</th>
                                    <th>Qte initial</th>
                                    <th>Qte Actuelle</th>
                                    <th>PAU Unitaire</th>
                                    <th>PA Total</th>
                                    <th>date d'expiration</th>
                                    <th>PV Unitaire</th>
                                    <th>PV Total</th>
                                    <th>Cree au</th>
                                    <th>cree par</th>                      
                                    <!-- <th>Unite</th> -->
                                    <th  v-if="$store.state.user.data.user.registered_as==`Admin`" colspan="3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for="sto in stocks" :key="sto.id_stock">
                                    <td>{{sto.id_stock}}</td>
                                    <td>{{ sto.medecine[0]?.name_medecine }}</td>
                                    <td>{{sto.initial_qty}}</td>
                                    <td>{{sto.actual_qty}}</td>
                                    <td>{{money(sto.unit_price)+' Fbu'}}</td>
                                    <td>{{money(sto.total_price)+' Fbu'}}</td>
                                    <td>{{datetime(sto.exp_date)}}</td>
                                    <td>{{money(sto.medecine[0]?.price_medecine)}} Fbu</td>
                                    <td>{{money(sto.medecine[0]?.price_medecine*sto.actual_qty)}} Fbu</td>
                                    <td>{{datetime(sto.created_at)}}</td>
                                    <td>{{sto.user[0]?.email}}</td>
                                    <!-- <td v-if="sto.unite!=NULL">{{sto.unite}}</td>
                                    <td v-else>------</td> -->
                                    <div v-if="$store.state.user.data.user.registered_as==`Admin`" class="">
                                        <td>
                                            <button id="mod" @click="dialogStock=true;requisitionner(sto)"><i class="fa-solid fa-trash">
                                                Mod
                                            </i></button>
                                        </td>
                                 
                                     <td ><button v-if="sto.actual_qty!=0" @click="dialogRequisition=true;requisitionner(sto)">Sortir</button></td>
                                    <td >
                                        <div v-if="sto.actual_qty==sto.initial_qty">
                                            <button id="des" style="font-size:13px" v-bind:disabled="isButtonDisabled" @click="deleteAchat(sto)">Delete</button>
                                        </div>
                                       
                                    </td>
                                </div>
                                    
                                </tr>
                        
                        
                                <tr id="tot">
                                    <td>Total</td>
                                    <td colspan="4"></td>
                                    <td>{{ money(PATotal()) }} Fbu</td>
                                    <td></td>
                                    <td></td>
                                    <td>{{ money(PVTotal()) }} Fbu</td>
                                    <td colspan="8"></td>
                                </tr>
                        
                        </tbody>
                    </table>
                </div> 
            </div>
  <add-requisition @update="getStock" @close="close" :requisitionner="modifier"   v-if="dialogRequisition"></add-requisition>   
  <mod-stock @update="getStock" @close="close"   v-if="dialogStock"></mod-stock>          
     </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import addRequisition from '../components/addRequisition.vue'
import modStock from '../components/modStock.vue'
export default {
    components:{
        addRequisition,
        modStock
    },
    data() {
        return {
            inputSearch : '',
            allData:'',
            start_date : '',
            end_date : '',
            stocks:[],
            medecine:[],
            delete:{
                qty:'',
                id_stock:'',
                id_medecine:'',
            },
            dialogRequisition:false,
            dialogStock:false,
            isButtonDisabled:false,
        }
    },
    methods: {
        searchInDB(){
            axios
            .get(this.$store.state.url+'stock?start_date=' + this.start_date + '&end_date=' +this.end_date )
            .then((res)=>{
                this.$store.state.stocks=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

        },
        inputSearchMethods(){
            this.$store.state.stocks = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))
            
        },
        PATotal(){
            let total =0;
            for(let item in this.$store.state.stocks){
                total = total +(this.$store.state.stocks[item].total_price)
            } 
            return total;
        },
        PVTotal(){
            let total =0;
            for(let item in this.$store.state.stocks){
                total = total +(this.$store.state.stocks[item].medecine[0]?.price_medecine * this.$store.state.stocks[item].actual_qty)
            } 
            return total;
        },
        close(){
            this.dialogRequisition = false
            this.dialogStock = false
        },
        requisitionner(item){
            this.$store.state.stock = item;
        },
        
        deleteAchat(item){
            this.delete.qty = item.actual_qty
            this.delete.id_medecine = item.medecine[0]?.id_medecine
            axios
            .put(this.$store.state.url+'deleteStock/'+item.id_stock,this.delete)
            .then((res)=>{
              
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
             text:   "Requisition est Supprime",
             icon: 'success',
           
         });
         this.getStock();
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
        getStock(){
            axios
            .get(this.$store.state.url+'stock')
            .then((res)=>{
                this.$store.state.stocks = res.data
                this.medecine = res.data
                this.allData = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    },
    mounted() {
        this.getStock()
    },
    computed:{
        stocks(){
            return this.$store.state?.stocks
        }
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>