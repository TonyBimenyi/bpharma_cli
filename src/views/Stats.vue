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
                   <div class="search-btn">
                        <button id="search" ><i class="fa-solid fa-search"></i></button>
                    </div>
               </div>
               <div class="add_btn">
                   <p >Les plus vendus</p>
               <!-- <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button> -->
               </div>

           </div>   
           <div class="cat_list">
               <div class="table">
                   <table>
                       <thead>
                           <tr cell>
                                   <th>Medicament</th>
                                   <th>Nombre des ventes</th>
                                   <th>Quantites Total</th>
                                   <th>Prix de Vente</th>
                                   <th>Prix d'achat</th>
                                   <th>Benefice</th>
                                  
                           </tr>
                       </thead>
                       <tbody>
                              <tr v-for="sta in stats" :key="sta.id_medecine">
                                 <td>{{sta.name_medecine}}</td>
                                  <td>{{sta.nbre_des_fois}}</td>
                                  <td>{{sta.qty}}</td>
                                  <td>{{money(sta.prix_vente)}} Fbu</td>
                                  <td>{{money(sta.prix_achat)}} Fbu</td>
                                  <td>{{(sta.prix_vente-sta.prix_achat)}} Fbu</td>
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

import axios from 'axios'

export default {
    components:{
       
    },
   data() {
       return {
        stats:[],
       }
   },
   methods: {
         getStats(){
        axios
            .get(this.$store.state.url+'stats')
            .then((res)=>{
                this.stats = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
      },    
   },
   mounted() {
   
     this.getStats()
   },
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>