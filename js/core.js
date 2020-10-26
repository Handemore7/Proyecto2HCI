function addEvent(element, eventName, callback) {
  if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
  } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, callback);
  } else {
      element["on" + eventName] = callback;
  }
}
var x = 50;
var iniciarSecuencia = function(value) {
    x -= 1;
}

addEvent(document, "keyup", function (e) {
  durationEnd=clock;
  touchkey();
});
window.setInterval(iniciarSecuencia,10);


document.getElementById("imgkeys1").style.bottom=x+"px";
/*function pressEvent(keyPressed) {
  if (keyPressed == S) {
    
  } 
  if (keyPressed == D) {
    
  }
  if (keyPressed == F) {
    
  } 
  if (keyPressed == J) {
    
  } 
  if (keyPressed == K) {
    
  } 
  if (keyPressed == L) {
    
  } 
}

pressEvent(keyPressed);*/

//Contador de tiempo 

var elem = document.getElementById("my-stopwatch");
var clock = undefined;
var durationBegin = undefined;
var durationEnd = undefined;
var duration = undefined;
var commonKey = undefined;

var touchkey = function(value){
  duration = durationEnd - durationBegin;
  console.log("La letra "+commonKey+" tocada en el milisegundo "+clock +" durante "+ duration+" milisegundos");
}

var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
      startButton = createButton("start", start),
      stopButton  = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = clock/1000; 
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};

var timer = new Stopwatch(elem, {delay: 10});

// Tocar los sonidos

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
  commonKey = KeyEnum[key];
  if (state == true) {
    if (jQuery.inArray(commonKey, pressed) !== -1) {
      return;
    }
    lowLag.play(instrumentName + commonKey);
    timer.start();
  } else {
    pressed.remove(commonKey);
  }
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
    var GoToLevel2 = function(event){
      console.log("estoy en el lvl 2");
        document.querySelector(".keyA").style.display='inline-block';
        document.querySelector(".keyL").style.display='inline-block';
        document.querySelector(".keyJ").style.marginLeft='15%';
        document.querySelector(".keyK").style.marginLeft='15%';
    }
  lvl2.addEventListener('click', GoToLevel2);

  addEvent(document, "keydown", function (e) {
    durationBegin=clock;
  });
  

var resultados = function(p1, p2, e) {
  var total=(p1*0,6)+(p2*0.2)+(20-(e*0,02));
  console.log(total);
}
  