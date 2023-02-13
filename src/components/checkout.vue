<template>
     
    <div class="addMedecine">
       
        <div class="container">
                <div class="top">
            <div class="title">Valider le Paiement</div>
            <div class="titl"><button @click="close" >X</button></div>
            </div>
            <div class="content">
            <div class="form">
        
            <div class="user-details">
                <div class="input-box">
                <span class="details">Nom du Client </span>
                <input v-model="form.nom_client" type="text" placeholder="Entrer le nom" required>
                </div>
    
                <!-- <div class="input-box">
                <span class="details">Prix de Vente Unitaire</span>
                <select name="" id="">
                    <option value="">Pas de Dette</option>
                    <option value="">Dette</option>
                </select>
                </div> -->
                <div class="input-box">
                <span class="details">Montant Paye</span>
                <input v-model="form.somme_retourner" type="number" placeholder="Entrer le montant" required>
                </div>
                <div class="input-box">
                <p>----------------------------------------</p>
                </div>

                <div class="input-box">
                <p>--------------------------------------</p>
                </div>

                <div class="input-box">
                <h5>Montant Total du Commande: {{money(totalPrice())}} Fbu</h5>
                </div>

                <div class="input-box">
                    <div  v-if="ayasubizwa()<0">
                        <h5>Reste: 0</h5>
                    </div>
                     <div  v-else>
                        <h5>Reste: {{money(ayasubizwa())}} Fbu</h5>
                     </div>
               
                </div>

                
                

              
            </div>
            <div class="gender-details">
            </div>
            <div class="button">
        
                <input @click="addOrder();printPage()" type="submit" value="Valider le paiement">
                <!-- <button @click="printPage()">Print</button> -->
            </div>
            </div>
        </div>
        </div>

    </div>
    <div class="facture">
        <div class="facture">
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="facture_container">
        <div class="logo_part">
            <div class="logo">
                <h1>LOGO HERE</h1>
            </div>
        </div>
        <div class="divider">
            <p></p>
        </div>
        <div class="invoice_pres">
            <div class="ese">
                <h2>    Bimbo Pharma</h2>
                <p>NIF: 9384736</p>
                <p>RC:423847234</p>
            </div>
            <div class="invoce_details">
                <p><strong>#Facture: </strong>{{getlastId[0]?.id_order+1}}</p>
                <p><strong>Date: </strong>{{new Date().toLocaleString()}}</p>
            </div>
        </div>
        <div class="cat_list">
            <div class="table">
                <table>
                    <thead>
                        <tr >
                               
                                <th>Medicament</th>
                                <th>Prix</th>
                                <th>Qte</th>
                                <th>Prix Total</th>
                                
                               
                        </tr>
                    </thead>
                    <tbody>
                           <tr v-for="cart in carts" :key="cart.id" >
                              <td >{{ cart.name_medecine }}</td>
                              <td>{{ money(cart.price_medecine)+ ' Fbu' }}</td>
                              <td>{{cart.quantite}}</td>
                              <td>{{ money(cart.price_medecine*cart.quantite)+ ' Fbu' }}</td>
                           </tr>
                          
                    
                            
                    
                    </tbody>
                </table>
            </div> 
        </div>
        <div class="total_part">
            <div class="merci">
                <!-- <div class="montant">
                    <p><strong>Montant Paye: </strong>50.000Fbu</p>
                    <p><strong>Reste: </strong>5.000Fbu</p>
                </div> -->
            </div>
            <div class="total_facture">
                <div class="subtotal">
                    <p><strong>Sous Total: </strong>{{money(totalPrice())}} Fbu</p>
                    <p><strong>TVA: </strong>0%</p>
                </div>
                <div class="totalOG">
                    <p><strong>Total: </strong>{{money(totalPrice())}} Fbu</p>
                </div>
            </div>
        </div>
        <div class="divider2">
            <p></p>
        </div>
        <div class="contact">
            <div class="phone">
                <p><strong>Phone: </strong>+2577985285</p>
            </div>
            <div class="addresse">
                <p><strong>Addresse: </strong>Gihosha, Bujumbura-Burundi</p>
            </div>
            <div class="email">
                <p><strong>Email: </strong>bimbo@gmail.com</p>
            </div>
        </div>
        <div class="divider3">
            <p></p>
        </div>
        <div class="merci">
            <p>Merci,Murakoze,Thank You!</p>
        </div>
    </div>
   
</body>
</html>
</div>
    </div>
    
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            getlastId:{},
            nowDate:new Date().toLocaleString(),
            carts:this.$store.state.carts,
            form:{
                nom_client:'',               
                nif_client:'',
                montant_total:this.totalPrice(),
                carts:this.$store.state.carts,
                id_user:this.$store.state.user.data.user.id,
                somme_retourner : this.totalPrice(),
                date_commande:new Date().toLocaleString()

            },
              
        }
    },
    methods:{
        resetCart(e){

            this.carts.splice(e)
        },
        printPage(){
            
            window.print();
        },
        totalPrice(){
        //    this.total = this.carts.reduce((t,i)=>{
        //     return t + this.quantite * i.price_medecine
        //    },0)
        let total = 0;
        for(let i in this.$store.state.carts){
            total = total + (this.$store.state.carts[i]?.quantite * this.$store.state.carts[i]?.price_medecine)
        }
        return total;
        },
        ayasubizwa(){
            let reste;
            reste = this.form.somme_retourner-this.totalPrice();
            return reste;
        },
        addOrder(){
         
            axios
            .post(this.$store.state.url+'addOrder',this.form,this.headers)
            .then((res)=>{
          
                console.log(res["data"]["status"]);
                this.form.nom_client='',
                this.form.nif_client='',
                this.form.montant_total='',
                this.form.montant_a_paye = '',       
                this.form.carts = "",      
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
                text:   "Commande est ajoute avec succes",
                icon: 'success',
              
            });
            this.close()
            this.getMedecines()
            this.resetCart()
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
         getMedecines(){
          this.$emit('getMedecines')
        },
        lastId(){
            axios
            .get(this.$store.state.url+'lastId')
            .then((res)=>{
                this.getlastId = res.data
          
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
        this.totalPrice();
        this.ayasubizwa();
        this.getMedecines();
        this.lastId();
     
    },
}
</script>
<style src='../assets/css/modal.css' scoped>

</style>