<template>
  <div class="container">
    <!-- Registreringsformuläret -->
    <form v-on:submit.prevent="register">
      <h2>Registrera</h2>
      <label for="username">Användarnamn</label>
      <br />
      <input type="text" v-model="username" name="username" placeholder="Användarnamn" />
      <br />
      <label for="email">E-postadress</label>
      <br />
      <input type="email" v-model="email" name="email" placeholder="Ange din e-postadress" />
      <br />
      <label for="password">Lösenord</label>
      <br />
      <input type="password" v-model="password" name="password" placeholder="Ange lösenord" />
      <button type="submit">Registrera</button>
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
      password: ""
    };
  },
  methods: {
    // Registrera anvöndare
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

</style>