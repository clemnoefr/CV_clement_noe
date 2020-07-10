let mario = document.getElementById('mario');

// recupérer le départ du perso

var x = window.getComputedStyle(mario).getPropertyValue("grid-column-start");
var y = window.getComputedStyle(mario).getPropertyValue("grid-row-start");

// limite en x et y
let limiteX = ()=>{
    if(x >= 45){x = 45}
    if(x<=-1){x=1} // x=0 n'existe pas, pas de colonne 0
};
let limiteY = ()=>{
    if(y >=19){y=19}
    if(y <=15){y=15}
};
let limitepipedown = () =>{
    if(y==17 && x==15 || y==17 && x==23 || y==17 && x==24 || y==15 && x==29 || y==16 && x==37){return true}
    if(y==17 && x==16 || y==17 && x==24 || y==15 && x==30 || y==16 && x==38){return true}
    return false // car si la fonction return 1 valeur alors elle stop ses instructions
};

// on ajoute un écouteur
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    document.getElementById("titre").style.display = "none";

    switch (keyName) {
        case "ArrowUp":
            y--;
            limiteY(); 
            mario.style.gridRow = y;
            break;
        case "ArrowDown":
            if(limitepipedown() ){break;}
            y++;
            limiteY();
            mario.style.gridRow = y;
            break;
        case "ArrowLeft":
            if (x==17 && y==19 || x==17 && y == 18){break;}
            if (x==25 && y==19 || x==25 && y == 18){break;}
            if (x==31 && y==19 || x==31 && y == 18 || x==31 && y == 17 || x==31 && y == 16){break;}
            if (x==39 && y==19 || x==39 && y == 18 || x==39 && y == 17){break;}
            x--;
           limiteX();
            mario.style.gridColumn = x;
            break;
        case "ArrowRight":
            if ( x === 45 && y== 19){
                console.log("fin du jeu")
                document.getElementById("titre").style.display = "block";
                document.getElementById("titre").textContent = "YOU WIN";
        }
            if (x==14 && y==19 || x==14 && y == 18){break;}
            if (x==22 && y==19 || x==22 && y == 18){break;}
            if (x==28 && y==19 || x==28 && y == 18 || x==28 && y == 17 || x==28 && y == 16){break;}
            if (x==36 && y==19 || x==36 && y == 18 || x==36 && y == 17){break;}
            x++;            
            limiteX();
            mario.style.gridColumn = x;
            break;
        default:
            break;
    }
});