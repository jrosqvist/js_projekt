<template>
  <div class="container">
    <!-- Inloggningsformuläret -->
    <form id="login-form" v-on:submit.prevent="login">
      <h2>Logga in här</h2>
      <p class="loginError" v-if="loginError">{{loginError}}</p>
      <label for="email">E-postadress</label>
      <br />
      <input type="email" v-model="email" name="email" placeholder="Ange din e-postadress" required />
      <br />
      <label for="password">Lösenord</label>
      <br />
      <input
        type="password"
        v-model="password"
        name="password"
        placeholder="Ange lösenord"
        required
      />
      <br />
      <button type="submit" :disabled="!email.trim().includes('@') || !password.trim()">Logga in</button>
    </form>
  </div>
</template>

<script>
// Axios för anslutning mot webbtjänsten
import axios from "axios";
// Router för omdirigering
import router from "../router";

export default {
  data() {
    return {
      email: "",
      password: "",
      loginError: ""
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
            location.reload();
          }
        })
        .catch(err => {
          this.loginError = "Felaktiga inloggningsuppgifter!";
        });
    }
  }
};
</script>

<style scoped>
/* Felmeddelande */
.loginError {
  background-color: rgb(242, 91, 91);
  padding: 15px;
  color: white;
  border-radius: 5px;
  margin: 1% 0;
  text-align: center;
  font-family: "Baloo Bhai", cursive;
}
/* Dold knapp */
button:disabled {
  background-color: rgb(160, 160, 160);
  cursor: default;
}
#login-form {
    position: relative;
    top: 100px;
    z-index: 99;
  }
  
#login-form {
    top: -500px;
    animation: drop 1s ease forwards;
  }

  @keyframes drop {
    0% {
      opacity: 0;
      transform: rotate(30deg);
     /* border:5px solid rgb(2, 189, 92);*/
    }
    30% {
      transform: rotate(-30deg);
    }
    70% {
      transform: translateY(700px);
      /*border:2px solid rgb(2, 189, 92);*/
    }
    100% {
      transform: translateY(550px);
      border:none;
      opacity: 1;
    }
  }
</style>