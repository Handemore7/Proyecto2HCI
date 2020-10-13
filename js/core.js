Array.prototype.remove = function(el) {
  return this.splice(this.indexOf(el), 1);
}
const InstrumentEnum = Object.freeze({
  BONGO: 0,
  KEYBOARD: 1,
  MEOW: 3,
  CYMBAL: 4,
  MARIMBA: 5,
  TAMBOURINE: 6,
  COWBELL: 7
})
const KeyEnum = Object.freeze({
  "0": 0,
  "1": 1,
  "3": 3,
  "5": 5,
  "7": 7,
  "D": 1,
  "F": 7,
  "J": 1,
  "K": 0,
})
const InstrumentPerKeyEnum = Object.freeze({
  "D": InstrumentEnum.MARIMBA,
  "F": InstrumentEnum.MARIMBA,
  "J": InstrumentEnum.BONGO,
  "K": InstrumentEnum.BONGO,
})
const TapKeysPerLayerEnum = Object.freeze({
  "layer-bongo": ["tap-keys"],
  "layer-marimba": ["tap-keys"]
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
    'urlPrefix': '../sounds/',
    'debug': 'none'
  });
  $.load("bongo", 0, 1);
  $.load("marimba", 0, 9);
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
