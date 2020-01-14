
<template>
  <div class="container">
    <h2>Profil</h2>

          <p>Användarnamn: {{username}}</p>

          <p>E-postadress: {{email}}</p>

  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import router from "../router";
export default {
  data() {
    // Läser in token från localstorage
    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwtDecode(token);
      return {
        username: decoded.username,
        email: decoded.email
      };
    } else {
      return {
        username: "",
        email: ""
      };
    }
  },
  // Skickar tillbaka till inloggnings-sidan om token inte finns
  beforeCreate() {
    const token = localStorage.usertoken;
    if (!token) {
      router.push({ name: "Login" });
    } 
  }
};
</script>

<style scoped>
 
</style>
