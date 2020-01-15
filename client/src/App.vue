<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar: Navbar
  }
};
</script>

<style>
/* Hela sidan */
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: black;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Baloo Bhai", cursive;
}
p,
a,
label {
  font-family: "Mukta", sans-serif;
}
.wrapper {
  width: 100%;
}
.container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 2.5%;
  background-color: rgb(245, 245, 245);
  min-height: 100vh;
}
/* Formulär */
form {
  background-color: rgb(237, 237, 237);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 50%;
  margin: 0 22.5%;
  padding: 2.5%;
  border-radius: 10px;
}
form h2 {
  text-align: center;
  margin-bottom: 20px;
}
form input {
  border: none;
  border-radius: 5px;
  margin: 1% 5%;
  padding: 2.5%;
  display: block;
  width: 85%;
}
form label {
  margin-left: 5%;
}
form button {
  border: none;
  border-radius: 5px;
  width: 25%;
  margin: 2.5% 37.5%;
  padding: 10px;
  background-color: rgb(2, 189, 92);
  color: white;
  font-family: "Baloo Bhai", cursive;
}
form button:hover {
  cursor: pointer;
  background-color: rgb(1, 184, 89);
}

/* Media queries */
@media (max-width: 800px) {
  form {
    width: 75%;
    margin: 0 10%;
    padding: 2.5%;
  }
}

@media (max-width: 550px) {
  form {
    width: 85%;
    margin: 0 5%;
    padding: 2.5%;
  }
}
</style>
