
<template>
  <div class="container">
    <h2>Mina uppgifter</h2>
    <p>Användarnamn: {{username}}</p>
    <p>E-postadress: {{email}}</p>

    <!-- Uppdateringsformuläret (döljs som standard) -->
    <form id="update-form">
      <h2>Uppdatera bok</h2>
      <label for="update-id">ID</label>
      <br />
      <input type="text" id="update-id" v-model="uid" disabled />
      <br />
      <label for="update-title">Titel</label>
      <br />
      <input type="text" id="update-title" v-model="utitle" required />
      <br />
      <label for="update-author">Författare</label>
      <br />
      <input type="text" id="update-author" v-model="uauthor" required />
      <br />
      <label for="update-published">Publiceringsår</label>
      <br />
      <input
        type="text"
        id="update-published"
        v-model="upublished"
        placeholder="Publiceringsår"
        required
      />
      <br />
      <label for="update-pages">Antal sidor</label>
      <br />
      <input type="text" id="update-pages" v-model="upages" placeholder="Antal sidor" required />
      <br />
      <button v-on:click="updateBook">Uppdatera bok</button>
    </form>

    <!-- Användarens inlägg -->
    <div class="user-books">
      <h2>Mina publicerade inlägg</h2>
      <p class="error" v-if="uerror">{{uerror}}</p>
      <div class="books-container">
        <div
          class="book"
          v-for="(ubook, uindex) in ubooks"
          v-bind:item="ubook"
          v-bind:index="uindex"
          v-bind:key="ubook._id"
        >
          <p class="title">Titel: {{ubook.title}}</p>
          <p class="author">Författare: {{ubook.author}}</p>
          <p class="published">Publiceringsår: {{ubook.published}}</p>
          <p class="pages">Antal sidor: {{ubook.pages}}</p>
          <p class="user">Tillagd av: {{ubook.user}}</p>
          <p class="user">ID {{ubook._id}}</p>
          <button class="delete-button" v-on:click="deleteBook(ubook._id)">Radera</button>
          <button
            class="update-button"
            v-on:click="showUpdateBox(ubook._id, ubook.title, ubook.author, ubook.published, ubook.pages)"
          >Uppdatera</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// För avkryptering
import jwtDecode from "jwt-decode";
// FÖr omdirigering
import router from "../router";
// Tillåter åtkomst till bok-klassen
import BookService from "../BookService";
export default {
  data() {
    // Läser in token från localstorage
    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwtDecode(token);
      return {
        username: decoded.username,
        email: decoded.email,
        ubooks: [],
        uid: "",
        uerror: "",
        utitle: "",
        uauthor: "",
        upublished: "",
        upages: ""
      };
    } else {
      return {
        username: "",
        email: "",
        ubooks: [],
        uid: "",
        uerror: "",
        utitle: "",
        uauthor: "",
        upublished: "",
        upages: ""
      };
    }
  },
  async created() {
    try {
      // Hämtar användarens böcker
      this.ubooks = await BookService.getBooksByUser(this.username);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    // Ta bort bok
    async deleteBook(id) {
      await BookService.deleteBook(id);
      this.ubooks = await BookService.getBooksByUser();
      location.reload();
    },
    // Visar updateringsformuläret som är dolt som standard
    async showUpdateBox(id, title, author, published, pages) {
      document.getElementById("update-form").style.display = "block";
      document.getElementById("update-id").value = id;
      document.getElementById("update-title").value = title;
      document.getElementById("update-author").value = author;
      document.getElementById("update-published").value = published;
      document.getElementById("update-pages").value = pages;

      // Förhindrar att fälten töms vid manipulering
      this.uid = id;
      this.utitle = title;
      this.uauthor = author;
      this.upublished = published;
      this.upages = pages;
    },
    // Uppdatera bok
    async updateBook() {
      await BookService.updateBook(
        this.uid,
        this.utitle,
        this.uauthor,
        this.upublished,
        this.upages
      );
      // Dölj uppdateringsformuläret
      document.getElementById("update-form").style.display = "none";
      // Hämta böckerna igen
      this.ubooks = await BookService.getBooksByUser();
      location.reload();
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

<style scoped>
.container {
  padding: 2.5%;
}
.container h1 {
  text-align: center;
}
.book {
  background-color: aquamarine;
  width: 50%;
  margin: 1% 22.5%;
  padding: 2.5%;
  border-radius: 10px;
}
.delete-button {
  border: none;
  border-radius: 5px;
  width: 25%;
  margin: 2.5% 37.5%;
  padding: 5px;
  background-color: rgb(242, 91, 91);
  color: white;
}
.delete-button:hover {
  cursor: pointer;
  background-color: rgb(218, 65, 65);
}
.update-button {
  border: none;
  border-radius: 5px;
  width: 25%;
  margin: 2.5% 37.5%;
  padding: 5px;
  background-color: rgb(192, 199, 50);
  color: white;
}
.update-button:hover {
  cursor: pointer;
  background-color: rgb(190, 198, 30);
}

.error {
  background-color: rgb(242, 91, 91);
  padding: 20px;
  color: white;
}
#update-form {
  display: none;
  position: fixed;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  padding: 50px;
  width: 100vh;
  top: 50px;
  z-index: 9999;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  display: none;
}
</style>
