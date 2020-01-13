
<template>
  <div class="container">
    <h1 class="text-center">Profil</h1>
    <table>
      <tbody>
        <tr>
          <td>Användarnamn</td>
          <td>{{username}}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{email}}</td>
        </tr>
      </tbody>
    </table>
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
      console.log(token);
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
