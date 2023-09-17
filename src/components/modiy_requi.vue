<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Modifier la requisition {{this.$store.state.perte.name_medecine}}</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Quantite</span>
                <input  type="number" min="0" v-model="form.qty"  placeholder="Entrer la quantite achete"  required>
                </div>   
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input v-bind:disabled="isButtonDisabled" type="submit" @click="addPerte()" :value="btn">
            </div>
            <div class="button">
                <input type="submit" @click="ReducePerte()" :value="btn_">
            </div>
            </div>
        </div>
        </div>
    </transition>  
  </body>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2'
export default {
    data(){
        return{
            form:{
                qty:'',
                description:'jkhasd',
                id_requi:this.$store.state.perte.id_requi,
                id_stock:this.$store.state.perte.id_stock,
                id_user:this.$store.state.user.data.user.id,
                id_medecine:this.$store.state.perte.id_medecine,

            },
            btn: 'Ajouter',
            btn_: 'Enlever',
            isButtonDisabled : false
        }
    },
    methods:{
        getRequi(){
            this.$emit('getRequi')
        },
        close(){
            this.$emit('close')
        },
        addPerte(){
            this.isButtonDisabled = true
            axios
            .post(this.$store.state.url+'modifyRequiAdd/'+this.$store.state.perte.id_requi,this.form)
            .then((res)=>{
                this.$store.state.stock = res.data
                console.log(res["data"]["status"]);
           
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
                text:   "Requisition est modifie",
                icon: 'success',
              
            });
            this.close()
            this.getRequi()
        }
        })
        .catch((e)=>{
              console.log(e);
               Swal.fire({
              title: 'Hurry',
              text:   e,
              icon: 'warning',
              
            });
            })
        },
        ReducePerte(){
            this.isButtonDisabled = true
            axios
            .post(this.$store.state.url+'modifyRequiReduce/'+this.$store.state.perte.id_requi,this.form)
            .then((res)=>{
                this.$store.state.stock = res.data
                console.log(res["data"]["status"]);
           
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
                text:   "Requisition est modifie",
                icon: 'success',
              
            });
            this.close()
            this.getRequi()
        }
        })
        .catch((e)=>{
              console.log(e);
               Swal.fire({
              title: 'Hurry',
              text:   e,
              icon: 'warning',
              
            });
            })
        }
        
    },
    mounted(){
        this.getRequi()
    }
}
</script>
<style src='../assets/css/modal.css' scoped>
     .content .form .user-details{
        width: 200%;
     }
</style>