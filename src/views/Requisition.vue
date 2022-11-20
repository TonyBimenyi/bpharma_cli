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
                         <input  type="text" name=""  v-model="inputSearch" @keydown="inputSearchMethods" placeholder="rechercher">
                    </div>
                   
                </div>
                <div class="add_btn">
                  <router-link to="/expired"><p >MEDICAMENTS EXPIRES(4)</p></router-link>  
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
                                    <th>PA Total</th>
                                    <th>date d'expiration</th>
                                    <th>PV Unitaire</th>
                                    <th>PV Total</th>
                                    <th>Cree par</th>                      
                                    <th>Valide Par</th>
                                    <th>Date </th>
                                    <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                               <tr v-for="requi in requisitions" :key="requi.id_requi">
                                    <td>{{requi.id_requi}}</td>
                                    <td>{{requi.medecine[0]?.name_medecine+' du '
                                        +datetime(requi.stock[0]?.created_at)}}</td>
                                    <td>{{requi.initial_qty_requi}}</td>
                                    <td>{{requi.actual_qty_requi}}</td>
                                    <td>{{money(requi.purchase_price)+' Fbu'}}</td>
                                    <td>{{datetime(requi.stock[0]?.exp_date)}}</td>
                                    <td>{{money(requi.sale_price_requi)+' Fbu'}}</td>
                                    
                                    <td>{{money(requi.sale_price_requi * 
                                        requi.actual_qty_requi)+' Fbu'}}</td>
                                    <td>{{requi.user[0]?.name}}</td>
                                    <td style="color:rgb(173, 173, 3);" v-if="requi.validate_by==0">En attente...</td>
                                    <td v-else>{{requi.validate_by}}</td>
                                    <td>{{datetime(requi.created_at)}}</td>
                                    <td ><button v-if="requi.validate_by==0" @click="addValidation(requi)
                                    "><i style="font-weight:700" class="fa-solid fa-check"></i></button></td>

                                    <td v-if="requi.validate_by!=0"><button id="des" @click="dialogPerte=true;addPerte(requi)"><i class="fa-solid fa-trash"></i></button></td>
                                    <td v-else><button id="des" @click="deleteRequi(requi)">Delete</button></td>
                               </tr>
                        
                        
                                <tr id="tot">
                                    <td>Total</td>
                                    <td colspan="3"></td>
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
            <add-perte @close="close"  v-if="dialogPerte"></add-perte>
     </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import addPerte from '../components/addPerte.vue'
export default {
    components:{
        addPerte
    },
    data() {
        return {
            start_date : '',
            end_date : '',
            inputSearch : '',
            requisitions:[],

            form:{
            validate_user:'',
            validate_qty:'',
            id_medecine:''
            },
            delete:{
            qty:'',
            id_stock:'',
            },
            dialogPerte:false,
            allData : []
        }
    },
    watch:{
       
    },
    methods: {
        searchInDB(){
            axios
            .get(this.$store.state.url+'requisition?start_date=' + this.start_date + '&end_date=' +this.end_date )
            .then((res)=>{
                this.$store.state.requisitions=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

        },
        inputSearchMethods(){
            this.$store.state.requisitions = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))
            
        },
        addPerte(requi){
            this.$store.state.perte = requi;
        },  
        close(){
            this.dialogPerte = false;
        },
        PATotal(){
            let total =0;
            for(let item in this.$store.state.requisitions){
                total = total +(this.$store.state.requisitions[item].purchase_price)
            } 
            return total;
        },
        PVTotal(){
            let total =0;
            for(let item in this.$store.state.requisitions){
                total = total +(this.$store.state.requisitions[item].sale_price_requi * this.$store.state.requisitions[item].actual_qty_requi)
            } 
            return total;
        },
        getRequi(){
            axios
            .get(this.$store.state.url+'requisition')
            .then((res)=>{
                this.$store.state.requisitions=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        deleteRequi(requi){
            this.delete.qty = requi.actual_qty_requi
            this.delete.id_stock = requi.stock[0]?.id_stock
            axios
            .put(this.$store.state.url+'deleteRequi/'+requi.id_requi,this.delete)
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
         this.getRequi();
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
        },  
        addValidation(requi){
            this.form.validate_user=this.$store.state.user.data.user.name
            this.form.validate_qty=requi.actual_qty_requi
            this.form.id_medecine=requi.medecine[0]?.id_medecine
            this.$store.state.requisition= requi;
            axios
            .put(this.$store.state.url+'validateRequi/'+requi.id_requi,this.form)
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
                text:   "Requisition est valide",
                icon: 'success',
              
            });
            this.getRequi();
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
    mounted() {
        this.getRequi()
        // this.form.id_medecine='tony' 
    },
    computed:{
        requisitions(){
            return this.$store.state?.requisitions
        }
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>