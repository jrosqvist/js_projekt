<template>
  <div id="app">
    <navbar></navbar>
    <div id="content">
      <router-view></router-view>
    </div>
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
* {
  margin: 0;
  padding: 0;
  font-family: "Acme", sans-serif;
}
#content {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 2.5%;
}
form {
  background-color: rgb(197, 181, 245);
  width:50%;
  margin:0 22.5%;
  padding: 2.5%;
  border-radius: 10px;
}
form h2 {
  text-align: center;
}
form input {
  border: none;
  border-radius: 5px;
  margin: 1% 5%;
  padding: 1.25% 2.5%;
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
  padding: 20px;
  background-color: black;
  color: white;
}
form button:hover {
  cursor: pointer;
  background-color: darkgray;
}
</style>
