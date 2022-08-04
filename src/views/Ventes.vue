import axios from 'axios';
<template>
<div>

    <div class="vente_container">
        <div class="top_part">
            <div class="search_box">
                <input type="text" name="" value="" placeholder="rechercher">
            </div>
            <div class="cart_icon">
                <i class="fa-solid fa-cart-shopping"></i><span>2</span>
            </div>
        </div>
    </div>
    <div class="product_list">
        <div v-for="med in medecines" :key="med.id_medecine" class="product_card">
            <div class="product_content">
                <h3>{{med.name_medecine}}</h3>
                <div class="sub_content">
                    <div class="price">
                        <p> <span>Prix:</span>{{money(med.price_medecine)+' Fbu'}}</p>
                    </div>
                    <div class="qty">
                        <p>Quantite:  <span>{{med.qty_stock}}</span> </p>
                    </div>
                </div>
                <div class="cart_btn">
                    <div class="cart_qty">
                        <input type="number" name="" value="">
                    </div>
                    <div class="add_btn">
                        <button type="">Ajouter</button>
                    </div>
                </div>
            </div>
        </div>

    </div>   
</div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            medecines:[],
            requisitions:[]
        }
    },
    methods: {
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
    },
     mounted(){
        this.getMedecines();
        this.getRequi()
    }
}
</script>
<style src='../assets/css/top.css' lang="" scoped>
    
</style>