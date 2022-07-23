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
                        <th>Prix Unitaire</th>
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
                        <td v-if="med.etat==1"><button id="des">Desactiver</button><br><small>Etat: <span>Actif</span> </small> </td>
                        <td v-else><button id="act">Activer</button><br><small>Etat: <span id="ina">Inactif</span> </small> </td>
                        <td><button @click="edit(med)">Modifier</button></td>
                        <td><button>Acheter</button></td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
        <add-medecine :edit="modifier" @update="getMedecines" @close="close" v-if="dialog"></add-medecine>
    </div>
</template>
<script>
import axios from 'axios'
import addMedecine from '../components/addMedecine.vue'
export default {
    components:{
        addMedecine,
    },
    data(){
        return{
            dialog:false,
            medecines:[],
            modifier:false,
        }
    },
    methods: {
        close(){
            this.dialog = false
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
        edit(item){
            this.dialog = true;
            this.modifier = true;
            this.$store.state.medecine = item;
        }
    },
    mounted(){
        this.getMedecines();
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>