<template>
  <div class="container">
    <div id="image-container">
      <img id="home-img" src="../assets/background.jpg" alt="Bild på ett bibliotek inifrån" />
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
h1 {
  text-align: center;
}
p {
  text-align: center;
}
#banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.955);
  padding: 25px;
  border-radius: 10px;
}
#banner-text h1 {
  font-size: 30px;
}
#banner-text a {
  color: rgb(2, 189, 92);
  text-decoration: none;
  font-weight: bold;
  font-family: "Baloo Bhai", cursive;
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
#image-container {
  position: relative;
}
#home-img {
  width: 100%;
  border-radius: 2.5px;
}
</style>