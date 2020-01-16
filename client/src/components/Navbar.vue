<template>
  <!-- Huvudmenyn -->
  <header id="mainheader">
    <div id="logo-container">
      <a href="#home">
        <h2>Biblioteket</h2>
      </a>
    </div>
    <!-- Mobilmenyn -->
    <div id="mobile-container">
      <div id="mobile-menu" v-on:click="toggleMenu">
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </div>
    <nav id="main-nav" v-on:click="toggleLinks">
      <ul>
        <li>
          <router-link to="/">Hem</router-link>
        </li>
        <li v-if="log==false">
          <router-link to="/register">Registrera</router-link>
        </li>
        <li v-if="log==false">
          <router-link to="/login">Logga in</router-link>
        </li>
        <li v-if="log==true">
          <router-link to="/posts">Böcker</router-link>
        </li>
        <li v-if="log==true">
          <router-link to="/profile">Mina sidor</router-link>
        </li>
        <li v-if="log==true">
          <a class="logout-link" href v-on:click="logout">Logga ut</a>
        </li>
      </ul>
    </nav>
  </header>
</template>



<script>
export default {
  data() {
    return {
      auth: "",
      user: ""
    };
  },
  methods: {
    // Logga ut
    logout() {
      // Tar bort token
      localStorage.removeItem("usertoken");
    },
    toggleMenu() {
      $("#mobile-menu").toggleClass("open");
      $("#main-nav ul").toggleClass("open");
    },
    toggleLinks() {
      if (window.matchMedia("(max-width: 800px)").matches) {
        $("#mobile-menu").toggleClass("open");
        $("#main-nav ul").toggleClass("open");
      }
    }
  },
  beforeCreate() {
    // Kollar om token finns
    const token = localStorage.usertoken;
    if (!token) {
      // Dölj menyvalen för inloggad
      this.log = false;
    } else {
      // Dölj menyvalen för utloggad
      this.log = true;
    }
  }
};
</script>

<style scoped>
/* Huvudmeny */
#mainheader {
  height: 50px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  background-color: rgb(38, 38, 38);
}
#mainheader h2 {
  font-size: 24px;
  line-height: 55px;
  float: left;
  padding-left: 20px;
  color: rgb(255, 255, 255);
  font-family: "Luckiest Guy", cursive;
  letter-spacing: 0.5px;
}

#mainheader h2:hover {
  cursor: pointer;
}

#main-nav {
  float: right;
}

#main-nav ul li {
  float: left;
  display: block;
  list-style-type: none;
  line-height: 49px;
  color: white;
}
#main-nav ul li:hover {
  background-color: rgb(2, 189, 92);
}
#main-nav ul li:hover .logout-link {
  background-color: rgb(228, 73, 73);
}
#main-nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 12px 20px;
  font-family: "Baloo Bhai", cursive;
}
#main-nav ul li a.router-link-exact-active {
  background-color: rgb(2, 189, 92);
}
/* Mobilmenyn döljs som standard */
#mobiler-container {
  display: none;
}
#mobile-menu {
  display: none;
}

/* Media queries */
@media (max-width: 800px) {
  /* Ändrar utseende på menyn */
  #main-nav {
    z-index: 999;
    position: relative;
    float: none;
    width: 100%;
  }
  #main-nav ul li a {
    padding: 5px;
    text-align: left;
    width: 100%;
    display: block;
    line-height: 0;
  }
  #main-nav ul {
    display: none;
  }
  #main-nav ul li {
    background-color: rgb(38, 38, 38);
    float: none;
    width: 100%;
    display: block;
    z-index: 99999;
  }

  ul li:nth-child(1) {
    border-top: 2px solid white;
  }
  /* Menyn öppnad */
  #main-nav ul.open {
    display: block;
    margin-top: 50px;
  }
  #main-nav ul.open li a {
    padding: 30px;
    font-size:14px;
  }
  #mobile-container {
    position: relative;
    width: 40px;
    float: right;
    margin: 16px 10px;
  }
  #mobile-menu {
    cursor: pointer;
    display: block;
  }
  /* Mobilmeny-knappen */
  #mobile-menu span {
    background: white;
    display: block;
    width: 25px;
    height: 3px;
    margin-bottom: 3px;
    position: relative;
    top: 0;
    transition: all ease-in-out 0.2s;
    border-radius: 5px;
  }
  /* Gör om menyikonen till ett kryss */
  #mobile-menu.open span:nth-child(2) {
    width: 0;
    opacity: 0;
  }
  #mobile-menu.open span:nth-child(3) {
    transform: rotate(45deg);
    top: -6px;
  }

  #mobile-menu.open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 6px;
  }
}
</style>