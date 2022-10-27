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
    <div class="vente-content">
        <div class="product_list">
            <div v-for="(med, m) in medecines" :key="med.id_medecine" class="product_card">
                <div class="product_content">
                    <h5>{{med.name_medecine}}</h5>
                    <div class="sub_content">
                        <div class="price">
                            <p> <span>Prix:</span> {{money(med.price_medecine)+' Fbu'}}</p>
                        </div>
                        <div class="qty">
                            <p>Quantite:  <span>{{med.qty_stock}}</span> </p>
                        </div>
                    </div>
                    <div class="cart_btn">
                        <div class="increment">
                            <button :disabled="med.quantite==0 || med.quantite == 'null'" @click="decrement(med)">-</button>
                        </div>
                        <div class="cart_qty">
                            <input type="number"  name="" >
                        </div>
                        <div class="increment">
                            <button @click="addToCart(med)">+</button>
                        </div>
                        <!-- <div class="add_btn">
                            <button @click="addCart(med)" type="">Ajouter</button>
                        </div> -->
                    </div>
                </div>
             </div>
        </div>   
        <div class="cart">
            <h5>Panier()</h5>
            <div class="items-list">
                <div class="items" v-for="(cart, n) in carts" :key="cart.id">
                    <div class="text">
                        <p> {{ cart.name_medecine }}<br> Prix: {{ money(cart.price_medecine)+ ' Fbu' }}</p>
                    </div>
                    <div class="buttons">
                        <div class="decrement">
                            <button :disabled="cart.quantite==0"  @click="decrement(cart)">-</button>
                        </div>
                        <div class="number">
                            <p>{{cart.quantite}}</p>
                        </div>
                        <div class="increment">
                            <button @click="addToCart(cart)">+</button>
                        </div>
                    </div>
                    <div class="deletecart">
                        <button @click="removeItem(n)" ><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>

                <div class="total-cart">
                    <div class="total">
                          <p style="text-align:center"> TOTAL: </p>
                    </div>
                    <div class="montant">
                        <div class="text">
                            <p>Montant: </p>
                        </div>
                        <div class="input">
                            <input type="text">
                        </div>
                        
                    </div>
                    <div class="retourne">
                            <p style="text-align:center"> Somme a lui retourner: 3000Fbu</p>
                          

                    </div>
                    <div class="checkout_buttons">
                        <div class="reset">
                            <button @click="resetCart()">Actualiser</button>
                        </div>
                        <div class="pay">
                            <button>Payer</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

    <div>

        {{ quantite }}

        <div>
            <div v-for="(element ,x ) in carts" :key="x" >
                <p>{{element}}</p>
            </div>

         </div>

         <button @click="sendData">SUBMIT DATA</button>

        <div class="challenge">

            <div  v-for="(med, m) in medecines" :key="med.id_medecine" >
                <h6 class="title_el">
                    <span>{{ med.name_medecine }}</span>
                     <small> Qte : {{   med.quantite }}</small>
                </h6>
                <input v-model="quantite[m]" />
                <div class="title_el">
                    <button @click="addToCart(med)"> + </button>
                    <button> - </button>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    
    data(){
        return{

            carts:[],
            medecines:[],
            quantite: [],
            elements:[
            ],
            badge:0,
        }
    },
    mounted(){
        this.getMedecines();
        for(var i=0; i< 20; i++){
            this.elements.push({
                id : i,
                name : "element_" + i, 
                quantite : Math.ceil(Math.random() * 20 ) 
            })
        }
    },
    methods:{
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
        removeItem(e){
          
                    this.carts.splice(e,1)
          
        },
        decrement(e){
            const index =  this.getIndexOfElement(e);
        if(index === 1){

            if(this.quantite[index] ){
                 e.quantite = this.quantite[index];
            }else{
                e.quantite = 0
              
            }
            this.carts.push(e);
        }else{
            if(this.quantite[index] ){
                this.carts[index].quantite -= this.quantite[index] * 1;
            }else{
                this.carts[index].quantite -= 1 * 1;
            }
             
        }
        },
        addToCart(e){
        const index =  this.getIndexOfElement(e);
        if(index === -1){

            if(this.quantite[index] ){
                 e.quantite = this.quantite[index];
            }else{
                e.quantite = 1
            }
            this.carts.push(e);
        }else{
            if(this.quantite[index] ){
                this.carts[index].quantite += this.quantite[index] * 1;
            }else{
                this.carts[index].quantite += 1 * 1;
            }
             
        }

        }
         ,
        getIndexOfElement(med){
            
            for(let i=0; i < this.carts.length ; i++){
                if(this.carts[i].id_medecine === med.id_medecine){
                    return i;
                }
            }

            return -1;
        }
    }
}
</script>

<style src='../assets/css/top.css' lang="" scoped>
.challenge{

        display: flex;
        justify-content: space-around;
       flex-wrap: wrap;
      
}

.title_el{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
</style>