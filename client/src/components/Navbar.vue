<template>
  <nav class="navbar">
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
        <router-link to="/posts">Poster</router-link>
      </li>
      <li v-if="log==true">
        <router-link to="/profile">Profil</router-link>
      </li>
      <li v-if="log==true">
        <a href v-on:click="logout">Logga ut</a>
      </li>
      <li v-if="log==true">
        <router-link to="/">Test</router-link>
      </li>
    </ul>
  </nav>
</template>



<script>
import Events from "./Events";

Events.$on("logged-in", test => {
  console.log(test);
});
export default {
  data() {
    return {
      auth: "",
      user: ""
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("usertoken");
      this.out = "loggedout";
    },
    emitMethod() {
      Events.$emit("logged-in", "loggedin");
    }
  },
  mounted() {
    Events.$on("logged-in", status => {
      this.auth = status;
    });
  },
  beforeCreate() {
    const token = localStorage.usertoken;
    if (!token) {
      this.log = false;
    } else {
      this.log = true;
    }
  }
};
</script>



<style scoped>
</style>