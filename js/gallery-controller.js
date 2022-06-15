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
