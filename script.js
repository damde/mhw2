var oldDescription;
function descriptionHandler(event) {
    if (oldDescription &&
        event.target.parentNode.querySelector("h5") != oldDescription)
        oldDescription.classList.add("hidden")
    const description = event.target.parentNode.querySelector("h5")
    if (description.classList.contains("hidden")) {
        description.classList.remove("hidden")
        oldDescription = description;
    } else {
        description.classList.add("hidden")
        oldDescription = null
    }
}

function addFavorite(event) {
    const card = event.currentTarget.parentNode
    const add = event.currentTarget.parentNode.querySelector("#add")
    add.removeEventListener("click", addFavorite)
    add.classList.remove("clickable")
    add.classList.add("notClickable")
    const newCard = document.createElement("div")
    newCard.classList.add("card")
    const imageDiv = document.createElement("div")
    imageDiv.classList.add("image")
    const image = document.createElement("img")
    image.src = card.querySelector("img").src
    imageDiv.appendChild(image)
    const remove = document.createElement("img")
    remove.classList.add("clickable")
    remove.id = "remove"
    remove.src = "./starDelete.png"
    remove.addEventListener("click", removeFavorite)
    const text = document.createElement("h3")
    text.classList.add("text");
    text.textContent = card.querySelector("h3").textContent
    newCard.appendChild(imageDiv)
    newCard.appendChild(remove)
    newCard.appendChild(text)
    const favorites = document.querySelector("#favorites")
    if (favorites.classList.contains("hidden"))
        favorites.classList.remove("hidden")
    favorites.querySelector(".verticalCards").appendChild(newCard)
}

function removeFavorite(event) {
    const name = event.currentTarget.parentNode.querySelector("h3").textContent
    for (let product of document.querySelector("#products").querySelectorAll(".card")) {
        if (product.querySelector("h3").textContent == name) {
            const add = product.querySelector("#add")
            add.addEventListener("click", addFavorite)
            add.classList.remove("notClickable")
            add.classList.add("clickable")
            break
        }
    }
    const favorites = document.querySelector("#favorites")
    favorites.querySelector(".verticalCards").removeChild(event.currentTarget.parentNode)
    if (!favorites.querySelector("card")) {
        favorites.classList.add("hidden")
    }
}


const products = document.querySelector("#products");

for (let content of contents) {
    const element = document.createElement("div")
    element.classList.add("card");
    const imageDiv = document.createElement("div")
    imageDiv.classList.add(["image"])
    const image = document.createElement("img")
    image.src = content.image
    imageDiv.appendChild(image)
    const add = document.createElement("img")
    add.classList.add("clickable")
    add.id = "add"
    add.src = "./starAdd.png"
    add.addEventListener("click", addFavorite)
    const text = document.createElement("h3")
    text.classList.add("text");
    text.textContent = content.title
    text.addEventListener("click", descriptionHandler)
    const description = document.createElement("h5")
    description.classList.add("hidden")
    description.textContent = content.subtitle
    element.appendChild(imageDiv)
    element.appendChild(add)
    element.appendChild(text)
    element.appendChild(description)
    products.appendChild(element)
}

function searchEvent(event) {
    for (let product of document.querySelector("#products").querySelectorAll(".card")) {
        if (product.querySelector("h3").textContent.
            toUpperCase().indexOf(event.target.value.toUpperCase()) < 0) {
            product.classList.add("hidden")
        } else {
            product.classList.remove("hidden")
        }
    }
}

const searchBox = document.querySelector("#search")
searchBox.addEventListener("keyup", searchEvent)