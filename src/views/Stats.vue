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
                        <input  type="text" name="" v-model="inputSearch" @keydown="inputSearchMethods" placeholder="rechercher">
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
                                  <td>{{money(sta.prix_vente*sta.qty)}} Fbu</td>
                                  <td>{{money(sta.prix_achat*sta.qty)}} Fbu</td>
                                  <td>{{(sta.prix_vente-sta.prix_achat)}} Fbu</td>
                              </tr>
                       
                       
                               <tr id="tot">
                                   <td>Total</td>
                                   <td></td>
                                    <td></td>
                                   <td>{{money(ventetotalPrice())+' Fbu'}}</td>
                                   <td>{{money(achattotalPrice())+' Fbu'}}</td>
                                   <td>{{money(ventetotalPrice()-achattotalPrice())+' Fbu'}}</td>
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
        inputSearch : '',
        allData:'',
        start_date : '',
        end_date : '',
       }
   },
   methods: {
    searchInDB(){
            axios
            .get(this.$store.state.url+'stats?start_date=' + this.start_date + '&end_date=' +this.end_date )
            .then((res)=>{
                this.$store.state.stats=res.data
                this.allData = res.data
                console.log('res data',  res.data)
            })
            .catch((error)=>{
                console.log(error)
            })

        },
        inputSearchMethods(){
            this.$store.state.stats = this.allData.filter(e => JSON.stringify(e).toLowerCase().includes(this.inputSearch.toLowerCase()))
            
        },
        ventetotalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.$store.state.stats){
            total = total + (this.$store.state.stats[i].prix_vente*this.$store.state.stats[i]?.qty)
        }
        return total;
        },

        achattotalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.$store.state.stats){
            total = total + (this.$store.state.stats[i].prix_achat*this.$store.state.stats[i]?.qty*1)
        }
        return total;
        },

         getStats(){
        axios
            .get(this.$store.state.url+'stats')
            .then((res)=>{
                this.$store.state.stats = res.data
                this.allData = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
      },    
   },
   mounted() {
   
     this.getStats()
   },
   computed:{
        stats(){
            return this.$store.state?.stats
        }
    }
  
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>