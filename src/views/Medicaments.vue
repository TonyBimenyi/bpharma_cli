<template>
    <div class="cat-container">
        <div class="top_part">
            <div class="search_box">
                <input type="text" name="" value="" placeholder="rechercher">
            </div>
                <div class="add_btn">
                <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button>
                </div>
         </div>   
     <div class="cat_list">
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nom Medicament</th>
                        <th>Prix de vente Unitaire</th>
                        <th>Date de creation</th>
                        <th>Cree par</th>
                        <th>Categorie</th>
                        <th>Etat</th>
                        <th colspan="2" >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="med in medecines" :key="med.id_medecine" id="line">
                        <td>{{med.id_medecine}}</td>
                        <td>{{med.name_medecine}}</td>
                        <td>{{money(med.price_medecine)+' Fbu'}}</td>
                        <td>{{datetime(med.created_at)}}</td>
                        <td>{{med.name}}</td>
                        <td v-if="med.cat_medecine!=NULL">{{med.cat_medecine}}</td>
                        <td v-else>Non Spesifie</td>

                        <td v-if="med.etat==1"><button @click="changeEtatOff(med)" id="des">Desactiver</button><br><small>Etat: <span>Actif</span> </small> </td>

                        <td v-else><button @click="changeEtatOn(med)" id="act">Activer</button><br><small>Etat: <span id="ina">Inactif</span> </small> </td>

                        <td><button @click="edit(med)">Modifier</button></td>
                        <td><button @click="dialogPurchase=true;acheter(med)">Acheter</button></td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
        <add-medecine :edit="modifier" @update="getMedecines" @close="close" v-if="dialog"></add-medecine>
        <add-purchase @close="close" :acheter="modifier" @update="getMedecines"  v-if="dialogPurchase"></add-purchase>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import addMedecine from '../components/addMedecine.vue'
import addPurchase from '../components/addPurchase.vue'
export default {
    components:{
        addMedecine,
        addPurchase
    },
    data(){
        return{
            dialog:false,
            dialogPurchase:false,
            medecines:[],
            modifier:false,
            buy:false,
        }
    },
    methods: {
        close(){
            this.dialog = false
            this.dialogPurchase = false
        },
        getMedecines(){
            axios
            .get(this.$store.state.url+'getMedecine')
            .then((res)=>{
                this.medecines = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        acheter(item){
            this.$store.state.medecine = item;
        },
        edit(item){
            this.dialog = true;
            this.modifier = true;
            this.$store.state.medecine = item;
        },
        changeEtatOff(med){
            this.$emit('update')
            axios
            .put(this.$store.state.url+'changeEtatOff/'+med.id_medecine)
            .then((res)=>{
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
                text:   "Medicament est Desactive avec succes",
                icon: 'success',
              
            });
            this.close()
            this.getMedecines()
             }
            })
        },
        changeEtatOn(med){
            this.$emit('update')
            axios
            .put(this.$store.state.url+'changeEtatOn/'+med.id_medecine)
            .then((res)=>{
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
                text:   "Medicament est Active avec succes",
                icon: 'success',
              
            });
            this.close()
            this.getMedecines()
             }
            })
        }
    },
    mounted(){
        this.getMedecines();
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>