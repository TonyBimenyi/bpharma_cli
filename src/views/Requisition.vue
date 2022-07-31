<template>
     <div class="cat-container">
        <div class="top_part">
                <div class="search_box">
                    <div class="date_debut">
                        <strong style="font-size:13px">Du: </strong><input type="date">
                    </div>
                    <div class="date_debut">
                        <strong style="font-size:13px">Au: </strong><input type="date">
                    </div>
                    <div class="search">
                         <input  type="text" name="" value="" placeholder="rechercher">
                    </div>
                </div>
                <div class="add_btn">
                    <p >Stock Rompu</p>
                <!-- <button @click="dialog=true;modifier=false" type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button> -->
                </div>

            </div>   
            <div class="cat_list">
                <div class="table">
                    <table>
                        <thead>
                            <tr cell>
                                    <th>#ID</th>
                                    <th>Medicament</th>
                                    <th>Qte initial</th>
                                    <th>Qte Actuelle</th>
                                    <th>PA Unitaire</th>
                                    <th>PA Total</th>
                                    <th>date d'expiration</th>
                                    <th>PV Unitaire</th>
                                    <th>PV Total</th>
                                    <th>Cree au</th>
                                    <th>Cree par</th>                      
                                    <th>Valide Par</th>
                                    <th colspan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                               <tr>
                                    <td></td>
                                    <td></td>
                               </tr>
                        
                        
                                <tr id="tot">
                                    <td>Total</td>
                                    <td colspan="4"></td>
                                   
                                    <td></td>
                                    <td></td>
                                  
                                    <td colspan="8"></td>
                                </tr>
                        
                        </tbody>
                    </table>
                </div> 
            </div>
  <add-requisition @update="getStock" @close="close" :requisitionner="modifier"   v-if="dialogRequisition"></add-requisition>          
     </div>
</template>
<style src='../assets/css/categories.css' scoped>

</style>