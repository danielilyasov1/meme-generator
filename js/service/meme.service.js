"use strict"

const KEY = "memesDB"
var elText = ""
var gColorTxt = document.querySelector("[name=fill-color]").style.color
var gColorSt = document.querySelector("[name=stroke-color]").style.color
var gDoneMeme =[]
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

//get done memes
function getMemes() {
  return gDoneMeme
}

//get memes
function getgMeme() {
  return gMeme
}

function setMeme(memeIdx) {
  gMeme = gDoneMeme[memeIdx]
}

//text line
function setTextLine(text) {
  getCurrLine().txt = text
}

//curr line
function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getLineWidth() {
  return getCurrLine().width
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
function setTextColor(color,idx = gMeme.selectedLineIdx) {
  gMeme.lines[idx].color = color
}

//font size to randmeme
function setFontSize(size,idx = gMeme.selectedLineIdx) {
  gMeme.lines[idx].size = size
}

//change the stroke text color
function setStrokeColor(color,idx = gMeme.selectedLineIdx) {
  gMeme.lines[idx].stroke = color
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
  gMeme.selectedLineIdx += 1
}
function createNewLine() {
  return {
    txt: "text more meme..",
    size: 40,
    align: "center",
    color: "black",
    font: "ariel",
    pos: { x: 10, y: 100 },
  }
}

//delete line text
function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  gMeme.selectedLineIdx -= 1
}

//change align
function setLineAlign(alignment) {
	gMeme.lines[gMeme.selectedLineIdx].align = alignment
}

//font size
function changeFontSize(diff) {
  const num = gMeme.lines[gMeme.selectedLineIdx].size
  gMeme.lines[gMeme.selectedLineIdx].size = num + diff
}

//download the img to computer
function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL("image/jpeg") // image/jpeg the default format
  elLink.href = imgContent
}

function saveMeme() {
  gMeme.dataImg = gCanvas.toDataURL('image/jpeg')
  gDoneMeme.push(JSON.parse(JSON.stringify(gMeme)))

  _saveMemesToStorage()
}

function _loadMemesFromStorage() {
  gDoneMeme = loadFromStorage(KEY)

  if (!gDoneMeme) gDoneMeme = []
}

function _saveMemesToStorage() {
  saveToStorage(KEY, gDoneMeme)
}

//resize canvas to img size
function resizeCanvas() {
  //need to check about the img in canvas
  //size of the img is like the elContainer here
  const elContainer = document.querySelector(".canvas-container")
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetHeight
}

//check if clicked on line
function isInLine(pos, isClicked) {
	for (let i = gMeme.lines.length - 1; i >= 0; i--) {
		const line = gMeme.lines[i]
		if (
			pos.x >= line.pos.x &&
			pos.x <= line.pos.x + getLineWidth() &&
			pos.y >= line.pos.y &&
			pos.y <= line.pos.y + line.size
		) {
			if (isClicked) gMeme.selectedLineIdx = i
			return true
		}
	}
	return false
}

//not go beyond the border of the canvas
function moveLine(diffX = 0, diffY = 0) {
	const line = getCurrLine()
	const posX = line.pos.x + diffX
	const posY = line.pos.y + diffY
	if (posY < 0 || posY > gCanvas.height) return
	if (posX < 0 || posX > gCanvas.width) return

	line.pos.x = posX
	line.pos.y = posY
}