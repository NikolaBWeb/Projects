

const username = document.getElementById("username");                           // Getting all elements via DOM
const btnUserSbm = document.getElementById("userSubmit");
const diffOptions = document.querySelectorAll(`input[name = "difficulty"`);
const optionsDiv = document.getElementById("diffOpts");
const icoContainer = document.getElementById("iconsContainer");
let timer = document.getElementById("timer");
let icons = [];
for( let i = 1; i <= 50; i++){
    if(i < 10) {
        icons.push(`icons/abstract-00${i}.png`)
    }else if(i >= 10 && i <100 ){
        icons.push(`icons/abstract-0${i}.png`)
    }
}
console.log(icons);
console.log(diffOptions);

optionsDiv.style.display = "none";
let usernames = JSON.parse(window.localStorage.getItem("usernames")) || [];
let currentUser;
function getUsername(e) {
    e.preventDefault();
     currentUser = { username: username.value };
    if (currentUser.username === "") {
        window.confirm("Username is not valid");
        window.location.reload();
    } else if (usernames && usernames.some(user => user.username === currentUser.username)) {
        window.confirm("Username is already taken");
        window.location.reload();
    } else {
        usernames.push(currentUser);
        window.localStorage.setItem("usernames", JSON.stringify(usernames));
        username.placeholder = currentUser.username;
    }
    optionsDiv.style.display = "block";
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
    randArrOfIco = [];
    while(randArrOfIco.length < num * 2){
        let sorted = array.sort((a,b) =>  Math.random() - 0.5)                  //Original array order is shuffled
            let randomIndx = Math.floor(sorted.length * Math.random());             //Generating random index of the array
            let randomIco = sorted.toSpliced(randomIndx,1)[0];
            if(randArrOfIco.includes(randomIco) == false){
                randArrOfIco.push(randomIco);                                           //Pushing random ico to the array of random icons
                randArrOfIco.unshift(randomIco);  
            }          
    }
                                                                             //Taking the random ico from the array via the random index
                                             
    
    randArrOfIco.sort((a,b) =>  Math.random() - 0.5);
}
function displayIcons(arr,num) {                                                        //Creating img tags for each el in the arr of random icons
    for(let i = 0; i < arr.length; i++){
        let img = document.createElement("img");
        img.src = arr[i];
        icoContainer.appendChild(img);
        let br = document.createElement("br");
        if( (i + 1) % 4 === 0 && num ==8){                                                    //Adding br tag on 4 el since we are making 4x4 table
            icoContainer.appendChild(br);
            
        }else if((i + 1) % 6 === 0 && num == 18){
            icoContainer.appendChild(br);
        }else if((i + 1) % 8 === 0 && num == 32){
            icoContainer.appendChild(br);
        }else if((i + 1) % 10 === 0 && num == 50){
            icoContainer.appendChild(br);
        }
    }
    console.log(num);
}
let count = -1;
let timeInterval;
optionsDiv.addEventListener("click", (e) => { 
    console.log(1);
    sameIcoArr = [];
    clearInterval(timeInterval)
     count = 0
    timer.innerHTML = "Vreme";                               //Setting total number of icons based of what difficutly is selected
    let input = e.target;
    if(input.checked == true && input.id == "difficultyEz"){
        numOfIco = 8;
    }else if(input.checked == true && input.id == "difficultyMed"){
        numOfIco = 18;
    }else if(input.checked == true && input.id == "difficultyHrd"){
        numOfIco = 32;
        console.log(randArrOfIco);
    }else if(input.checked == true && input.id == "difficultyExp"){
        numOfIco = 50;
    }
    
    icoContainer.innerHTML = "";
    getIcons(icons,numOfIco);
    displayIcons(randArrOfIco,numOfIco);
    let ico = document.querySelectorAll("img");
    ico.forEach(el => {
        console.log(1);
        el.src = "icons/Hat.png"
    })
     timeInterval = setInterval(() => {
            count++;
            timer.innerHTML = `Vreme ${count}`
           
        },1000)
});
let times = JSON.parse(window.localStorage.getItem("times")) || [];
function end() {
    let localUsernames = usernames;
    // Check if the currentUser already exists
    let currentUserIndex = localUsernames.findIndex(user => user.username === currentUser.username);
    clearInterval(timeInterval);
    let elapsedTime = count;
    if (currentUserIndex !== -1) {
        // If the user exists, update the time only if it's faster or if the time doesn't exist
        if (!localUsernames[currentUserIndex].time || elapsedTime < localUsernames[currentUserIndex].time) {
            localUsernames[currentUserIndex].time = elapsedTime;
        }
    } else {
        // If the currentUser doesn't exist, add it to the array
        localUsernames.push({ username: currentUser.username, time: elapsedTime });
    }
    window.localStorage.setItem("usernames", JSON.stringify(localUsernames));
    window.confirm(`Congratulations! You completed the game in ${elapsedTime} seconds.`);
    window.location.reload();
    console.log(count);
}



// let currentIconsOpen = [];
// let sameIcoArr = [];
// icoContainer.addEventListener("click" , (e) => {                                                            // Listening to the container to find clicked elements inside
//     const parent = e.target.parentElement;                                                                  // Creating the parent element so we can get the array of children
//     let imgOnlyArr = Array.from(parent.children).filter(el => el.tagName.toLowerCase() !== "br")            //Filtering out the br tag
//     const clickedIndex = Array.from(imgOnlyArr).indexOf(e.target);                                          //Getting index of the target el inside a children arr
//     e.target.src = randArrOfIco[clickedIndex]                                                               //El is getting src value of the same index inside random arr of ico
//     let imageUrl = e.target.src;                               
//     let parts = imageUrl.split("/");
//     let src = `icons/${parts[parts.length - 1]}`;                                                                      //Since target.src is a full URL we are filtering out just the last part
//     currentIconsOpen.push(src);
//     setTimeout(() => {
//         if(currentIconsOpen[0] == currentIconsOpen[1]){
//             for (let i = 0; i < 2; i++) {
//              sameIcoArr.push(src);      
//             }
//         }else{
//             e.target.src = "icons/Hat.png";
//         }
//         currentIconsOpen.pop(src);
//     },1500);
//     if(currentIconsOpen.length > 2){
//         e.target.src = "icons/Hat.png";
//     }
//     console.log(randArrOfIco);
// });
let opened = [];
let sameIcoArr = [];
let lastClickedElement = null;
icoContainer.addEventListener("click", (e) => {
    const parent = e.target.parentElement;
    let imgOnlyArr = Array.from(parent.children).filter(el => el.tagName.toLowerCase() !== "br");
    const clickedIndex = Array.from(imgOnlyArr).indexOf(e.target);
    e.target.src = randArrOfIco[clickedIndex];
    console.log(sameIcoArr,numOfIco);
    opened.push(e.target.src);
    if (lastClickedElement) {
        
        setTimeout(() => {
            if (lastClickedElement.src === e.target.src) {
                // Set the source of the last two clicked elements to the same source
                lastClickedElement.src = e.target.src;
                e.target.src = e.target.src;
                for (let j = 0; j < 2; j++) {
                    sameIcoArr.push(e.target.src);
                    
                }
            } else {
                // Reset the sources if they are not the same
                lastClickedElement.src = "icons/Hat.png";
                e.target.src = "icons/Hat.png";
                
            }
            
            // Clear the reference to the last clicked element
            lastClickedElement = null;
            if (numOfIco == 8 && sameIcoArr.length == (numOfIco * 2)) {
                end();
            }else if(numOfIco == 18 && sameIcoArr.length == (numOfIco * 2)){
                end();
            }else if(numOfIco == 32 && sameIcoArr.length == (numOfIco * 2)){
                end();  
            }else if(numOfIco == 50 && sameIcoArr.length == (numOfIco * 2)){
                end();
            }
            opened.pop();
            opened.pop();

        }, 1000);
    } else {
        // Store the reference to the first clicked element
        lastClickedElement = e.target;  
        opened.pop();
        opened.pop();
        
    }
    
    if(opened.length >= 2){
        e.target.src = "icons/Hat.png"
    }
    console.log(sameIcoArr.length);
    
});
function displayLeaderboard() {
    let localUsernames = JSON.parse(window.localStorage.getItem("usernames")) || [];
    // Sort the localUsernames array based on the time property
    localUsernames.sort((a, b) => a.time - b.time);
    // Create a div to display the leaderboard
    let leaderboardDiv = document.createElement("div");
    // Iterate through the sorted localUsernames array and create divs for each user
    localUsernames.forEach(user => {
        let userDiv = document.createElement("div");
        userDiv.textContent = `${user.username} - ${user.time} seconds`;
        leaderboardDiv.appendChild(userDiv);
    });
    // Append the leaderboardDiv to the body or any other container element
    document.body.appendChild(leaderboardDiv);
}
// Call the function to display the leaderboard
displayLeaderboard()

//else if(num == 18 && sameIcoArr.length == num * 2){

// }else if(num == 32 && sameIcoArr.length == num * 2){

// }




