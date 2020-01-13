<template>
  <div class="container">
    <form v-on:submit.prevent="login">
      <h1>Logga in här</h1>
      <label for="email">E-postadress</label>
      <input type="email" v-model="email" name="email" placeholder="Ange din e-postadress" />
      <label for="password">Lösenord</label>
      <input type="password" v-model="password" name="password" placeholder="Ange lösenord" />
      <button type="submit">Logga in</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import Events from "./Events";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("users/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("usertoken", res.data);
          // Tömmer formuläret
          this.email = "";
          this.password = "";
          if (res.status != 404) {
            router.push({ name: "Profile" });
            this.emitMethod();
            location.reload();
          } else {
            alert("Felaktiga inloggningsuppgifter")
          }
        })
        .catch(err => {
          console.log(err);
           alert("Felaktiga inloggningsuppgifter")
        });
    },
    emitMethod() {
      Events.$emit("logged-in", "loggedin");
    }
  }
};
</script>