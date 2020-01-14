import axios from "axios";

const url = "/api/books/";

class BookService {
    // Klassmetoder
    // Hämta böcker
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

    // Skapa 
    static addBook(title, author, published, pages) {
        return axios.post(url, {
            title,
            author,
            published,
            pages
        });
    }
    // Radera
    static deleteBook(id) {
        return axios.delete(`${url}${id}`);
    }

    // Uppdatera
    static updateBook(id, title, author, published, pages) {
        return axios.put(`${url}${id}`, {
            title,
            author,
            published,
            pages
        });
    }
}


export default BookService;