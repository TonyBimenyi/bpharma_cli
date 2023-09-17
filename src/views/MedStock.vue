<template>
    <div class="cat-container">
        <div class="top_part">
            <div class="text">
                <h5 style="margin-top:7px">Liste des Medicaments en Stock</h5>
            </div>
            <div class="search_box">
                <input type="text" v-model="search" @keydown="filteredMedecines()"  placeholder="rechercher">
            </div>
                <div class="add_btn">
                <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button>
                </div>
                <div class="add_btn">
                    <div v-if="$store.state.user.data.user.registered_as==`Admin`" class="">
                    <button @click="printPage" type=""><i class="fa-solid fa-plus add_new"></i> Imprimer</button>
                    </div>
                    </div>
         </div>   
     <div class="cat_list">
        <div class="table">
            <table>
                <thead>
                    <tr cell>
                        <th>#ID</th>
                        <th>Nom Medicament</th>
                        <!-- <th>Qte_stock</th> -->
                        <th>Qte_Stock</th>
                        <th>PV Unitaire</th>
                        <!-- <th>Valeur stock</th> -->
                        <th>Valeur Stock</th>
                        <!-- <th>Valeur Total</th> -->
                        <!-- <th>Cree au</th> -->
                        <th>Cree par</th>
                        <th>Categorie</th>
                        <th>Etat</th>
                        <th colspan="2" >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="med in filteredMedecines" :key="med.id_medecine" id="line">
                        <td>{{med.id_medecine}}</td>
                        <td>{{med.name_medecine}}</td>
                      
                        
                        <td style="margin:0px 20px">
                            <div class="qty-5" v-if="med.stock_sum<=10 && med.stock_sum>=1 ">
                            {{med.stock_sum}}
                        </div>
                        <div class="qty-0"  v-else-if="med.stock_sum==0">
                            {{med.stock_sum}}
                        </div>
                        <div class="qty-normal"  v-else>
                            {{med.stock_sum}}
                        </div>
                        </td>
                        <td style="font-weight:800">{{money(med.price_medecine)+' Fbu'}}</td>
                        <td>{{money(med.price_medecine*med.stock_sum)}} Fbu</td>
                        <!-- <td>{{money(med.price_medecine*med.requi_sum)}} Fbu</td> -->
                        <!-- <td>{{money((med.price_medecine*med.stock_sum)+(med.price_medecine*med.requi_sum))}} Fbu</td> -->
                         <!-- <td>{{datetime(med.created_at)}}</td> -->
                        <td>{{med.email}}</td> 
                        <td v-if="med.cat_medecine!=NULL">{{med.cat_medecine}}</td>
                        <td v-else>Non Spesifie</td>

                        <td v-if="med.etat==1"><button @click="changeEtatOff(med)" id="des">Desactiver</button><br><small>Etat: <span>Actif</span> </small> </td>

                        <td v-else><button @click="changeEtatOn(med)" id="act">Activer</button><br><small>Etat: <span id="ina">Inactif</span> </small> </td>

                        <td>
                            <div>    
                                <button @click="edit(med)">Modifier</button>
                            </div>
                        </td>

                        <td ><button v-if="med.etat==1" @click="dialogPurchase=true;acheter(med)">Acheter</button></td>
                    </tr>
                   
                        <tr id="tot">
                            <td>Total</td>
                            <td colspan="2"></td>
                            
                            <td>{{money(ValeurStock())}}Fbu</td>
                            <!-- <td>{{money(ValeurEtagere())}}Fbu</td> -->
                            <!-- <td>{{money(ValeurStock()+ValeurEtagere())}}Fbu</td> -->
                
                            <td colspan="8"></td>
                        </tr>
                   
                </tbody>
            </table>
        </div> 
    </div>
        <add-medecine :edit="modifier" @update="getMedecines" @close="close" v-if="dialog"></add-medecine>
        <add-purchase @getMedecines="getMedecines" @close="close" :acheter="modifier" @update="getMedecines"  v-if="dialogPurchase"></add-purchase>
    </div>
    <div class="print_code">
        <div class="table_print">
            <h3>LISTE DES MEDICAMENTS EN STOCK</h3>
            <table>
                <thead>
                    <tr cell>
                        <th>#ID</th>
                        <th>Nom Medicament</th>
                        <!-- <th>Qte_stock</th> -->
                        <th>Qte_Stock</th>
                        <th>PV Unitaire</th>
                        <!-- <th>Valeur stock</th> -->
                        <th>Valeur Stock</th>
                        <!-- <th>Valeur Total</th> -->
                        <!-- <th>Cree au</th> -->
                        <th>Commentaires ici</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="med in filteredMedecines" :key="med.id_medecine" id="line">
                        <td>{{med.id_medecine}}</td>
                        <td>{{med.name_medecine}}</td>
                      
                        
                        <td style="margin:0px 20px">
                            <div class="qty-5" v-if="med.stock_sum<=10 && med.stock_sum>=1 ">
                            {{med.stock_sum}}
                        </div>
                        <div class="qty-0"  v-else-if="med.stock_sum==0">
                            {{med.stock_sum}}
                        </div>
                        <div class="qty-normal"  v-else>
                            {{med.stock_sum}}
                        </div>
                        </td>
                        <td style="font-weight:800">{{money(med.price_medecine)+' Fbu'}}</td>
                        <td>{{money(med.price_medecine*med.stock_sum)}} Fbu</td>
                        <!-- <td>{{money(med.price_medecine*med.requi_sum)}} Fbu</td> -->
                        <!-- <td>{{money((med.price_medecine*med.stock_sum)+(med.price_medecine*med.requi_sum))}} Fbu</td> -->
                         <!-- <td>{{datetime(med.created_at)}}</td> -->
                        </tr>
                   
                        <tr id="tot">
                            <td>Total</td>
                            <td colspan="3"></td>
                            
                            <td>{{money(ValeurStock())}}Fbu</td>
                            <!-- <td>{{money(ValeurEtagere())}}Fbu</td> -->
                            <!-- <td>{{money(ValeurStock()+ValeurEtagere())}}Fbu</td> -->
                
                            <td colspan="8"></td>
                        </tr>
                   
                </tbody>
            </table>
        </div>
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
            modifier:false,
            buy:false,
            allData:[],
            search:''
        }
    },
    methods: {
        printPage(){
            
            window.print();
        },
        close(){
            this.dialog = false
            this.dialogPurchase = false
        },
        getMedecines(){
            axios
            .get(this.$store.state.url+'getMedStock')
            .then((res)=>{
                this.$store.state.med_stock = res.data
                this.allData = res.data
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
        ValeurStock(){
            let total =0;
            for(let item in this.$store.state.med_stock){
                total = total +(this.$store.state.med_stock[item].price_medecine * this.$store.state.med_stock[item].qty_stock)
            } 
            return total;
        },
        ValeurEtagere(){
            let total =0;
            for(let item in this.$store.state.medecines){
                total = total +(this.$store.state.med_stock[item].price_medecine * this.$store.state.med_stock[item].qty_etagere)
            } 
            return total;
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
    },
    computed:{
        // medecines(){
        //     return this.$store.state?.medecines
        // }
        filteredMedecines(){
            
            return this.$store.state?.med_stock.filter(med => med.name_medecine.toLowerCase().includes(this.search.toLowerCase()))
        }
    }
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>