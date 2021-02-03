//Book constructor
function Book (title,author,isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn
}

//UI constructor
function UI () {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  //create tr element
  const row = document.createElement('tr');
  //Insert cols
  row.innerHTML = 
  `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

  list.appendChild(row);

}

//Show alert
UI.prototype.showAlert = function (message, classname) {
  //create div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${classname}`;
  //add text 
  div.appendChild(document.createTextNode(message));
  //div.innerHTML = `${message}`; works same
  console.log(div);
  //get parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  //insert alert
  container.insertBefore(div, form);
  //Set timeout
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}
//Delete Book
UI.prototype.deleteBook = function (target){
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Event Listners for add book
document.getElementById('book-form').addEventListener('submit', 
function(e) {
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,        
        isbn = document.getElementById('isbn').value;
  
  //Instantiate book 
  const book = new Book(title,author,isbn); 
  
  //Instantiate UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === ''){
    //Error alert 
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list 
    ui.addBookToList(book);

    //show success
    ui.showAlert('Book Added!','success');

    //Clear fields
    ui.clearFields();
  }


  e.preventDefault();
});

//Event listener for delete
document.getElementById('book-list').addEventListener('click',
function(e) {
  //Instantiate UI
  const ui = new UI();

  if(e.target.className === 'delete') {
     //Delete Book
    ui.deleteBook(e.target);
    //show mwssage
    ui.showAlert('Book Removed!','success');
  } 
 
  e.preventDefault();
});