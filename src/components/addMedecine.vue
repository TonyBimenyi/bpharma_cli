<template>
    <div class="addMedecine">
        <body>
    <div class="container">
        <div class="top">
      <div class="title">Nouveau Medicament</div>
      <div class="title"><button @click="close" >X</button></div>
      </div>
      <div class="content">
        <div class="form">
      
          <div class="user-details">
            <div class="input-box">
              <span class="details">Nom du medicament</span>
              <input v-model="form.name_medecine" type="text" placeholder="Entrer le nom" required>
            </div>
 
            <div class="input-box">
              <span class="details">Prix de Vente Unitaire</span>
              <input v-model="form.price_medecine" type="number" placeholder="Entrer le Prix" required>
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
            <input @click="addMedecine()" type="submit" value="Ajouter">
          </div>
        </div>
      </div>
    </div>
  
  </body>
    </div>
</template>
<script>
import axios from 'axios'
 import Swal from 'sweetalert2'
export default {
    data() {
        return {
            form:{
                name_medecine:'',
                price_medecine:'',
                cat_medecine:'',
                type_medecine:'',
                indication_medecine:'',
                id_user:this.$store.state.user.data.user.id,
            }
        }
    },
    methods:{
        addMedecine(){
            axios
            .post(this.$store.state.url+'addMedecine',this.form)
            .then((res)=>{
                console.log(res["data"]["status"]);
                this.form.name_medecine='',
                this.form.price_medecin='',
                this.form.price_medecine='',
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
                title: 'Hurry',
                text:   "You have been logged-in successfully",
                icon: 'success',
              
            });
            // this.$router.push('/ventes')
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
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>