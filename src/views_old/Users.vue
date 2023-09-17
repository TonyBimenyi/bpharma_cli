<template>
    <div class="cat-container">
       <div class="top_part">
               <div class="search_box">
                 
                   <div class="search">
                        <input  type="text" name="" v-model="inputSearch" @keydown="inputSearchMethods" placeholder="rechercher">
                   </div>
                   
               </div>
               <div class="add_btn">

               <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Utilisateur</button>
               </div>

           </div>   
           <div class="cat_list">
               <div class="table">
                   <table>
                       <thead>
                           <tr cell>
                                   <th>ID</th>
                                   <th>Nom et Prenom</th>
                                   <th>Nom d'Utilisateur</th>
                                   <th>Role</th>
                                   <th colspan="2">Options</th>
                                  
                           </tr>
                       </thead>
                       <tbody>
                              <tr v-for="user in utilisateurs" :key="user">
                                 <td>{{user.id}}</td>
                                  <td>{{user.name}}</td>                   
                                  <td>{{user.email}}</td>
                                  <td>{{user.registered_as}}</td>
                                  <td><button >Modifier</button></td>
                                  <td  id="sup"><button>Desactiver</button></td>
                                
                              </tr>
                       
     
                       </tbody>
                   </table>
               </div> 
           </div>
           <vente-details @close="close" v-if="details"></vente-details>
           <add-user :edit="modifier" @getUsers="getUsers" @update="getMedecines" @close="close" v-if="dialog"></add-user>
    </div>
</template>
<script>

import axios from 'axios'
import addUser from '../components/addUser.vue'
export default {
    components:{
       addUser
    },
   data() {
       return {
        stats:[],
        inputSearch : '',
        allData:'',
        start_date : '',
        end_date : '',
        dialog:false,
       }
   },
   methods: {

         getUsers(){
        axios
            .get(this.$store.state.url+'utilisateurs')
            .then((res)=>{
                this.$store.state.utilisateurs = res.data
                this.allData = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
      },    
      close(){
        this.dialog=false
      }
   },
   mounted() {
   
     this.getUsers()
   },
   computed:{
        utilisateurs(){
            return this.$store.state?.utilisateurs
        }
    }
  
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>