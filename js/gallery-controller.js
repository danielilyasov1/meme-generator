"use strict"
var elText = ""
var gColorSt = document.querySelector("[name=stroke-color]").value
var gColorSh = document.querySelector("[name=fill-color]").value

function init() {
  renderGallery()
  gCanvas = document.querySelector(".my-canvas")
  gCtx = gCanvas.getContext("2d")
  console.log(gCanvas)
  
}

function onActivePage(el) {
  const elLink = document.querySelector("a.active")
  elLink.classList.remove("active")
  el.classList.add("active")
}

function onClickScreen() {
  if (document.body.classList.contains("menu-open")) {
    toggleHamburger()
  }
  //   if (document.body.classList.contains("modal-open")) {
  //     toggleModal()
  //   }
}

function toggleHamburger() {
  document.body.classList.toggle("menu-open")
  const elBtn = document.querySelector(".hamburger-btn")
  elBtn.innerText = elBtn.innerText === "☰" ? "✖" : "☰"
}

///choose img
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()
  //After we read the file
  reader.onload = function (event) {
    var img = new Image() // Create a new html img element
    img.src = event.target.result // Set the img src to the img file we read
    //Run the callBack func , To render the img on the canvas
    img.onload = onImageReady.bind(null, img)
  }
  reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderImg(img) {
  //Draw the img on the canvas
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onSearchMemes(e) {
  e.preventDefault()
  const searchTxt = document.querySelector(".text-input").value
  setSearchFilter(searchTxt)
  renderGallery()
}

function renderGallery() {
  const imgs = getImg()

  const strHTMLs = imgs.map(
    (img) => `<article class="meme-gallery" onclick="onImgSelect(${img.id})">
              <img src="${img.url}"  alt="" />
            </article> `
  )

  document.querySelector(".gallery-container").innerHTML = strHTMLs.join("")
  
}

function onImgSelect(imgId){
  setImg(imgId)
  renderMeme()
  elImgGallery.style.display = 'none'
    elEditor.style.display = 'block'
  }