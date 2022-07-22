<template>
    <div class="cat-container">
        <div class="top_part">
            <div class="search_box">
                <input type="text" name="" value="" placeholder="rechercher">
            </div>
                <div class="add_btn">
                <button type=""><i class="fa-solid fa-plus add_new"></i> Ajouter un Medicament</button>
                </div>
         </div>   
     <div class="cat_list">
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nom Medicament</th>
                        <th>Prix Unitaire</th>
                        <th>Date de creation</th>
                        <th>Cree par</th>
                        <th colspan="2" >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="line">
                        <td>1</td>
                        <td>Abnal</td>
                        <td>1000 Fbu</td>
                        <td>5-3-2022</td>
                        <td>TonyBim</td>
                        <td><button>Modifier</button></td>
                        <td><button>Acheter</button></td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
    </div>
</template>
<style src='../assets/css/categories.css' scoped>

</style>