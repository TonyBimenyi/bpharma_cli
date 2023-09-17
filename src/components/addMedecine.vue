<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Medicament</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Nom du medicament</span>
                <input v-model="form.name_medecine" type="text" placeholder="Entrer le nom" required>
                </div>
    
                <div class="input-box">
                    <div v-if=" ! edit || $store.state.user.data.user.registered_as==`Admin`">
                <span class="details">Prix de Vente Unitaire</span>
                <input v-model="form.price_medecine" type="number" placeholder="Entrer le Prix" required>
                    </div>
                </div>
                <div class="input-box">
                <span class="details">Categorie</span>
                <input type="text" v-model="form.cat_medecine" placeholder="Generique ou Specialite" required>
                </div>
                <div class="input-box">
                <span class="details">Details</span>
                <input type="text" v-model="form.type_medecine" placeholder="Comprime,Sirop,..." required>
                </div>
                <div class="input-box">
                <span class="details">Indication</span>
                <input type="text" v-model="form.indication_medecine" placeholder="Indication de medicament" required>
                </div>
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input v-bind:disabled="isButtonDisabled" @click="addMedecine()" type="submit" :value="btn">
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

export default {
    props:['edit'],
    data() {
        return {
            form:{
                name_medecine:'',
                price_medecine:'',
                cat_medecine:'',
                type_medecine:'',
                indication_medecine:'',
                id_user:this.$store.state.user.data.user.id
            },
                btn: 'Ajouter',
                isButtonDisabled : false
        }
    },
    methods:{
        addMedecine(){
            this.isButtonDisabled = true
            if(this.edit){

                axios.put(this.$store.state.url+'updateMedecine/'+this.$store.state.medecine.id_medecine,this.form)
                .then((response) =>  {
                    this.$emit('update')
                    this.$store.state.medecine = response.data
                    if(response["data"]["status"] == "error")
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
                text:   "Medicament est Modifie avec succes",
                icon: 'success',
              
            });
            this.close()
            this.getMedecines()
             }
                  
                }).catch((error) => {
                    console.log(error)
                })

            }else{
            axios
            .post(this.$store.state.url+'addMedecine',this.form,this.headers)
            .then((res)=>{
                this.$emit('update')
                this.$store.state.medecine= res.data
                console.log(res["data"]["status"]);
                this.form.name_medecine='',
                this.form.price_medecine='',
                this.form.cat_medecine='',
                this.form.type_medecine='',
                this.id_user=''
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
                text:   "Medicament est ajoute avec succes",
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
        }
        
    },
    mounted() {
        this.getMedecines()
        if(this.edit){
            this.form.name_medecine=this.$store.state.medecine.name_medecine;
            this.form.price_medecine=this.$store.state.medecine.price_medecine;
            this.form.cat_medecine=this.$store.state.medecine.cat_medecine;
            this.form.type_medecine=this.$store.state.medecine.type_medecine;
            this.btn = 'Modifier'
        }
    },
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>