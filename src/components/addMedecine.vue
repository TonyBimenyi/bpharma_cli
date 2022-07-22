<template>
    <div class="addMedecine">
        <body>
    <div class="container">
        <div class="top">
      <div class="title">Nouveau Medicament</div>
      <div class="title"><button>X</button></div>
      </div>
      <div class="content">
        <form action="#">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Nom du medicament</span>
              <input type="text" placeholder="Entrer le nom" required>
            </div>
 
            <div class="input-box">
              <span class="details">Prix de Vente Unitaire</span>
              <input type="text" placeholder="Entrer le Prix" required>
            </div>
             <div class="input-box">
              <span class="details">Categorie</span>
              <input type="text" placeholder="Generique ou Specialite" required>
            </div>
            <div class="input-box">
              <span class="details">Details</span>
              <input type="text" placeholder="Comprime,Sirop,..." required>
            </div>
            <div class="input-box">
              <span class="details">Indication</span>
              <input type="text" placeholder="Indication de medicament" required>
            </div>
          </div>
          <div class="gender-details">
          </div>
          <div class="button">
            <input type="submit" value="Ajouter">
          </div>
        </form>
      </div>
    </div>
  
  </body>
    </div>
</template>
<style src='../assets/css/modal.css' scoped>

</style>