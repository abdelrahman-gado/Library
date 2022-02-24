let myLibrary = [];  // array of books objects

const table = document.querySelector(".bkTable");

const formDiv = document.querySelector(".formDiv");
formDiv.style.display = "none";       // by default, the form of book info is hidden,
// when you click on Add book button, it will appear under the button


const bookTitleInp = document.querySelector("#title");
const bookAuthorInp = document.querySelector("#author");
const bookPagesInp = document.querySelector("#pages");
const bookReadInp = document.querySelector("#read");

const bookSubmitBtn = document.querySelector(".submitBtn");

const addBookButton = document.querySelector(".addBook");  
addBookButton.addEventListener("click", (e) => { // show the form, when you click on Add Book button
    formDiv.style.display = "";
});

// add the book obj as a row in the table
bookSubmitBtn.addEventListener("click", addBook);


function appendBookToTable(bookObj) {

    const tableBody = document.querySelector(".tbBody");
    const row = document.createElement("tr");  // create a empty row
    
    // add the data cells with bookObj info to the empty row
    for (let prop in bookObj) {
        const tdCell = document.createElement("td");
        tdCell.innerText = bookObj[prop];
        row.appendChild(tdCell);
    }

    // here, add to the empty row two data cell to add change read state button 
    // and delete book button
    const tdCell1 = document.createElement("td");
    const tdCell2 = document.createElement("td");

    // change read state button
    const readButton = document.createElement("button");
    readButton.className = "readBtn";  
    readButton.innerText = "Read";
    readButton.addEventListener("click", changeReadState);

    // delete book button
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", deleteBook);
    
    // appeand buttons to their td cells
    tdCell1.appendChild(readButton);
    tdCell2.appendChild(deleteButton);

    // append td cells to the row
    row.appendChild(tdCell1);
    row.appendChild(tdCell2);

    // assign a data-attribute to each row called data-index
    // which is index of the row in the table starting from 1 to the first book row
    row.dataset.index =  String(myLibrary.length);

    // appeand row to the table
    tableBody.appendChild(row);
}

function addBook(e) {

    let title = bookTitleInp.value;
    let author = bookAuthorInp.value;
    let pages = bookPagesInp.value;
    let read = bookReadInp.checked;

    // if any text or number input of the form is empty, show alert to user
    if (title.length === 0 || author.length === 0 || pages.length === 0) {
        alert("Please input the details of your book correctly");
        return;
    }

    const bookObj = new Book(
        title,
        author,
        pages,
        read
    );

    myLibrary.push(bookObj);

    appendBookToTable(bookObj);  // add bookObj to the table

    formDiv.style.display = "none"; // hide the form after click submit button
    
    // reset all inputs on the form to empty values
    bookAuthorInp.value = "";
    bookTitleInp.value = "";
    bookPagesInp.value = "";
    bookReadInp.checked = false;
}



// when clicking read button on row, change the state of read of that book
function changeReadState (e) {
    // get data-index of the row
    const index = e.target.parentElement.parentElement.dataset["index"];
    
    // invert the current state in the array myLibrary
    myLibrary[index-1]["read"] = !myLibrary[index-1]["read"];
    
    // change the text of that row on the table
    table.getElementsByTagName("tr")[parseInt(index)].getElementsByTagName("td")[3]
    .innerText = myLibrary[index-1]["read"]; 
    
}

// when clicking delete on a row, delete that row from myLibray array
// and delete that row from table
function deleteBook(e) {
    // get the data-index of the row you want to delete
    let deletedBookIndex = e.target.parentElement.parentElement.dataset["index"]; 
    table.deleteRow(deletedBookIndex);
    
    // delete bookObj from myLibrary array
    // data-index start with 1 for the first book row
    // deletedBookIndex-1 ==> to get the corresponding index of the book object in the
    // myLibrary array
    myLibrary.splice(deletedBookIndex-1, 1);
    
    // update all the data-index of the rows that after the deleted row.
    // the update include decrement the data-index of row by one.
    document.querySelectorAll("tr").forEach((row) => {
        if (parseInt(row.dataset.index) > deletedBookIndex) {
            row.dataset.index = String(parseInt(row.dataset.index) - 1);
        }
    })
}

// Constructor for Book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}