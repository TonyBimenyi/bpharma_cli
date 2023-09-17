<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Modifier {{this.$store.state.stock.medecine[0].name_medecine}}</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Quantite</span>
                <input v-model="form.initial_qty_requi" type="number" min="0"  placeholder="Entrer la quantite"  required>
                </div>
    
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input v-bind:disabled="isButtonDisabled" @click="addStock()" type="submit" :value="btn">
            </div>
            <div class="button">
                <input v-bind:disabled="isButtonDisabled" @click="reduceStock()" type="submit" :value="btn_">
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
      props:['requisitionner'],
    data() {
        return {
            form:{

                initial_qty_requi:'',
                purchase_price:this.$store.state.stock.unit_price,
                sale_price:this.$store.state.stock.medecine[0]?.price_medecine,
                id_stock:this.$store.state.stock.id_stock,
                id_user:this.$store.state.user.data.user.id,
                id_medecine:this.$store.state.stock.medecine[0]?.id_medecine,
            },
                btn: 'Ajouter',
                btn_:'Enlever',
                isButtonDisabled : false
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
        close(){
            this.$emit('close')
        },
        addStock(){
            
            if(this.$store.state.stock.actual_qty > this.initial_qty_requi){
                Swal.fire({
                title: 'Succes',
                text:   "Non Applicaple",
                icon: 'success',
              
            });
            }else{
            axios
            .post(this.$store.state.url+'addStock/'+this.$store.state.stock.id_stock,this.form)
            .then((res)=>{
                this.$emit('update')
                this.$store.state.stock= res.data
                console.log(res["data"]["status"]);
                this.form.initial_qty_requi='',
                this.form.purchase_price='',
                this.form.sale_price='',
                this.form.id_stock='',
                this.form.id_user=''
                this.form.id_medecine=''
                  if(res["data"]["status"] == "error")
             {
               Swal.fire({
                title: 'OPPS',
                text:   "error",
                icon: 'warning',      
            });
            this.isButtonDisabled = false
             }
              else
             {
               Swal.fire({
                title: 'Succes',
                text:   "Stock est Modifie",
                icon: 'success',
              
            });
            this.close()
            this.getMedecines()
            this.isButtonDisabled = true
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
        reduceStock(){
            this.isButtonDisabled = true
            if(this.$store.state.stock.actual_qty > this.initial_qty_requi){
                Swal.fire({
                title: 'Succes',
                text:   "Non Applicaple",
                icon: 'success',
              
            });
            }else{
            axios
            .post(this.$store.state.url+'reduceStock/'+this.$store.state.stock.id_stock,this.form)
            .then((res)=>{
                this.$emit('update')
                this.$store.state.stock= res.data
                console.log(res["data"]["status"]);
                this.form.initial_qty_requi='',
                this.form.purchase_price='',
                this.form.sale_price='',
                this.form.id_stock='',
                this.form.id_user=''
                this.form.id_medecine=''
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
                text:   "Medicament est Requisitionne",
                icon: 'success',
              
            });
            this.close()
            this.getMedecines()
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
    },
    mounted() {
        this.getMedecines()
    },
}
</script>
<style src='../assets/css/modal.css' scoped>
     .content .form .user-details{
        width: 200%;
     }
</style>