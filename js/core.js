Array.prototype.remove = function(el) {
  return this.splice(this.indexOf(el), 1);
}
const InstrumentEnum = Object.freeze({
  BONGO: 0,
  KEYBOARD: 1,
  MARIMBA: 5,
  TAMBOURINE: 6,
})
const KeyEnum = Object.freeze({
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "S": 1,
  "D": 2,
  "F": 3,
  "J": 4,
  "K": 5,
  "L": 6,
})
const InstrumentPerKeyEnum = Object.freeze({
  "S": InstrumentEnum.KEYBOARD,
  "D": InstrumentEnum.KEYBOARD,
  "F": InstrumentEnum.KEYBOARD,
  "J": InstrumentEnum.KEYBOARD,
  "K": InstrumentEnum.KEYBOARD,
  "L": InstrumentEnum.KEYBOARD,
})
const TapKeysPerLayerEnum = Object.freeze({
  "layer-bongo": ["tap-keys"],
  "layer-marimba": ["tap-keys"],
  "layer-keyboard": ["tap-keys"]
})
var pressed = [];
var currentLayer;
var allLayers = [];
for (var tapKeysPerInstrument of Object.values(TapKeysPerLayerEnum)) {
  allLayers.push(...tapKeysPerInstrument);
}
allLayers = [...new Set(allLayers)];
$(document).ready(function() {
  lowLag.init({
    'urlPrefix': './sounds/',
    'debug': 'none'
  });
  $.load("bongo", 0, 1);
  $.load("marimba", 0, 9);
  $.load("keyboard", 0, 9);
  $("select#select-instrument").on("change", function() {
    $.layers($(this).val());
  });
});
$.loadSimple = function(file) {
  for (i = 0; i <= 1; i++) {
    lowLag.load([file + ".mp3", file + ".wav"], file + i);
  }
}
$.load = function(file, start, end) {
  for (i = start; i <= end; i++) {
    lowLag.load([file + i + ".mp3", file + i + ".wav"], file + i);
  }
}
$.wait = function(callback, ms) {
  return window.setTimeout(callback, ms);
}
$.play = function(instrument, key, state) {
  var instrumentName = Object.keys(InstrumentEnum).find(k => InstrumentEnum[k] === instrument).toLowerCase();
  var commonKey = KeyEnum[key];
  if (state == true) {
    if (jQuery.inArray(commonKey, pressed) !== -1) {
      return;
    }
    lowLag.play(instrumentName + commonKey);
    $.layers(Object.keys(LayersPerInstrumentEnum).find(k => LayersPerInstrumentEnum[k] == instrument), true);
  } else {
    pressed.remove(commonKey);
  }
  $(id).css("background-position-x", (state ? "-800px" : "0"));
}
$(document).on("keydown keyup", function(e) {
  var instrument = InstrumentPerKeyEnum[e.key.toUpperCase()];
  var key = KeyEnum[e.key.toUpperCase()];
  if (instrument != undefined && key != undefined) {
    $.play(instrument, key, e.type === "keydown");
  }
});

//Logica de transición de pantallas

var lvl1 = document.querySelector('.GoTolvl1');
var lvl2 = document.querySelector('.GoTolvl2');
var test = document.querySelector('.mainContainer');
console.log(lvl2);
console.log(test);
    var GoToLevel2 = function(event){
      console.log("estoy en el lvl 2");
        document.querySelector(".keyA").style.display='inline-block';
        document.querySelector(".keyL").style.display='inline-block';
    }
    lvl2.addEventListener('click', GoToLevel2);
