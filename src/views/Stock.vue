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
                            <tr cell>
                                    <th>#ID stock</th>
                                    <th>Medicament</th>
                                    <th>Qte initial</th>
                                    <th>Qte Actuelle</th>
                                    <th>PAU Unitaire</th>
                                    <th>PA Total</th>
                                    <th>date d'expiration</th>
                                    <th>Prix de vente</th>
                                    <th>Cree au</th>
                                    <th>cree par</th>                      
                                    <th>Unite</th>
                                    <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for="sto in stocks" :key="sto.id_stock">
                                    <td>{{sto.id_stock}}</td>
                                    <td>{{sto.name_medecine}}</td>
                                    <td>{{sto.initial_qty}}</td>
                                    <td>{{sto.actual_qty}}</td>
                                    <td>{{money(sto.unit_price)+' Fbu'}}</td>
                                    <td>{{money(sto.total_price)+' Fbu'}}</td>
                                    <td>{{datetime(sto.exp_date)}}</td>
                                    <td>{{money(sto.price_medecine+' Fbu')}}</td>
                                    <td>{{datetime(sto.created_at)}}</td>
                                    <td>{{sto.name}}</td>
                                    <td>{{sto.unite}}</td>
                                     <td ><button>Requisitionner</button></td>
                                      <td ><button id="des" style="font-size:13px">Delete</button></td>
                                </tr>
                        
                        
                                <tr id="tot">
                                    <td>Total</td>
                                    <td colspan="3"></td>
                                    <td>4.600 Fbu</td>
                                    <td colspan="8"></td>
                                </tr>
                        
                        </tbody>
                    </table>
                </div> 
            </div>
     </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            stocks:[]
        }
    },
    methods: {
        getStock(){
            axios
            .get(this.$store.state.url+'stock')
            .then((res)=>{
                this.stocks = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    },
    mounted() {
        this.getStock()
    },
}
</script>
<style src='../assets/css/categories.css' scoped>

</style>