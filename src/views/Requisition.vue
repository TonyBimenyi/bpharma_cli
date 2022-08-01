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
                                    <th>Medicament</th>
                                    <th>Qte initial</th>
                                    <th>Qte Actuelle</th>
                                    <th>PA Total</th>
                                    <th>date d'expiration</th>
                                    <th>PV Unitaire</th>
                                    <th>PV Total</th>
                                    <th>Cree par</th>                      
                                    <th>Valide Par</th>
                                    <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                               <tr v-for="requi in requisitions" :key="requi.id_requi">
                                    <!-- <input type="text" :value="requi.actual_qty_requi" v-model="form.k"> -->
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
                                    <td ><button @click="addValidation(requi)
                                    "><i style="font-weight:700" class="fa-solid fa-check"></i></button></td>
                                    <td ><button id="des"><i class="fa-solid fa-trash"></i></button></td>
                               </tr>
                        
                        
                                <tr id="tot">
                                    <td>Total</td>
                                    <td colspan="4"></td>
                                   
                                    <td></td>
                                    <td></td>
                                  
                                    <td colspan="8"></td>
                                </tr>
                        
                        </tbody>
                    </table>
                </div> 
            </div>
  <add-requisition @update="getStock" @close="close" :requisitionner="modifier"   v-if="dialogRequisition"></add-requisition>          
     </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            
            requisitions:[],
            form:{
            validate_user:this.$store.state.user.data.user.name,
            validate_qty:this.$store.state.requisition.actual_qty_requi,
            }
        }
    },
    methods: {
        getRequi(){
            axios
            .get(this.$store.state.url+'requisition')
            .then((res)=>{
                this.requisitions=res.data
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        addValidation(requi){
            this.$store.state.requisition= requi;
            axios
            .post(this.$store.state.url+'validation/'+requi.id_requi,this.form)
            .then((res)=>{
              
                 console.log(res["data"]["status"]);
                this.form.validate_user=''
                this.form.validate_qty=''
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
        }
    },
    mounted() {
        this.getRequi()
    },
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>