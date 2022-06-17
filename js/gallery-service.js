"use strict"

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gImgs = [
  { id: 1, url: "img/1.jpg", keywords: ["funny", "politition"] },
  { id: 2, url: "img/2.jpg", keywords: ["cute", "dog"] },
  { id: 3, url: "img/3.jpg", keywords: ["baby", "dog", "cute"] },
  { id: 4, url: "img/4.jpg", keywords: ["cumputer", "cat"] },
  { id: 5, url: "img/5.jpg", keywords: ["funny", "baby"] },
  { id: 6, url: "img/6.jpg", keywords: ["man", "tv"] },
  { id: 7, url: "img/7.jpg", keywords: ["funny", "baby"] },
  { id: 8, url: "img/8.jpg", keywords: ["funny", "tv"] },
  { id: 9, url: "img/9.jpg", keywords: ["funny", "baby"] },
  { id: 10, url: "img/10.jpg", keywords: ["funny", "politition"] },
  { id: 11, url: "img/11.jpg", keywords: ["man"] },
  { id: 12, url: "img/12.jpg", keywords: ["funny", "tv"] },
  { id: 13, url: "img/13.jpg", keywords: ["tv"] },
  { id: 14, url: "img/14.jpg", keywords: ["tv", "man"] },
  { id: 15, url: "img/15.jpg", keywords: ["funny", "man"] },
  { id: 16, url: "img/16.jpg", keywords: ["funny", "man", "tv"] },
  { id: 17, url: "img/17.jpg", keywords: ["funny", "politition"] },
  { id: 18, url: "img/18.jpg", keywords: ["funny", "tv"] },
]

var gSearchFilter = ""

//search
function setSearchFilter(value) {
  gSearchFilter = value.toLowerCase()
}
