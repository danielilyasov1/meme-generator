"use strict"
var elText = ""
var gColorTxt = document.querySelector("[name=fill-color]").style.color
var gColorSt = document.querySelector("[name=stroke-color]").style.color

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "text meme..",
      weight: "700",
      size: 40,
      font: "ariel",
      align: "center",
      color: "green",
      stroke: "black",
      pos: { x: 10, y: 100 },
    },
  ],
}

//get memes
function getgMeme() {
  return gMeme
}

//text line
function setTextLine(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getLineWidth() {
  return gMeme.lines[gMeme.selectedLineIdx].width
}

//img to gallery
function getImg() {
  if (!gSearchFilter) return gImgs
  return gImgs.filter((img) => img.keywords.includes(gSearchFilter))
}

//img to canvas
function setImg(imgId) {
  gMeme.selectedImgId = imgId
}
function getMeme() {
  const img = gImgs.find((img) => img.id === gMeme.selectedImgId)
  return img
}

//change the text color
function setTextColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

//change the stroke text color
function setStrokeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = color
}

//stwich between the lines
function switchLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

//add new line
function addLine() {
  const newLine = createNewLine()
  gMeme.lines.splice(1, 0, newLine)
}
function createNewLine() {
  return {
    txt: "text more meme..",
    size: 40,
    align: "center",
    color: "black",
    font: "ariel",
  }
}

//delete line text
function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

//font size
function changeFontSize(diff) {
  const num = gMeme.lines[gMeme.selectedLineIdx].size
  gMeme.lines[gMeme.selectedLineIdx].size = num + diff
  console.log(num + diff)
}

//download the img to computer
function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL("image/jpeg") // image/jpeg the default format
  elLink.href = imgContent
}

//resize canvas to img size
function resizeCanvas() {
  //need to check about the img in canvas
  //size of the img is like the elContainer here
  const elContainer = document.querySelector(".canvas-container")
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetHeight
}
