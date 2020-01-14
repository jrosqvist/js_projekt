<template>
  <div class="container">
    <h1>Böcker</h1>
    <p class="error" v-if="error">{{error}}</p>

    <form>
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
      <input type="text" id="published" v-model="published" placeholder="Publiceringsår" required />
      <br />
      <label for="add-book">Antal sidor</label>
      <br />
      <input type="text" id="pages" v-model="pages" placeholder="Antal sidor" required />
      <br />
      <button v-on:click="addBook">Lägg till bok</button>
    </form>

    <form id="update-form">
      <h2>Uppdatera bok</h2>
      <label for="update-id">ID</label>
      <br />
      <input type="text" id="update-id" v-model="id" />
      <br />
      <label for="update-title">Titel</label>
      <br />
      <input type="text" id="update-title" v-model="title" required />
      <br />
      <label for="update-author">Författare</label>
      <br />
      <input type="text" id="update-author" v-model="author" required />
      <br />
      <label for="update-published">Publiceringsår</label>
      <br />
      <input
        type="text"
        id="update-published"
        v-model="published"
        placeholder="Publiceringsår"
        required
      />
      <br />
      <label for="update-pages">Antal sidor</label>
      <br />
      <input type="text" id="update-pages" v-model="pages" placeholder="Antal sidor" required />
      <br />
      <button v-on:click="updateBook">Uppdatera bok</button>
    </form>

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
        <button class="delete-button" v-on:click="deleteBook(book._id)">Radera</button>
        <button
          class="update-button"
          v-on:click="showUpdateBox(book._id, book.title, book.author, book.published, book.pages)"
        >Uppdatera</button>
      </div>
    </div>
  </div>
</template>

<script>
import BookService from "../BookService";

export default {
  name: "Posts",
  data() {
    return {
      books: [],
      id: "",
      error: "",
      title: "",
      author: "",
      published: "",
      pages: ""
    };
  },
  async created() {
    try {
      this.books = await BookService.getBooks();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async addBook() {
      await BookService.addBook(
        this.title,
        this.author,
        this.published,
        this.pages
      );
      this.books = await BookService.getBooks();
      location.reload();
    },
    async deleteBook(id) {
      await BookService.deleteBook(id);
      this.books = await BookService.getBooks();
    },
    async showUpdateBox(id, title, author, published, pages) {
      document.getElementById("update-form").style.display = "block";
      document.getElementById("update-id").value = id;
      document.getElementById("update-title").value = title;
      document.getElementById("update-author").value = author;
      document.getElementById("update-published").value = published;
      document.getElementById("update-pages").value = pages;

      this.id = id;
      this.title = title;
      this.author = author;
      this.published = published;
      this.pages = pages;

      // Tömmer formuläret
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("published").value = "";
      document.getElementById("pages").value = "";
    },

    async updateBook() {
      location.reload();
      await BookService.updateBook(
        this.id,
        this.title,
        this.author,
        this.published,
        this.pages
      );
      document.getElementById("update-form").style.display = "none";
      this.books = await BookService.getBooks();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  background-color: darkgray;
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