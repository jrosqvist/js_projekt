
<template>
  <div class="wrapper">
    <div class="container">
      <div class="user-information">
        <h2>Mina uppgifter</h2>
        <p>Användarnamn: {{username}}</p>
        <p>E-postadress: {{email}}</p>
      </div>

      <!-- Uppdateringsformuläret (döljs som standard) -->
      <form id="update-form">
        <div class="cross" v-on:click="closeUpdateForm">x</div>
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
          type="number"
          id="update-published"
          v-model="upublished"
          placeholder="Publiceringsår"
          required
        />
        <br />
        <label for="update-pages">Antal sidor</label>
        <br />
        <input type="number" id="update-pages" v-model="upages" placeholder="Antal sidor" required />
        <br />
        <button
          v-on:click="updateBook(); showUpdatedDiv();"
          :disabled="!utitle.trim() || !uauthor.trim() || !upublished.trim() || !upages.trim()"
        >Uppdatera bok</button>
      </form>

      <!-- Användarens inlägg -->
      <div class="user-books">
        <h2>Mina publicerade böcker</h2>
        <p class="message" v-if="uerror">{{uerror}}</p>
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
            <button
              class="delete-button"
              v-on:click="deleteBook(ubook._id); showDeletedDiv();"
            >Radera</button>
            <button
              class="update-button"
              v-on:click="showUpdateBox(ubook._id, ubook.title, ubook.author, ubook.published, ubook.pages)"
            >Uppdatera</button>
          </div>
        </div>
      </div>
    </div>
    <div id="updated-div">
      <p>Bok uppdaterad!</p>
    </div>
    <div id="deleted-div">
      <p>Bok raderad!</p>
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
      if (this.ubooks.length == 0) {
        this.uerror = "Du har inga publicerade böcker";
      }
    } catch (err) {
      console.log(err);
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
    },
    closeUpdateForm() {
      document.getElementById("update-form").style.display = "none";
    },
    showUpdatedDiv() {
      let animationEvent =
        "webkitAnimationEnd oanimationend msAnimationEnd animationend";
      // Lägger till on-klassen
      $("#updated-div").addClass("on");
      // Tar bort klassen efter animationseventet är slut
      $("#updated-div").one(animationEvent, function(event) {
        $("#updated-div").removeClass("on");
      });
    },
    showDeletedDiv() {
      let animationEvent =
        "webkitAnimationEnd oanimationend msAnimationEnd animationend";
      // Lägger till on-klassen
      $("#deleted-div").addClass("on");
      // Tar bort klassen efter animationseventet är slut
      $("#deleted-div").one(animationEvent, function(event) {
        $("#deleted-div").removeClass("on");
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
.user-information {
  background-color: rgb(109, 109, 109);
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 50%;
  margin: 1% 22.5%;
  padding: 2.5%;
  border-radius: 10px;
}
.user-books h2 {
  text-align: center;
  margin-top: 50px;
}
.book {
  background-color: rgb(237, 237, 237);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 50%;
  margin: 1% 22.5%;
  padding: 2.5%;
  border-radius: 10px;
}
.delete-button {
  border: none;
  border-radius: 5px;
  width: 25%;
  margin: 2.5% 72.5% 2.5% 2.5%;
  padding: 5px;
  background-color: rgb(228, 73, 73);
  color: white;
  font-family: "Baloo Bhai", cursive;
}
.delete-button:hover {
  cursor: pointer;
  background-color: rgb(206, 39, 39);
}
.update-button {
  border: none;
  border-radius: 5px;
  width: 25%;
  margin: 2.5% 72.5% 2.5% 2.5%;
  padding: 5px;
  background-color: rgb(1, 153, 208);
  color: white;
  font-family: "Baloo Bhai", cursive;
}
.update-button:hover {
  cursor: pointer;
  background-color: rgb(12, 92, 211);
}

.message {
  background-color: rgb(1, 153, 208);
  padding: 15px;
  color: white;
  border-radius: 5px;
  margin: 1% 0;
  text-align: center;
  font-family: "Baloo Bhai", cursive;
}
#update-form {
  display: none;
  position: fixed;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 10px;
  padding: 50px;
  width: 75vh;
  height: 75vh;
  top: 50px;
  z-index: 9999;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  display: none;
}
.cross {
  position: absolute;
  top: 10px;
  right: 20px;
  color: rgb(228, 73, 73);
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.cross:hover {
  cursor: pointer;
  color: rgb(242, 91, 91);
}
#update-form input {
  padding: 1.5%;
}
#update-form h2 {
  margin: 0;
  padding: 0;
}
button:disabled {
  background-color: rgb(160, 160, 160);
  cursor: default;
}
#updated-div,
#deleted-div {
  height: 50px;
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  opacity: 0;
  margin: 0;
}
#updated-div p,
#deleted-div p {
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  font-size: 120%;
  color: white;
  font-family: "Baloo Bhai", cursive;
}
#updated-div {
  background-color: rgb(1, 153, 208);
}
#deleted-div {
  background-color: rgb(228, 73, 73);
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

/* Media queries */
@media (max-width: 800px) {
  .user-information {
    width: 75%;
    margin: 2.5% 10%;
    padding: 2.5%;
  }
  .book {
    width: 75%;
    margin: 2.5% 10%;
    padding: 2.5%;
  }
  #update-form {
    padding: 25px;
    width: 75vh;
    height: 75vh;
  }
}

@media (max-width: 550px) {
  .user-information {
    width: 90%;
    margin: 2.5%;
    padding: 2.5%;
  }
  .book {
    width: 90%;
    margin: 2.5%;
    padding: 2.5%;
  }
  #update-form {
    padding: 15px;
    width: 65vh;
    height: 75vh;
  }
}
</style>
