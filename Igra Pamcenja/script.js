

const username = document.getElementById("username");                           // Getting all elements via DOM 
const btnUserSbm = document.getElementById("userSubmit");
const diffOptions = document.querySelectorAll(`input[name = "difficulty"`);
const optionsDiv = document.getElementById("diffOpts")

let icons = ["./accordion.png", "./anteater.png", "./archaeopteryx-fossil.png", "./artichoke.png", "./astrolabe.png"]
console.log(diffOptions);
for(let i =0; i <= 50; i++){
    icons.push("./accordion.png");
}


let usernames = [];

function getUsername (e) {
    e.preventDefault();
    let currentUser = username.value;
    let localUsers = localStorage.usernames;
    console.log(localUsers);
    console.log(localUsers);

    if(currentUser === null || currentUser == ""){
        window.confirm("Username is not valid");                                // Alert on username entry and reload on any picked option 
        window.location.reload()

    }else if(localUsers.includes(currentUser)){
        window.confirm("Username is already taken");
        window.location.reload();
        
    }else{
        usernames.push(currentUser)
        window.localStorage.setItem("usernames",JSON.stringify(usernames))      // setting current username into local storeage  
        username.placeHolder = currentUser;                                     // seting plcaeholder value of input field to current user

    }
    
    
}

btnUserSbm.addEventListener("click",getUsername);

username.addEventListener("keypress",(e) => { 
    if(e.keyCode === 13){                                                       // Adding username on enter keypress
       getUsername(e);  
    }
})
console.log(optionsDiv);


let numOfIco = 0;
let randArrOfIco = [];

function getIcons(array,num) {
    for(let i = 0; i < num; i++ ){
        let sorted = array.sort((a,b) =>  Math.random() - 0.5)                  //Original array order is shuffled 
        let randomIndx = Math.floor(sorted.length * Math.random());             //Generating random index of the array
        let randomIco = sorted.toSpliced(randomIndx,1)[0];                      //Taking the random ico from the array via the random index
        randArrOfIco.push(randomIco)                                            //Pushing random ico to the array of random icons 
    
    }
}

function displayIcons(randArrOfIco) { 

}


optionsDiv.addEventListener("click", (e) => {                                   //Setting total number of icons based of what difficutly is selected
    
    let input = e.target;
    if(input.checked == true && input.id == "difficultyEz"){ 
        numOfIco = 8;
        getIcons(icons,numOfIco);
        console.log(randArrOfIco);

    }else if(input.checked == true && input.id == "difficultyMed"){
        numOfIco = 18;
        getIcons(icons,numOfIco);
        console.log(randArrOfIco);

    }else if(input.checked == true && input.id == "difficultyHrd"){
        numOfIco = 32;
        getIcons(icons,numOfIco);
        console.log(randArrOfIco);

    }else if(input.checked == true && input.id == "difficultyExp"){
        numOfIco = 50;
        getIcons(icons,numOfIco);
        console.log(randArrOfIco);
    }
})






