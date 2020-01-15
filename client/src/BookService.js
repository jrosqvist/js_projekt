// Axios används för att kommunicera med webbtjänsten
import axios from "axios";
const url = "/api/books/";

// Klass med statiska metoder som hanterar böckerna
class BookService {

    // Hämta alla böcker
    static getBooks() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    // Loopar igenom datat
                    data.map(book => ({
                        // Spread
                        ...book
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    // Hämtar böcker från specifik användare
    static getBooksByUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}user/?name=` + user);
                const data = res.data;
                resolve(
                    // Loopar igenom datat
                    data.map(ubook => ({
                        // Spread
                        ...ubook
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    // Lägg till bok
    static addBook(title, author, published, pages, user) {
        return axios.post(url, {
            title,
            author,
            published,
            pages,
            user
        });
    }
    // Radera bok med id:t
    static deleteBook(id) {
        return axios.delete(`${url}${id}`);
    }

    // Uppdatera bok
    static updateBook(id, title, author, published, pages) {
        return axios.put(`${url}${id}`, {
            title,
            author,
            published,
            pages
        });
    }
}

// Exportera
export default BookService;