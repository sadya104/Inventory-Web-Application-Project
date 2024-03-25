
///Created Variables of everything I need to access
const trash = document.querySelectorAll('.book-card__trash');
const bookForm = document.querySelector('.form');
const myBookList = document.querySelector('.books-list');
const completeMessage = document.createElement('p');
const errorMessage = document.createElement('p');





/// loop through trash and delete the book card
trash.forEach(trashButton => {
    trashButton.addEventListener('click', (e)=> {
       e.target.parentElement.remove()
    })
})

/// add eventListener
bookForm.addEventListener('submit', (e) => {
    // prevent the form from always reloading 
    e.preventDefault();
// variable to access my form and it's components    
const formArray = e.target;

/// validate form to see alert message if form is complete or incomplete
 if(validateForm(formArray)){
    
/// create form arr to hold all components of th from 
    const [title, author, url, price, stock] = formArray

    const bookObj = {title: title.value, author: author.value, url: url.value, price: price.value, stock: stock.value};
    createBook(bookObj);
 }


    
 /// rest form after the submit button is clicked   
    bookForm.reset();
  
})


/// create book to put inside of book-card container
function createBook (bookObj){
    /// create each variable and give it classes to imitate what I have as my default book
    const bookCard = document.createElement('div');
    bookCard.setAttribute('class', 'book-card');

    const imgTag = document.createElement('img');
    // imgTag.setAttribute('src', bookObj.url);
    imgTag.setAttribute('class', 'book-card__img')

    const info = document.createElement('div')
    info.setAttribute('class','book-card__info')

    const newTitle = document.createElement('p');
    newTitle.setAttribute('class', 'book-card__title');
    const newAuthor = document.createElement('p');
    newAuthor.setAttribute('class', 'book-card__author');
 
    const checkStock = document.createElement('button');
    checkStock.setAttribute('class', 'book-card__stock');

    const newPrice = document.createElement('p');
    newPrice.setAttribute('class', 'book-card__price')

    const priceWithDollar = '$' + bookObj.price;

    const newTrash = document.createElement('i');
    newTrash.classList.add('fa-regular', 'fa-trash-can', 'book-card__trash');

    /// add text to value of our inputs 
    newTitle.innerText = bookObj.title
    newAuthor.innerText = bookObj.author
    imgTag.setAttribute('src', bookObj.url);
    newPrice.innerText = bookObj.price
    newPrice.innerText = priceWithDollar;
    checkStock.innerText = bookObj.stock
    checkStock.style.backgroundColor = bookObj.stock === 'In Stock' ? 'green' : 'red' 


//// add all variables to my booklist include it in the bookCard 
    info.append(newTitle, newAuthor, checkStock, newPrice)
    bookCard.append(imgTag, info, newTrash);
    myBookList.append(bookCard);
    console.log(bookCard);
/// create new trash for new bookCards 
    newTrash.addEventListener('click', (event) => {
        event.target.parentElement.remove();
    })

}
//// function to validate form and display error or completed message 
 
    function validateForm(form) {
        for (let i = 0; i < form.length - 1; i++) {
            if (form[i].value === '') {
                errorMessage.setAttribute('class', 'error');
                errorMessage.innerText = 'Missing information required';
                form.append(errorMessage);
                completeMessage.remove();
                return false;
            }
        }
    
        completeMessage.setAttribute('class', 'complete');
        completeMessage.innerText = 'Form is complete';
        form.append(completeMessage);
        errorMessage.remove();
    
        // Remove complete message after 3 seconds
        setTimeout(() => {
            completeMessage.remove();
        }, 3000);
    
        return true;
    }
    

// createBook();


