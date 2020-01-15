<template>
  <div class="container">
    <div id="image-container">

    </div>
    <div id="banner-text">
      <h1>
        Välkommen till
        <span id="banner-logo">Biblioteket</span>
      </h1>
      <p v-if="log==false">
        Vänligen
        <router-link to="/login"> logga in </router-link>eller
        <router-link to="/register"> registrera dig </router-link>för att kunna ta del av innehållet på webbplatsen
      </p>
      <p v-if="log==true">
        Läs och lägg till böcker
        <router-link to="/posts"> här </router-link>eller gå till mina sidor
        <router-link to="/profile"> här </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
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
/* Hela sidan */
h1 {
  text-align: center;
}
p {
  text-align: center;
}
/* Banner-bilden och text */
#image-container {
  border-radius: 10px;
  background-image:url("../assets/background.jpg");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  height:400px;
  width:100%;
}
#banner-text {
  padding: 25px;
}
#banner-text h1 {
  font-size: 30px;
}
#banner-text a {
  color: rgb(2, 189, 92);
  text-decoration: none;
  font-weight: bold;
  font-family: "Baloo Bhai", cursive;
  font-size: 18px;
}
#banner-text a:hover {
  color: rgb(1, 184, 89);
}
#banner-text p {
  font-size: 18px;
}
#banner-logo {
  font-family: "Luckiest Guy", cursive;
  letter-spacing: 0.5px;
}

/* Media queries */
@media (max-width: 800px) {
  #banner-text h1 {
    font-size: 24px;
  }
  #banner-text a {
    font-size: 14px;
  }
  #banner-text p {
    font-size: 14px;
  }
}

@media (max-width: 550px) {
  #banner-text h1 {
    font-size: 24px;
  }
  #banner-text a {
    font-size: 16px;
  }
  #banner-text p {
    font-size: 16px;
  }
}
</style>