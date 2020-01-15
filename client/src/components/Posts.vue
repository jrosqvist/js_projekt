<template>
  <div class="wrapper">
    <div class="container">
      <h1>Böcker</h1>
      <p class="error" v-if="error">{{error}}</p>

      <!-- Lägg till-formuläret -->
      <form id="add-form">
        <h2>Lägg till bok</h2>
        <label for="title">Titel</label>
        <br />
        <input type="text" id="title" v-model="title" placeholder="Titel" required />
        <br />
        <label for="author">Författare</label>
        <br />
        <input type="text" id="author" v-model="author" placeholder="Författare" required />
        <br />
        <label for="published">Publiceringsår</label>
        <br />
        <input
          type="number"
          id="published"
          v-model="published"
          placeholder="Publiceringsår"
          required
        />
        <br />
        <label for="add-book">Antal sidor</label>
        <br />
        <input type="number" id="pages" v-model="pages" placeholder="Antal sidor" />
        <br />
        <button
          class="add-button"
          id="add"
          v-on:click="addBook(); showAddedDiv();"
          :disabled="!title.trim() || !author.trim() || !published.trim() || !pages.trim() "
        >Lägg till bok</button>
      </form>

      <!-- Listning av böcker -->
      <div class="books-container">
        <div
          class="book"
          v-for="(book, index) in books"
          v-bind:item="book"
          v-bind:index="index"
          v-bind:key="book._id"
        >
          <p class="title">Titel: {{book.title}}</p>
          <p class="author">Författare: {{book.author}}</p>
          <p class="published">Publiceringsår: {{book.published}}</p>
          <p class="pages">Antal sidor: {{book.pages}}</p>
          <p class="user">Tillagd av: {{book.user}}</p>
        </div>
      </div>
    </div>
    <div id="added-div">
      <p>Bok tillagd!</p>
    </div>
  </div>
</template>

<script>
// Tillgång till bok-klassen
import BookService from "../BookService";
// För omdirigering
import router from "../router";
// För avkryptering
import jwtDecode from "jwt-decode";

export default {
  name: "Posts",
  data() {
    // Läser in token från localstorage
    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwtDecode(token);
      return {
        username: decoded.username,
        books: [],
        id: "",
        error: "",
        title: "",
        author: "",
        published: "",
        pages: ""
      };
    } else {
      return {
        username: "",
        books: [],
        id: "",
        error: "",
        title: "",
        author: "",
        published: "",
        pages: ""
      };
    }
  },
  // Hämtar böckerna vid sidinladdning
  async created() {
    try {
      this.books = await BookService.getBooks();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    // Lägg till bok
    async addBook() {
      await BookService.addBook(
        this.title,
        this.author,
        this.published,
        this.pages,
        this.username
      );
      // Ladda om böckerna
      this.books = await BookService.getBooks();
      location.reload();
    },
    showAddedDiv() {
      let animationEvent =
        "webkitAnimationEnd oanimationend msAnimationEnd animationend";
      // Lägger till on-klassen
      $("#added-div").addClass("on");
      // Tar bort klassen efter animationseventet är slut
      $("#added-div").one(animationEvent, function(event) {
        $("#added-div").removeClass("on");
      });
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
#add-form {
  margin-bottom: 50px;
}
button:disabled {
 background-color: rgb(160, 160, 160);
  cursor: default;
}
.book {
  background-color: rgb(1, 153, 208);
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 50%;
  margin: 1% 22.5%;
  padding: 2.5%;
  border-radius: 10px;
}
.book:nth-child(even) {
  background-color: rgb(237, 237, 237);
  color: black;
}

.error {
  background-color: rgb(242, 91, 91);
  padding: 15px;
  color: white;
  border-radius: 5px;
  margin: 1% 0;
  text-align:center;
  font-family: "Baloo Bhai", cursive;
}

#added-div {
  height: 50px;
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  opacity: 0;
  background-color: rgb(2, 189, 92);
  margin: 0;
}
#added-div p {
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  font-size: 120%;
  color: white;
  font-family: "Baloo Bhai", cursive;
}
.on {
  animation-name: popUp;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes popUp {
  0% {
    bottom: -50px;
    opacity: 1;
  }
  10% {
    bottom: -25px;
    opacity: 1;
  }
  20% {
    bottom: 0px;
    opacity: 1;
  }
  79% {
    bottom: 0px;
    opacity: 1;
  }
  90% {
    bottom: -25px;
    opacity: 1;
  }
  99% {
    bottom: -50px;
    opacity: 1;
  }
  100% {
    bottom: -50px;
    opacity: 0;
  }
}
</style>