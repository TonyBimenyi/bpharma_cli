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
                                   <th>Quantite</th>
                                   <th>Motif</th>
                                   <th>N° de lot</th>
                                   <th>Prix de vente</th>
                                   <th>Enregistre par</th>
                                   <th>Date</th>
                                   <th colspan="2">Actions</th>
                           </tr>
                       </thead>
                       <tbody>
                              <tr v-for="perte in pertes" :key="perte.id_perte">
                                   <td>{{perte.id_perte}}</td>
                                   <td>{{perte.medecine[0]?.name_medecine}}</td>
                                   <td>{{perte.qty}}</td>
                                   <td>{{perte.description}}</td>
                                   <td>{{perte.id_requi}}</td>
                                   <td>{{money(perte.requisition[0]?.sale_price_requi) +'Fbu'}}</td>
                                   <td>{{perte.user[0]?.name}}</td>
                                   <td>{{datetime(perte.created_at)}}</td>
                                   <td ><button ><i class="fa-solid fa-trash"></i></button></td>
                              </tr>
                       
                       
                               <tr id="tot">
                                   <td>Total</td>
                                   <td colspan="3"></td>
                                   <td> Fbu</td>
                                   <td></td>
                                   <td></td>
                                   <td> Fbu</td>
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
           pertes:[],
           requisitions:[],

           form:{
           validate_user:'',
           validate_qty:'',
           id_medecine:''
           },
           dialogPerte:false,
       }
   },
   methods: {
       addPerte(requi){
           this.$store.state.perte = requi;
       },  
       close(){
           this.dialogPerte = false;
       },
       
       getPertes(){
           axios
           .get(this.$store.state.url+'pertes')
           .then((res)=>{
               this.pertes=res.data
           })
           .catch((error)=>{
               console.log(error)
           })
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
       }
   },
   mounted() {
       this.getPertes()
       // this.form.id_medecine='tony' 
   },
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>