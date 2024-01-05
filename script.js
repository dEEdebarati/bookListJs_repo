let form = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI{
    // constructor() {
        
    // }
    static addToBookList(book){
        //console.log(book);
        let list = document.querySelector("#book-list");
        let row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
         <td><a href = "#">X</a></td>`;
        //console.log(row);
        //Now the most interesting part comes in....how to publish?
        //appendChild(varName);
        list.appendChild(row);
         
    }
    
       
       static showAlert(message,className){
            let div = document.createElement("div");
            div.className = `alert ${className}`;//built in class of skeletonCSS
            div.appendChild(document.createTextNode(message));
            let container = document.querySelector(".container");
            let form = document.querySelector("#book-form");
            container.insertBefore(div,form);

            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 4000);
        }

        static deleteFromBook(target){
            //console.log(target);
            if(target.hasAttribute('href')){
                target.parentElement.parentElement.remove();
                Store.removeBooks(target.parentElement.previousElementSibling.textContent.trim());
                 UI.showAlert("Book removed","success");

            }
        }
        
        static clearFields(){
            document.querySelector("#title").value = " ";
            document.querySelector("#author").value = " ";
            document.querySelector("#isbn").value = " ";
        }
      
    
    
}
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(book=>{
            UI.addToBookList(book);
        });
    }
    static removeBooks(isbn){
        let books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn ===isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}
form.addEventListener('submit',newBook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());
function newBook(e){
    //console.log("Hello");
    let title= document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
    // let ui = new UI();
    if (title.trim() === "" || author.trim() === "" || isbn.trim() === "") {
        UI.showAlert("Please fill all the fields!", "error");
    } //culprit's been found just use "" not " " 
    else{
        let book = new Book(title,author,isbn);
    //console.log(Book);
    //let book = new Book(title,author,isbn);
    //let ui = new UI();
    UI.addToBookList(book);
    UI.clearFields();
        UI.showAlert("Book has been added","success");
        Store.addBook(book);
   
    }
    e.preventDefault();
}

function removeBook(e){
    // let ui = new UI();
    UI.deleteFromBook(e.target);
    e.preventDefault();
}