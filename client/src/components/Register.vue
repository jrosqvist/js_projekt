<template>
  <div class="container">
    <!-- Registreringsformuläret -->
    <form v-on:submit.prevent="validatePassword">
      <h2>Registrera konto här</h2>
      <p class="registerError" v-if="registerError">{{registerError}}</p>
      <label for="username">Användarnamn</label>
      <br />
      <input type="text" v-model="username" name="username" placeholder="Användarnamn" required />
      <br />
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
      <label for="passwordtwo">Upprepa lösenord</label>
      <br />
      <input
        type="password"
        v-model="passwordTwo"
        name="passwordTwo"
        placeholder="Upprepa lösenordet"
        required
      />
      <br />
      <button
        type="submit"
        :disabled="!email.trim().includes('@') || !username.trim() || !password.trim() || !passwordTwo.trim()"
      >Registrera</button>
    </form>
  </div>
</template>

<script>
// För åtkomst till webbtjänsten
import axios from "axios";
// För omdirigering
import router from "../router";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordTwo: "",
      registerError: ""
    };
  },
  methods: {
    // Kontrollerar att lösenorden stämmer överens
    validatePassword() {
      if (this.password !== this.passwordTwo) {
        this.registerError = "Lösenorden stämmer inte överens!";
      } else {
        this.register();
      }
    },
    // Registrerar användare
    register() {
      axios
        // Skicka med inmatad data
        .post("users/register", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(res => {
          // Skicka till logga in-sidan om det gick som de skulle
          router.push({ name: "Login" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
/* Dold knapp*/
button:disabled {
  background-color: rgb(160, 160, 160);
  cursor: default;
}
/* Felmeddelande som visas vid fel i registrering */
.registerError {
  background-color: rgb(242, 91, 91);
  padding: 15px;
  color: white;
  border-radius: 5px;
  margin: 1% 0;
  text-align: center;
  font-family: "Baloo Bhai", cursive;
}
</style>