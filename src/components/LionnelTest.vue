<template>
    <div>

        {{ quantite }}

        <div>
            <div v-for="(element ,x ) in carts" :key="x" >
                <p>{{element}}</p>
            </div>

         </div>

         <button @click="sendData">SUBMIT DATA</button>

        <div class="challenge">

            <div  v-for="(el, i) in elements" :key="el.id" >
                <h6 class="title_el">
                    <span>{{ el.name }}</span>
                     <small> Qte : {{   el.quantite }}</small>
                </h6>
                <input v-model="quantite[i]" />
                <div class="title_el">
                    <button @click="addToCart(el)"> + </button>
                    <button> - </button>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script>
export default {
    
    data(){
        return{

            carts:[],
            quantite: [],
            elements:[
            ]
        }
    },
    mounted(){

        for(var i=0; i< 20; i++){
            this.elements.push({
                id : i,
                name : "element_" + i, 
                quantite : Math.ceil(Math.random() * 20 ) 
            })
        }
    },
    methods:{
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
        getIndexOfElement(e){
            
            for(let i=0; i < this.carts.length ; i++){
                if(this.carts[i].id === e.id){
                    return i;
                }
            }

            return -1;
        }
    }
}
</script>

<style>
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