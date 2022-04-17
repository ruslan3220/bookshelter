    let elWrapper = document.querySelector(".wrapper")
    let elBody = document.querySelector("#body")
    let elModalWrapper = document.querySelector("#wrapper_modal");
    let elFrom = document.querySelector("#form")
    let elInput = document.querySelector("#search_input")
    let elReadLink = document.querySelector("#read_link")
    let elMoreBtn = document.querySelector("#more_btn")
    let elNewBook = document.querySelector(".new_books")
    let elStarBtn = document.querySelector(".star_btn")
    let elCount = document.querySelector("#count-books")
    let elTemplate = document.querySelector("#template").content;
    let elModalTemplate = document.querySelector("#templateModal").content;



    elStarBtn.addEventListener("click", (evt) => {
        evt.preventDefault()
        elBody.classList.toggle("dark_body")
    })

    function renderBooks(booksArray, wrapper) {

        let elFragment = document.createDocumentFragment()
    booksArray.items.forEach(item => {

      let newTemplate = elTemplate.cloneNode(true)
      let imageLink = `http://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`
      newTemplate.querySelector(".card-img-top").src = imageLink
      newTemplate.querySelector(".card-title").textContent = item.volumeInfo.title
      newTemplate.querySelector(".card-author").textContent = item.volumeInfo.authors
      newTemplate.querySelector(".card-year").textContent = item .volumeInfo.publishedDate
      newTemplate.querySelector(".bookmark-btn").dataset.bookId = item.id
      newTemplate.querySelector(".card-link").href = `http://books.google.co.uz/books?id=${item.id}&pg=PA700&dq=phyton&hl=&cd=3&source=gbs_api`
      elFragment.appendChild(newTemplate)
    });
    wrapper.appendChild(elFragment)
    elCount.textContent = booksArray.items.length
}

(async function () {
    let responce = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=javascript`
        );
        let data = await responce.json();
        renderBooks(data, elWrapper)
    })();

    // MORE INFO

    function renderModal(modalArray, modalWrapper) {
        let elFragmentModal = document.createDocumentFragment() // O'rab turuvchi
        modalArray.items.forEach(item => {
            let newTemplate = elModalTemplate.cloneNode(true) // Ko'piya qilish uchun
            let imageLink = `http://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`
            newTemplate.querySelector(".card-img-top").src = imageLink
            newTemplate.querySelector(".card-description").textContent = item.volumeInfo.description
            newTemplate.querySelector(".card-author").textContent = item.volumeInfo.authors
            newTemplate.querySelector(".card-year").textContent = item .volumeInfo.publishedDate
            newTemplate.querySelector(".card-type").textContent = item .volumeInfo.printType
            newTemplate.querySelector(".card-categories").textContent = item .volumeInfo.categories
            newTemplate.querySelector(".card-cound").textContent = item .volumeInfo.pageCount
            newTemplate.querySelector(".card-link").href = `http://books.google.co.uz/books?id=${item.id}&pg=PA700&dq=phyton&hl=&cd=3&source=gbs_api`
            elFragmentModal.appendChild(newTemplate)
             });
           modalWrapper.appendChild(elFragmentModal)
           console.log(modalWrapper);
}
;(async function () {
    let responce = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=javascript`
        );
        let data = await responce.json();
        renderModal(data, elModalWrapper)
    })();


    elNewBook.addEventListener("submit", () =>{
        (async function () {
            let responce = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=javascript&orderBy=newest`
                );
                let data = await responce.json();
                renderBooks(data, elWrapper)
            })();
    })

    // bookmark
    let bookmarkedList = []
    elWrapper.addEventListener("click", (evt) =>{
        let booksId = evt.target.dataset.bookId
        bookmarkedList
        let foundBook = renderModal.filter(function (item) {
            return item.id == booksId
        })
    })