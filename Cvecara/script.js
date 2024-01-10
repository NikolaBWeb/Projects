


//Brojimo ruze 
let ruzeEl = document.getElementById("ruze")
let gerberi = document.getElementById("gerberi")
let ljiljani = document.getElementById("ljiljani");
let btn = document.getElementById("izracunaj");
let totalTxt = document.getElementById("saPopustom")
let bezPopusta = document.getElementById("bezPopusta")
let bombonjera = document.getElementById("bombonjera");
let cokolada = document.getElementById("cokolada");
let sampanjac = document.getElementById("sampanjac")
let kartica = document.getElementById("kartica");
let ruzeImg = document.getElementById("ruzeImg");
let gerberiImg = document.getElementById("gerberiImg");
let ljiljaniImg = document.getElementById("ljiljaniImg")
let opcija1 = document.getElementById("option1");
let opcija2 = document.getElementById("option2");
let opcija3 = document.getElementById("option3")


btn.addEventListener("click", (e) => {
    e.preventDefault()
   
    let total = 0;
    if(ruzeEl.value < 0 || gerberi.value < 0 || ljiljani.value < 0){
        ruzeEl.value = 0;
        gerberi.value = 0;
        ljiljani.value = 0;
    }
    if(ruzeEl.value > 0 && gerberi.value > 0 && ljiljani.value > 0){ 
        if(ruzeEl.value % 1 == 0 && gerberi.value % 1 == 0 && ljiljani.value % 1 == 0){
            total = ruzeEl.value * 150 + gerberi.value * 120 + ljiljani.value * 70;
        }else{
            ruzeEl.value = "";
            gerberi.value = "";
            ljiljani.value = "";
        }
        
    }
    if(bombonjera.checked == true){
        total += 500;
        console.log(1);
        opcija1.innerHTML += `+ <img src="slike/bombonjera.png" alt="bombonjera">`
    }
    if(cokolada.checked == true){
        total+=500
        console.log(1);
        opcija2.innerHTML +=  `+ <img src="slike/Chocolate - 64.png" alt="cokolada">`

    }
    if(sampanjac.checked == true ){
        total+=500;
        console.log(1);
        opcija3.innerHTML += `+ <img src="slike/champagne - 64.png" alt="sampanjac">`
    }
    if(kartica.checked == true && total > 2000) { 
        bezPopusta.value = total;
        total = total - (total * 0.1)
        totalTxt.value = total;
        
    }
    if(kartica.checked != true){
        totalTxt.placeholder = "Niste izabrali placanje karticom";
        bezPopusta.value = total;
    }
    for(let i = 0; i <= ruzeEl.value; i++){
        if(i != 0){
            ruzeImg.innerHTML += `<img src ="slike/Rose - 64.png" alt="slika">`
        }
        
    }
    for(let i = 0; i <= gerberi.value; i++){
        if(i != 0){
            gerberiImg.innerHTML += `<img src="slike/Tulip - 64.png" alt="tulipi">`
        }
        
    }
    for(let i = 0; i <= ljiljani.value; i++){
        if(i != 0){
            ljiljaniImg.innerHTML += `<img src="slike/Flower - 64.png" alt="ljiljan">`
        }
        
    }

   btn.disabled = true;
   totalTxt.disabled = true;
   bezPopusta.disabled = true;
   
    
})
