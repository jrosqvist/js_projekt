<template>
  <div class="container">
    <form v-on:submit.prevent="register">
      <h1>Register</h1>
      <label for="username">Användarnamn</label>
      <input type="text" v-model="username" name="username" placeholder="Användarnamn" />
      <label for="email">E-postadress</label>
      <input
        type="email"
        v-model="email"
        name="email"
        placeholder="Ange din e-postadress"
      />
      <label for="password">Lösenord</label>
      <input
        type="password"
        v-model="password"
        name="password"
        placeholder="Ange lösenord"
      />
      <button type="submit">Registrera</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
    register() {
      axios
        .post("users/register", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(res => {
          router.push({ name: "Login" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>