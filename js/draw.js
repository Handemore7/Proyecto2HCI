function preload(){
    tutorial = loadSound("./sounds/Tutorial.mp3");
}


function setup(){
    createCanvas(1280,720);

    
    tiemposD = [0,2,4,5,6,7,8.1,9.1,10.1,10.6];
    tiemposF = [0.5,2.5,5.5,9.6];
    tiemposJ = [1,3,4.5,6.5,8.6];
    tiemposK = [1.5,3.5,7.5];

    notas = [];

    notasD=[];
    notasF=[];
    notasJ=[];
    notasK=[];

    teclaD = new Tecla(116,582,"./sounds/re.mp3","./images/D",0);
    teclaF = new Tecla(436,582,"./sounds/mi.mp3","./images/F",0);
    teclaJ = new Tecla(756,582,"./sounds/fa.mp3","./images/J",0);
    teclaK = new Tecla(1076,582,"./sounds/sol.mp3","./images/K",0);
    currentMillis = millis();

    this.tutorial.play();
    
}
function draw(){
    background(255);
    teclaD.dibujarTecla();
    teclaF.dibujarTecla();
    teclaJ.dibujarTecla();
    teclaK.dibujarTecla();
    
    for (let i = 0; i < notasD.length; i++) {
         
            notasD[i].dibujarNota();
            notasD[i].move();
            notasD[i].checkOut();
         
    }
    for (let i = 0; i < notasF.length; i++) {
       
           notasF[i].dibujarNota();
           notasF[i].move();
           notasF[i].checkOut();
        
   }
   for (let i = 0; i < notasJ.length; i++) {
    
       notasJ[i].dibujarNota();
       notasJ[i].move();
       notasJ[i].checkOut();
    
}
for (let i = 0; i < notasK.length; i++) {
    
       notasK[i].dibujarNota();
       notasK[i].move();
       notasK[i].checkOut();
    
}
    
    generarNota();

}

function keyPressed(){
        if (key == 'd') {
            teclaD.hundirTecla();
        }
        if (key == 'f') {
            teclaF.hundirTecla();
        }
        if (key == 'j') {
            teclaJ.hundirTecla();
        }
        if (key == 'k') {
            teclaK.hundirTecla();
        }
    
}
function keyReleased(){
        if (key == 'd') {
            teclaD.soltarTecla();
        } 
        if (key == 'f') {
            teclaF.soltarTecla();
        } 
        if (key == 'j') {
            teclaJ.soltarTecla();
        } 
        if (key == 'k') {
            teclaK.soltarTecla();
        } 
}
function generarNota(){
    let notaSec = Math.round(((millis() - currentMillis)/1000)*10)/10;
    if (tiemposD.includes(notaSec)) {
        notasD.push(new Note(129,0))
        
    }
    if (tiemposF.includes(notaSec)) {
        notasF.push(new Note(451,0))
    }
    if (tiemposJ.includes(notaSec)) {
        notasJ.push(new Note(771,0))
    }
    if (tiemposK.includes(notaSec)) {
        notasK.push(new Note(1089,0))
    }
}

class Tecla{
    constructor(x,y,rutaSonido,rutaImagen,tipo){
        this.x = x;
        this.y = y;
        this.rutaSonido = rutaSonido;
        this.rutaImagen = rutaImagen;
        this.tipo = tipo;
        this.estado = 0;
        this.sonido = loadSound(this.rutaSonido);
        this.imagen = [];
        for (let i = 0; i < 2; i++) {
            this.imagen.push(loadImage(this.rutaImagen + i + ".png"));
        }
    }
    dibujarTecla(){
        image(this.imagen[this.estado],this.x,this.y);
    }
    hundirTecla(){
        this.estado = 1;
        this.sonido.play();

    }
    soltarTecla(){
       this.estado = 0;
    }
}
class Note{
    constructor(x,y){
        this.x=x;
        this.y=y;

    }
    dibujarNota(){
        noStroke();
        rect(this.x,this.y,58,168,7);
        fill(143,155,255);
    }
    move(){
        this.y += 10;
    }
    checkOut(){
        if (this.y >= 720) {
            if (this.x == 129) {
                notasD.shift()
            }
            if (this.x == 451) {
                notasF.shift()
            }
            if (this.x == 771) {
                notasJ.shift()
            }
            if (this.x == 1089) {
                notasK.shift()
            }
        }
    }
}