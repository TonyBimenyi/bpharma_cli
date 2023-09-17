<template lang="">
    <div class="container">
        <head>
         <meta charset="UTF-8">
    <!--<title> Drop Down Sidebar Menu | CodingLab </title>-->
    <link rel="stylesheet" href="style.css">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" -->
      <!-- crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
    <!-- Boxiocns CDN Link -->
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
      <body>
  <div class="sidebar ">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">BIMBO Pharma</span>
    </div>
    <ul class="nav-links">
       <router-link to="/ventes"><li>
        <a href="#">
          
        <i class="fa-solid fa-money-bill-trend-up">
          <font-awesome-icon icon="fa-solid fa-money-bill-trend-up" />
        </i>
          <span class="link_name">Ventes</span>
        </a>
        <ul class="sub-menu blank">
          <router-link to="/ventes"><li><a class="link_name" href="#">Ventes</a></li></router-link>
        </ul>
      </li>
      </router-link>
      <li>
        <div class="iocn-link">
          <a href="#">
            <i class="fa-solid fa-capsules">
              <font-awesome-icon icon="fa-solid fa-capsules" />
             </i>
            <span class="link_name">Produits</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Medicaments</a></li>
          <router-link to="/medicaments"><li>
            <a href="#">Etagere</a>
          </li></router-link>
          <router-link to="/med_stock"><li>
            <a href="#">Stock</a>
          </li></router-link>
        </ul>
      </li> 
      
       <router-link to="/stock"><li>
        <a href="#">
         <i class="fa-solid fa-box">
          <font-awesome-icon icon="fa-solid fa-box" />
         </i>
          <span class="link_name">Stock</span>
        </a>
        <ul class="sub-menu blank">
          <router-link to="/medicaments"><li><a class="link_name" href="#">Stock</a></li></router-link>
        </ul>
      </li>
      </router-link>
       <router-link to="/requisition"><li>
        <a href="#">
         <i class="fa-solid fa-border-all">
          <font-awesome-icon icon="fa-solid fa-border-all" />
         </i>
          <span class="link_name">Requisitions</span>
        </a>
        <ul class="sub-menu blank">
          <router-link to="/medicaments"><li><a class="link_name" href="#">Stock</a></li></router-link>
        </ul>
      </li>
      </router-link>
       <router-link to="/perte"><li>
        <a href="#">
         <i class="fa-solid fa-trash">
          <font-awesome-icon icon="fa-solid fa-trash" />
         </i>
          <span class="link_name">Pertes</span>
        </a>
        <ul class="sub-menu blank">
          <router-link to="/medicaments"><li><a class="link_name" href="#">Stock</a></li></router-link>
        </ul>
      </li>
      </router-link>
     
      <!-- <li>
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-book-alt' ></i>
            <span class="link_name">Posts</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Posts</a></li>
          <li><a href="#">Web Design</a></li>
          <li><a href="#">Login Form</a></li>
          <li><a href="#">Card Design</a></li>
        </ul>
      </li>-->
      
      
      <router-link to="/stats">
      <li>
        <a href="#">
          <i  >
            <font-awesome-icon icon="fa-solid fa-chart-simple" />
          </i>
          <span class="link_name">Statistiques</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Explore</a></li>
        </ul>
      </li>
      </router-link>
      <router-link to="/users">
      <li>
        <a href="#">
          <i style="background-color:transparent;padding:0px;margin:0px" class="fa-solid fa-user user">
            <font-awesome-icon icon="fa-solid fa-users" />
          </i>  
          <span class="link_name">Utilisateurs</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Explore</a></li>
        </ul>
      </li>
      </router-link>
      <li>
    <div class="profile-details">
      <div class="profile-content">
        <!--<img src="image/profile.jpg" alt="profileImg">-->
      </div>
      <div class="name-job">
        <div class="profile_name">{{$store.state.user.data.user.email}}</div>
        <div class="job">{{$store.state.user.data.user.registered_as}}</div>
      </div>
        <i  @click="logout()"  >
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        </i>
    </div>
  </li>
</ul>
  </div>
  <section class="home-section">
    <div class="home-content">
        <div class="menu">
        <i class='bx bx-menu' ></i>         
        </div>
                
             <div class="menu">
       <i class="fa-solid fa-bell bell">
        <font-awesome-icon icon="fa-solid fa-bell" />
       </i>   
       <i class="fa-solid fa-user user">
        <font-awesome-icon icon="fa-solid fa-user" />
       </i>   
        </div>
    </div>
    <router-view></router-view>
  </section>
 
</body>
    </div>
</template>
<script>

export default {
    mounted(){
                let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
          arrow[i].addEventListener("click", (e)=>{
        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
        arrowParent.classList.toggle("showMenu");
          });
        }
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".bx-menu");
        console.log(sidebarBtn);
        sidebarBtn.addEventListener("click", ()=>{
          sidebar.classList.toggle("close");
        });
    },
    methods: {
      logout() {
			localStorage.removeItem('user')
			this.$store.state.user = null
     this.$router.push('/login')
		}
    },
}
</script>
<style src='../assets/css/navside.css' lang="" scoped>
    
</style>