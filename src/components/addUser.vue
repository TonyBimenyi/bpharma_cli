<template>
    <div class="addMedecine">
        <body>
    <transition mode="out-in"
    enter-active-class="animate__animated animate__fadeInRight"
	leave-active-class="animate__animated animate__fadeOutLeft"
     >
        <div class="container">
            <div class="top">
        <div class="title">Utilisateur</div>
        <div class="titl"><button @click="close" >X</button></div>
        </div>
        <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Nom et Prenom</span>
                <input v-model="form.name" type="text" placeholder="Entrer le nom" required>
                </div>
    
                <div class="input-box">
                <span class="details">Username</span>
                <input v-model="form.email" type="text" placeholder="Entrer le Nom D'utilisateur" required>
                </div>
                <div class="input-box">
                <span class="details">Role</span>
                    <select name="" v-model="form.registered_as" id="">
                        <option selected value="----">-----</option>
                        <option value="Admin">Admin</option>
                        <option value="Pharmacien">Pharmacien</option>
                    </select>
                </div>
                <div class="input-box">
                <span class="details">Mot de passe</span>
                <input type="password" v-model="form.password" placeholder="**************" required>
                </div>
                <div class="input-box">
                <span class="details">Confimation mot de passe</span>
                <input type="password" v-model="form.password_confirmation" placeholder="*******" required>
                </div>
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
                <input @click="saveUser()" type="submit" :value="btn">
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
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
            },
                btn: 'Ajouter'
        }
    },
    methods:{
        saveUser(){
            if(this.edit){

                axios.put(this.$store.state.url+'updateUser/'+this.$store.state.uti.id,this.form)
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
            this.getUsers()
             }
                  
                }).catch((error) => {
                    console.log(error)
                })

            }else{
            axios
            .post(this.$store.state.url+'register',this.form,this.headers)
            .then((res)=>{
                this.$emit('update')
                this.$store.state.medecine= res.data
                console.log(res["data"]["status"]);
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
                text:   "Utilisateur est ajoute avec succes",
                icon: 'success',
              
            });
            this.close()
            this.getUsers()
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
         getUsers(){
            this.$emit('getUsers')
         },
        close(){
            this.$emit('close')
        }
        
    },
    mounted() {
        this.getUsers()
        if(this.edit){
            this.form.name=this.$store.state.uti.name;
            this.form.email=this.$store.state.uti.email;
            this.form.password=this.$store.state.medecine.cat_medecine;
            this.form.password_confirmation=this.$store.state.medecine.type_medecine;
            this.btn = 'Modifier'
        }
    },
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>