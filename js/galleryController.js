"use strict"

var gCanvas
var gCtx
const elImgGallery = document.querySelector(".gallery-container")
const elEditor = document.querySelector(".editor-container")
const elMemes = document.querySelector(".memes")
const elFile = document.querySelector(".file-input")
const elDownload = document.querySelector(".download")
const elSearch = document.querySelector(".search-container")
const elLogo = document.querySelector(".main-logo")

function init() {
  renderGallery()
  gCanvas = document.querySelector(".my-canvas")
  gCtx = gCanvas.getContext("2d")
  console.log(gCanvas)
  renderSavedMemes()
  addListeners()
}

function onShowGallery() {
  elSearch.style.display = "block"
  elImgGallery.style.display = "grid"
  elMemes.style.display = "none"
  elEditor.style.display = "none"
  elFile.style.display = "none"
  elDownload.style.display = "none"
  elLogo.innerText = "memeker"
  renderGallery()
  init()
}

//click on nav
function onActivePage(el) {
  const elLink = document.querySelector("a.active")
  elLink.classList.remove("active")
  el.classList.add("active")
}

//nav burger
function onClickScreen() {
  if (document.body.classList.contains("menu-open")) {
    toggleHamburger()
  }
  if (document.body.classList.contains("modal-open")) {
    toggleModal()
  }
}

//nav burger
function toggleHamburger() {
  document.body.classList.toggle("menu-open")
  const elBtn = document.querySelector(".hamburger-btn")
  elBtn.innerText = elBtn.innerText === "☰" ? "✖" : "☰"
}

function toggleModal() {
  document.body.classList.toggle("modal-open")
}

//render the gallery img
function renderGallery() {
  const imgs = getImg()

  const strHTMLs = imgs.map(
    (img) => `<article class="meme-gallery" onclick="onImgSelect(${img.id})">
                <img src="${img.url}"  alt="" />
              </article> `
  )

  document.querySelector(".gallery-container").innerHTML = strHTMLs.join("")
}

//on click img
function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
  elSearch.style.display = "none"
  elImgGallery.style.display = "none"
  elMemes.style.display = "none"
  elEditor.style.display = "block"
  elFile.style.display = "block"
  elDownload.style.display = "block"
  elLogo.innerText = "memeker editor"
}

///choose img from the computer
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
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

//search
function onSearchMemes(e) {
  e.preventDefault()
  const searchTxt = document.querySelector(".text-input").value
  setSearchFilter(searchTxt)
  renderGallery()
}

//make random meme flexible
function onFlexible() {
  elSearch.style.display = "none"
  elImgGallery.style.display = "none"
  elMemes.style.display = "none"
  elEditor.style.display = "block"
  elFile.style.display = "block"
  elDownload.style.display = "block"
  elLogo.innerText = "memeker editor"
  randomMeme()
  renderMeme()
}

function onShowSavedMemes() {
  elSearch.style.display = "none"
  elImgGallery.style.display = "none"
  elMemes.style.display = "grid"
  elEditor.style.display = "none"
  elFile.style.display = "none"
  elDownload.style.display = "none"
  elLogo.innerText = "memeker"

  renderSavedMemes()
}

// On select saved memes
function onMemeSelect(memeIdx) {
  setMeme(memeIdx)
  elSearch.style.display = "none"
  elImgGallery.style.display = "none"
  elMemes.style.display = "none"
  elEditor.style.display = "block"
  elFile.style.display = "block"
  elDownload.style.display = "block"
  elLogo.innerText = "memeker editor"
  renderMeme()
}
