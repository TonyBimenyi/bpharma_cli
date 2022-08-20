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
    <div class="vente-content">
        <div class="product_list">
            <div v-for="med in medecines" :key="med.id_medecine" class="product_card">
                <div class="product_content">
                    <h5>{{med.name_medecine}}</h5>
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
                            <input type="number" v-model="cartadd.qty" name="" >
                        </div>
                        <div class="add_btn">
                            <button @click="addCart(med)" type="">Ajouter</button>
                        </div>
                    </div>
                </div>
             </div>
    </div>   
        <div class="cart">
            <h5>Panier({{ badge }})</h5>
            <div class="items-list">
                <div class="items" v-for="(cart, n) in carts" :key="cart.id">
                    <div class="text">
                        <p>{{ cart.name }} <br> Prix: {{ money(cart.price)+ ' Fbu' }} </p>
                    </div>
                    <div class="buttons">
                        <div class="decrement">
                            <button>-</button>
                        </div>
                        <div class="number">
                            <p>3</p>
                        </div>
                        <div class="increment">
                            <button>+</button>
                        </div>
                    </div>
                    <div class="deletecart">
                        <button @click="removeCart(n)"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>

                <div class="total-cart">
                    <div class="total">
                          <p style="text-align:center"> TOTAL: {{money(totalprice)+' Fbu'}}</p>
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
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            medecines:[],
            requisitions:[],
            carts:[],
            cartsElement : [],
            cartadd:{
                id:'',
                name:'',
                price:'',
                amount:'',
                qty:''
            },
            badge:0,
            quantity:1,
            totalprice:0
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
        viewCart(){
            if(localStorage.getItem('carts')){
                this.carts = JSON.parse(localStorage.getItem('carts')),
                this.badge = this.carts.length;
                this.totalprice = this.carts.reduce((total, item)=>{
                    return total + this.quantity * item.price
                },0)
            }
        },
        addCart(med){
            this.cartadd.id = med.id_medecine;
            this.cartadd.name = med.name_medecine;
            this.cartadd.price = med.price_medecine;
            this.carts.push(this.cartadd);
            this.cartadd = {};
            this.storeCart();
        },
        removeCart(med){
            this.carts.splice(med,1)
            this.storeCart()
        },
        resetCart(){
           localStorage.removeItem('carts');
           this.carts = JSON.parse(localStorage.getItem('carts'));
           this.badge = 0;
           this.totalprice=0;
        },
        storeCart(){
            let parsed = JSON.stringify(this.carts);
            localStorage.setItem('carts',parsed)
            this.viewCart();
        }

    },
     mounted(){
        this.getMedecines();
        this.getRequi(),
        this.details = JSON.parse(localStorage.getItem("details"));
    },

    created(){
        //   this.viewProduct(),
          this.viewCart()
        },
    computed:{
        count(){
            return this.$store.state.cartItemCount;
        }
    }
}
</script>
<style src='../assets/css/top.css' lang="" scoped>
    
</style>