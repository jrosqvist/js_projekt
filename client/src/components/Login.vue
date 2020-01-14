<template>
  <div class="container">
       <!-- Inloggningsformuläret -->
    <form v-on:submit.prevent="login">
      <h2>Logga in här</h2>
      <label for="email">E-postadress</label>
      <br />
      <input type="email" v-model="email" name="email" placeholder="Ange din e-postadress" />
      <br />
      <label for="password">Lösenord</label>
      <br />
      <input type="password" v-model="password" name="password" placeholder="Ange lösenord" />
      <br />
      <button type="submit">Logga in</button>
    </form>
  </div>
</template>

<script>
// Axios för anslutning mot webbtjänsten
import axios from "axios";
// Router för omdirigering
import router from "../router";
//import Events from "./Events";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    // Logga in
    login() {
      axios
        .post("users/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          // Skapa en token med returnerad data
          localStorage.setItem("usertoken", res.data);
          // Tömmer formuläret
          this.email = "";
          this.password = "";
          // Loggar in och skickar till mina sidor-sidan
          if (res.status != 404) {
            router.push({ name: "Profile" });
            //this.emitMethod();
            location.reload();
          } else {
            alert("Felaktiga inloggningsuppgifter");
          }
        })
        .catch(err => {
          console.log(err);
          alert("Felaktiga inloggningsuppgifter");
        });
    },
    /*
    emitMethod() {
      Events.$emit("logged-in", "loggedin");
    }
    */
  }
};
</script>

<style scoped>

</style>