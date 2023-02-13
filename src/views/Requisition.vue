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
                        <button id="search" @click="searchInDB" ><i class="fa-solid fa-search">
                            <font-awesome-icon icon="fa-solid fa-search" />
                        </i></button>
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
                                    <!-- <th>Date Dif</th> -->
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
                                    <td >
                                    <div v-if="datetime(requi.stock[0]?.exp_date)<datetime(curentDate)" style="color:red">
                                        {{requi.medecine[0]?.name_medecine+' du '
                                        +datetime(requi.stock[0]?.created_at)}}
                                    </div>   
                                    <div v-else-if="datetime(requi.stock[0]?.exp_date)>datetime(curentDate)">
                                        {{requi.medecine[0]?.name_medecine+' du '
                                        +datetime(requi.stock[0]?.created_at)}}
                                    </div> 
                                    </td>
                      
                                    <td>{{requi.initial_qty_requi}}</td>
                                    <td>{{requi.actual_qty_requi}}</td>
                                    <td>{{money(requi.purchase_price)+' Fbu'}}</td>
                                    <td>{{datetime(requi.stock[0]?.exp_date)}}</td>
                                    <!-- <td>{{timeDif()}}</td> -->
                                    <td>{{money(requi.sale_price_requi)+' Fbu'}}</td>
                                    
                                    <td>{{money(requi.sale_price_requi * 
                                        requi.actual_qty_requi)+' Fbu'}}</td>
                                    <td>{{requi.user[0]?.email}}</td>
                                    <td style="color:rgb(173, 173, 3);" v-if="requi.validate_by==0">En attente...</td>
                                    <td v-else>{{requi.validate_by}}</td>
                                    <td>{{datetime(requi.created_at)}}</td>
                                    <div v-if="$store.state.user.data.user.id!=requi.id_user">
                                        <td ><button v-if="requi.validate_by==0" @click="addValidation(requi)" ><i style="font-weight:700" class="fa-solid fa-check"></i></button></td>
                                    </div>
                                    <!-- <div v-else>
                                        <td >jkk</td>
                                    </div> -->
                                    <td v-if="$store.state.user.data.user.id==requi.id_user"><button id="des" @click="deleteRequi(requi)">Delete</button></td>
                                    <td v-if="requi.validate_by!=0"><button id="des" @click="dialogPerte=true;addPerte(requi)"><i class="fa-solid fa-trash">
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                    </i></button></td>
                                    
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
import moment from 'moment'
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
            curentDate: Date().toLocaleString(),
            form:{
            validate_user:'',
            validate_qty:'',
            id_medecine:''
            },
            delete:{
            qty:'',
            id_stock:'',
            id_medecine:'',
            },
            dialogPerte:false,
            allData : []
        }
    },
    watch:{

    },
    mounted(){
            this.getRequi();

            
        },
    methods: {
        timeDif(){
            var date1 = moment(this.curentDate).format("HH:mm:ss")
            var date2 = moment('2022/12/07 10:00:00').format("HH:mm:ss")
        //    const dateDifference =  moment(this.curentDate).format("dd-mm-yyyy")-moment(this.$store.state.stock[0]?.exp_date).format("dd-mm-yyyy")
        var timeDiff = date1-date2
        // console.log(timeDiff.format("HH:mm:ss"))
        // return diffInTime
        },
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
        addValidation(requi){
            this.form.validate_user=this.$store.state.user.data.user.email
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
            this.delete.id_medecine = requi.id_medecine
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
       
   
    computed:{
        requisitions(){
            return this.$store.state?.requisitions
        }
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>
