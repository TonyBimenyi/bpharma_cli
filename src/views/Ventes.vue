<template>
<div class="v_container">
    <div class="vente_container">
        <div class="top_part">
            <div class="search_box">
                <input type="text" name="" v-model="search" @keydown="filteredMedecines()"  placeholder="rechercher">
            </div>
            <router-link to="/histoventes"> 
            <div class="hist">
                 <span>HISTORIQUE DES VENTES</span> 
            </div>
              </router-link> 
            <div class="cart_icon">
              <i class="fa-solid fa-cart-shopping"></i><span>{{carts.length}}</span>
            </div>
        </div>
    </div>
    <div class="vente-content">
        <div class="product_list">
            <div v-for="(med, m) in medecines" :key="med.id_medecine" class="product_card">
                <div class="product_content">
                    <h5>{{med.medecine[0]?.name_medecine }}</h5>
                    <div class="sub_content">
                        <div class="price">
                            <p> <span>Prix:</span> {{money(med.medecine[0]?.price_medecine)+' Fbu'}}</p>
                        </div>
                        <div class="price">
                            <p><small>Lot N°{{med.id_requi}} </small> </p>
                        </div>
                        <div class="qty">
                            <p>Quantite:  <span>{{med.actual_qty_requi}}</span> </p>
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
                            <button :disabled="med.quantite>=med.actual_qty_requi"  @click="addToCart(med)">+</button> 
                        </div>
                        <!-- <div class="add_btn">
                            <button @click="addCart(med)" type="">Ajouter</button>
                        </div> -->
                    </div>
                </div>
             </div>
        </div>   
        <div class="cart">
            <h5>Panier({{carts.length}})</h5>
            <div class="items-list">
                <div class="items" v-for="(cart, n) in carts" :key="cart.id">
                    <div class="text">
                        <p> {{ cart.name_medecine }}<br> Prix: {{ money(cart.price_medecine)+ ' Fbu' }} <small> <br> Lot N°{{cart.id_requi}} </small></p>
                    </div>
                    <div class="buttons">
                        <div class="decrement">
                            <button :disabled="cart.quantite==0"  @click="decrement(cart)">-</button>
                        </div>
                        <div class="number">
                            <p>{{cart.quantite}}</p>
                        </div>
                        <div class="increment">
                            <button :disabled="cart.quantite>=cart.actual_qty_requi" @click="addToCart(cart)">+</button>
                        </div>
                    </div>
                    <div class="deletecart">
                        <button @click="removeItem(n)" ><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>

                <div class="total-cart">
                    <div class="total">
                          <p style="text-align:center"> TOTAL: {{money(totalPrice())}} Fbu</p>
                    </div>
                    <!-- <div class="montant">
                        <div class="text">
                            <p>Montant: </p>
                        </div>
                        <div class="input">
                            <input type="text" v-model="somme_retourner">
                        </div>
                        
                    </div> -->
                    <!-- <div class="retourne">
                            <div  v-if="ayasubizwa()<0">
                                 <p style="text-align:center"> Somme a lui retourner: 0 </p>
                             </div>
                             <div  v-else>
                                 <p style="text-align:center"> Somme a lui retourner: {{money(ayasubizwa())}}</p>
                             </div>

                    </div> -->
                    <div class="checkout_buttons">
                        <div class="reset">
                            <button @click="resetCart(cart)">Actualiser</button>
                        </div>
                        <div class="pay">
                            <button @click="dialog=true;checkout()">Payer</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

    <!-- <div>

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
       
    </div> -->
    <checkout-modal  @close="close" v-if="dialog"></checkout-modal>
</template>

<script>
import axios from 'axios'
import checkoutModal from '../components/checkout.vue'
import Swal from 'sweetalert2'
export default {
    components:{
        checkoutModal,
        
    },
    
    data(){
        return{

            dialog:false,
            details:false,
            carts:[],
            medecines:[],
            quantite: [],
            elements:[
            ],
            badge:0,
            total : 0,
            somme_retourner : '',
            search:'',
        }
    },
    computed:{
        filteredMedecines:function(){
            this.medecines.filter((med)=>{
                 med.name_medecine.toLowerCase().match(this.search.toLowerCase());
            })
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
        checkout(){
            this.$store.state.carts = this.carts; 
            
        },
        close(){
            this.dialog = false
        },
        ayasubizwa(){
            let reste;
            reste = this.somme_retourner-this.totalPrice();
            return reste;
        },
        totalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.carts){
            total = total + (this.carts[i].quantite * this.carts[i].price_medecine)
        }
        return total;
        },
        getMedecines(){
             axios
            .get(this.$store.state.url+'requisitionVentes')
            .then((res)=>{
                this.medecines = res.data
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        resetCart(e){

            this.carts.splice(e)
        },
        removeItem(e){
          
                    this.carts.splice(e,1)
          
        },
        
        decrement(e){
            const index =  this.getIndexOfElement(e);
        if(index === 1 ){

            if(this.quantite[index]){
                
                 e.quantite = this.quantite[index];
            }else{
                e.quantite = 0
              
            }
           
            this.totalPrice();
            this.ayasubizwa();
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
            if(this.quantite[index]){
              
                this.carts[index].quantite += this.quantite[index] * 1;
                  
            }else{
                this.carts[index].quantite += 1 * 1;         
            }
           
                 if(this.carts[index].quantite==e.actual_qty_requi){
                this.carts[index].quantite += 1 * 0;  
                
                 Swal.fire({
                title: 'Attention',
                text:   "On ne peut pas depasser la quantite disponible",
                icon: 'warning',
                 });
                 }
        
            
                                
        }        
        }
         ,
        getIndexOfElement(med){
            
            for(let i=0; i < this.carts.length ; i++){
                if(this.carts[i].id_requi == med.id_requi){
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