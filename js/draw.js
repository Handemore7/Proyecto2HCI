function setup(){
    createCanvas(1280,720);
    

    notas = [];

    notas[0]= new Note(129,0);
    notas[1]= new Note(451,0);
    notas[2]= new Note(771,0);
    notas[3]= new Note(1089,0);

    teclaD = new Tecla(116,582,"./sounds/keyboard0.mp3","./images/D",0);
    teclaF = new Tecla(436,582,"./sounds/keyboard1.mp3","./images/F",0);
    teclaJ = new Tecla(756,582,"./sounds/keyboard2.mp3","./images/J",0);
    teclaK = new Tecla(1076,582,"./sounds/keyboard3.mp3","./images/K",0);
}
function draw(){
    background(255);
    teclaD.dibujarTecla();
    teclaF.dibujarTecla();
    teclaJ.dibujarTecla();
    teclaK.dibujarTecla();
    for (let i = 0; i < notas.length; i++) {
         notas[i].dibujarNota();
         notas[i].move();
    }
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
        this.y += 5;
    }
}