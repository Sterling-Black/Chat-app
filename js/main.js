const convers = document.querySelector(".conversation");




/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";


// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    
    if(document.body.classList&&document.body.classList.contains(darkTheme)){
        console.log("dark");
        convers.style.backgroundImage = 'url("image/BG.jpg")';
    }else{
        console.log("light");
        convers.style.backgroundImage = 'url("image/BG2.webp")';
    }

    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
        iconTheme
    );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    

    if(document.body.classList&&document.body.classList.contains(darkTheme)){
        console.log("dark");
        convers.style.backgroundImage = 'url("image/BG.jpg")';
    }else{
        console.log("light");
        convers.style.backgroundImage = 'url("image/BG2.webp")';
    }

    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});


// When searching for a chat
const chatSearch = document.querySelector(".chat-search");
const names = document.querySelectorAll(".chat-values .name");
const originalChats = document.querySelector(".chatts").innerHTML;
const chatList = document.querySelector(".chatts");

const empty = document.createElement("div");
empty.innerHTML="Chat not found";
empty.classList.add("empty");

let compares = 0;
chatSearch.addEventListener("keyup",(e)=>{
    const showNames = [];
    if(chatSearch.value){
        names.forEach(name=>{
            // capitalize to facilitate comparism
            const srch = chatSearch.value.toUpperCase();
            const nm = name.textContent.toUpperCase();

            // comprism
            if(nm.includes(srch)){
                showNames.push(name.parentNode.parentNode.parentNode);//add the 3rd parent element (list-item)
            }

            // increments after every comparism
            compares++;
        })

        //if it has finished comparing
        if(compares=>chats.length){
            chatList.innerHTML = "";
            showNames.forEach(showName=>{
                if(showName){
                    chatList.appendChild(showName);
                    showName.addEventListener("click", show);
                }

            })
            if(!chatList.innerHTML){
                chatList.appendChild(empty);
            }
        }

    //if search bar is empty
    }else{
        chatList.innerHTML = originalChats;
        chatList.childNodes.forEach(listItem=>{
            listItem.addEventListener("click", show);
            console.log(listItem.firstChild);
        });
    }
    document.querySelectorAll(".chat-img").forEach((chatImg)=>{
        chatImg.addEventListener("click",showModal);
    })
});



//when the search bar is cleared
chatSearch.addEventListener("search",(e)=>{
    chatList.innerHTML = originalChats;
    chatList.childNodes.forEach(listItem=>{
        listItem.addEventListener("click", show);
        console.log(listItem.firstChild);
    });
    document.querySelectorAll(".chat-img").forEach((chatImg)=>{
        chatImg.addEventListener("click",showModal);
    })
});


//When a chat is selected
const back = document.getElementsByClassName("back-chat");
let childClick = false;
const minSize = 830;

//Function that shows thechat container
function show(e){
    console.log(e.target.parentNode);
    let nm;
    if(e.target.parentNode.classList[0]=="chat-values"){
        nm = e.target.parentNode.querySelector(".name").textContent
    }else if(e.target.parentNode.classList[1]=="chatts"){
        nm = e.target.querySelector(".name").textContent;
    }else{
        nm = e.target.parentNode.parentNode.querySelector(".name").textContent;
    }

    if(!e.target.classList.contains("chat-img")){
        document.querySelector(".chat-container .prof-name").textContent = nm;
        if(!childClick){
            if(window.innerWidth<minSize){
                console.log("click");   
                convers.scrollTop = convers.scrollHeight;
                document.querySelector(".chat-container").classList.add("show-chat");
            }
        }
        childClick = false;
    }
}

document.querySelectorAll(".chat-values p").forEach((chatItem)=>{
    chatItem.addEventListener("click", show);
});

document.querySelectorAll(".chat-list .list-item").forEach((chatItem)=>{
    // convers.scrollTop = convers.scrollHeight;
    chatItem.addEventListener("click", show);
});




document.querySelector(".back-btn").addEventListener("click", ()=>{
        document.querySelector(".chat-container").classList.remove("show-chat");
        document.querySelector(".audio-recorder").classList.remove("visibleS");
});




//Activate / deactive send button while typing
const send = document.querySelector(".send-box");
const inputMsg = document.querySelector(".type-msg");
const media = document.querySelector(".media");


document.querySelector(".type-msg").addEventListener("keyup",checkInputValue);


function checkInputValue(){
    if(document.querySelector(".type-msg").value){
       send.classList.add("visibleS");
       media.classList.add("not-visible");
    }else{
        send.classList.remove("visibleS");
        media.classList.remove("not-visible");
    }
}

// Sedimg message
send.addEventListener("click",sendMsg);


//Message structure
{/* <div class="pos-r-msg">
        <div class="msg msg-2">
            <div class="tail"></div>
            <p>Lorem ipsum dolor sit😂. this is the message😉.
            </p>
            <span class="time">4:43pm</span>
        </div>
    </div> */}
function sendMsg(){
    const typedMsg = inputMsg.value;
    inputMsg.value = "";

    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const time = hours + ':' + minutes + ' ' + ampm;



    const msgContainer = document.createElement("div");
    msgContainer.classList.add("pos-r-msg");

    const msgBox = document.createElement("div");
    msgBox.classList.add("msg");
    msgBox.classList.add("msg-2");

    const tail = document.createElement("div");
    tail.classList.add("tail");

    const newMsg = document.createElement("p");
    newMsg.textContent = typedMsg;

    const timeBox = document.createElement("span");
    timeBox.classList.add("time");
    timeBox.textContent = time;
    
    msgBox.appendChild(tail);
    msgBox.appendChild(newMsg);
    msgBox.appendChild(timeBox);
    msgContainer.appendChild(msgBox);
    convers.appendChild(msgContainer);

    convers.scrollTop = convers.scrollHeight;

    send.classList.remove("visibleS");
    media.classList.remove("not-visible");
}



// CUSTOM AUDIO TAG EDIT

let k = 0;
const audio = [];
let playMin = 0;


function asignAudio(audioUrl,you){
    const newAudioMsg = document.createElement("div");
    newAudioMsg.classList.add("audio-msg");
    newAudioMsg.id=k;
    audio[k] = new Audio();
    const audioD = audio[k];

    newAudioMsg.innerHTML =`<div class="audio-person">
                                <img src="image/user.png" class="audio-img" alt="">
                                <i class="fa-solid fa-microphone "></i>
                            </div>
                            <div class="audio-player">
                                <div class="player">
                                    <i class="fa-solid fa-play"></i>
                                </div>
                                <div class="play-length">
                                    <div class="bar">
                                        <div class="fill">
                                        </div>
                                        <div class="hold"></div>
                                    </div>
                                    <span class="time audio-lth">0:00</span>
                                </div>
                                </div>`;
    
    const audioPlay = newAudioMsg.querySelector(".player");
    const playBar = newAudioMsg.querySelector(".bar");
    const fillBar = newAudioMsg.querySelector(".fill");
    const hold = newAudioMsg.querySelector(".hold");
    const audioLth = newAudioMsg.querySelector(".audio-lth");
    const i = audioPlay.querySelector("i");

    audioD.src = audioUrl;

    newAudioMsg.setAttribute("src",audioUrl);
    
    let dragP = false;
	
	playBar.addEventListener('mousedown', (event) => {

        if(!dragP){
            var rect = playBar.getBoundingClientRect(); 
            var x = event.clientX - rect.left; 
    
            var wS = window.getComputedStyle(playBar).width;
            var w = wS.split("p")[0];
            
            const pos = (x/w)*100;
            console.log("Cursor position: " + (pos));
    
            //Get spesific audio object
            const id = (playBar.parentElement.parentElement.parentElement.id);
            const audioID = audio[id];
    
            audioID.currentTime = (pos*audioID.duration)/100;

        }
        
        
    });

	hold.addEventListener(
		'mouseup', () => dragP = false);
		
	hold.addEventListener(
		'mousedown', () => dragP = true);

    hold.addEventListener(
        'mouseleave', () => dragP = false);
	
    
    hold.addEventListener(
        'mouseenter', () => dragP = false);
	
	hold.addEventListener('mousemove', (event) => {
        if(dragP){

            var rect = hold.parentElement.getBoundingClientRect(); 
            var x = event.clientX - rect.left; 
    
            var wS = window.getComputedStyle(hold.parentElement).width;
            var w = wS.split("p")[0];
            
            const pos = (x/w)*100;
            console.log("Cursor position: " + (pos));
    
            //Get spesific audio object
            const id = (hold.parentElement.parentElement.parentElement.parentElement.id);
            const audioID = audio[id];
    
            audioID.currentTime = (pos*audioID.duration)/100;
        }
    })

    var getDuration = function (_player,next) {
        _player.addEventListener("durationchange", function (e) {
            if (this.duration!=Infinity) {
               var duration = this.duration
               _player.remove();
               next(duration);
            };
        }, false);    
        _player.load();
        _player.currentTime = 24*60*60; //fake big time
        _player.volume = 0;
        _player.play();
        //waiting...
    };
    
    getDuration (audioD, function (duration) {
        console.log(duration);
    });
    
    i.addEventListener("click",()=>{
        const id = (i.parentElement.parentElement.parentElement.id);
        const audioID = audio[id];

        if(i.classList.contains("fa-play")){
            i.classList.remove("fa-play");
            i.classList.add("fa-pause");
            audioID.volume = 1;
            audioID.play();
        }else{
            i.classList.add("fa-play");
            i.classList.remove("fa-pause");
            audioID.pause();
        }
    })
    audioD.addEventListener("timeupdate",()=>{
        const position = audioD.currentTime / audioD.duration;
        fillBar.style.width = position * 100 + "%";

        //get current audio time
        const time = Math.floor(audioD.currentTime);
        
        audioLth.innerHTML = getTime(time);

    });

    audioD.addEventListener("ended",()=>{
        fillBar.style.width = 0;
        i.classList.add("fa-play");
        i.classList.remove("fa-pause");

        //get audio duration time
        const time = Math.floor(audioD.duration);

        audioLth.innerHTML = getTime(time);
    });
    k++;
    
    if(you){
        sendAudio(newAudioMsg);
    }
}

function sendAudio(newAudioMsg){
   

    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const time = hours + ':' + minutes + ' ' + ampm;



    const msgContainer = document.createElement("div");
    msgContainer.classList.add("pos-r-msg");

    const msgBox = document.createElement("div");
    msgBox.classList.add("msg");
    msgBox.classList.add("msg-2");

    const tail = document.createElement("div");
    tail.classList.add("tail");

    const newMsg = newAudioMsg;

    const timeBox = document.createElement("span");
    timeBox.classList.add("time");
    timeBox.textContent = time;
    
    msgBox.appendChild(tail);
    msgBox.appendChild(newMsg);
    msgBox.appendChild(timeBox);
    msgContainer.appendChild(msgBox);
    convers.appendChild(msgContainer);

    convers.scrollTop = convers.scrollHeight;
}

asignAudio("sound/wrong.mp3",true);

function getTime(sec){
    let min ;
    if(sec%60==0){
        min = sec/60;
    }else if(sec<60){
        min = 0;
    }else{
        min = (sec-60)/60;
    }

    sec = sec>60?sec%60:sec;

    return sec<10?(min+":0"+sec):(min+":"+sec);
}






//Activate / deactive microphone 
const recorderBox = document.querySelector(".audio-recorder");
const mic = document.querySelector(".mic");
const recTime = document.getElementById("rec-time");
// let chunks = [];


const recordButton = document.getElementById('recordButton');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let recorder, sendRec=false;

mic.addEventListener('click',() => {

        const mediaStream = navigator.mediaDevices.getUserMedia({ audio: true });
        
        mediaStream.then(stream =>{
            
            if (!recorder) {
                console.log(stream)
                const source = audioContext.createMediaStreamSource(stream);
                recorder = new MediaRecorder(stream);
            
                const chunks = []; 
                recorder.addEventListener('dataavailable', (event) => {
                    chunks.push(event.data);
                    console.log(recorder.state);
                });
          
                recorder.addEventListener('stop', () => {
                    recTime.innerText="0:00";
                    clearInterval(timing);
                    const blob = new Blob(chunks, { type: 'audio/mp3' });
                    // Do something with the audio blob, like upload it to a server
                    if(sendRec){
                        // const audio = document.createElement("audio");
                        const audioUrl = URL.createObjectURL(blob);
                        // audio.src = audioUrl;
                        // audio.controls = true;
                        // convers.appendChild(audio);
                        asignAudio(audioUrl,true);
                        convers.scrollTop = convers.scrollHeight;
                    }
                    recorder = null;
                });

                recorder.start();
                let time=0;
                let min=0;
                const timing = setInterval( async ()=>{
                    time++;
                    (time%60==0)?min++:min;
                    const sec = time%60;
                    // console.log(min+":"+sec);
                    recTime.innerText = getTime(time);
                    // sec<10?(min+":0"+sec):(min+":"+sec);
                },1000);
                recorderBox.classList.add("mic-visible");
            }
        })
});



document.querySelector(".trash").addEventListener("click", async ()=>{
    sendRec = false;
    recorder.stop();
    recorderBox.classList.remove("mic-visible");
});

document.querySelector(".send-rec").addEventListener("click", async ()=>{
    sendRec = true;
    recorder.stop();
    recorderBox.classList.remove("mic-visible");
});










//Click on chat image
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closen = document.querySelector(".modal-close");

function showModal(e){
    console.log(e.target.parentNode);
    let nm ;
    if(e.target.classList.contains("img-prof")){
        nm = e.target.parentNode.parentNode.querySelector(".name").textContent;
    }else{
        nm = e.target.parentNode.querySelector(".name").textContent
    }
    childClick=true;
    modal.querySelector(".modal-name").textContent = nm;
    modal.classList.add("active-modal");
    // document.querySelector(".prof-name").textContent = nm;
}

document.querySelectorAll(".chat-img").forEach((chatImg)=>{
    chatImg.addEventListener("click",showModal);
})

document.querySelector(".prof-detail").addEventListener("click",()=>{
    modal.classList.add("active-modal");
})

modal.addEventListener("click",(e)=>{
    if(!childClick){
        modal.classList.remove("active-modal");
    }
    childClick=false;
})

closen.addEventListener("click",(e)=>{
    childClick=true;
    modal.classList.remove("active-modal");
})

modalContent.addEventListener("click",(e)=>{
    childClick=true;
})


// call container
const callContainer = document.querySelector(".call-container");
const phones = document.querySelectorAll(".audio-call");
const vids = document.querySelectorAll(".video-call");
const closeCall = document.querySelector(".call-close");
const btns = document.querySelectorAll(".call-btns");

phones.forEach((phone)=>{
    phone.addEventListener("click",()=>{
        phones.forEach((phone2)=>phone2.classList.add("icon-active"));
        callContainer.classList.add("show-call");
    });
})

vids.forEach((vid)=>{
    vid.addEventListener("click",()=>{
        vids.forEach((vid2)=>vid2.classList.add("icon-active"));
        callContainer.classList.add("show-call");
    });
})

closeCall.addEventListener("click",()=>{
    callContainer.classList.remove("show-call");
});


btns.forEach((btn,index)=>{
    btn.addEventListener("click",()=>{
        if(btn.classList.contains("icon-active")){
            btn.classList.remove("icon-active");
        }else{
            btn.classList.add("icon-active");
        } 
    });
})



// SETTING

const settings = document.querySelector(".settings");
const backSetx = document.querySelector(".back-set");
const camera = document.querySelector(".camera");
const myImg = document.querySelector(".my-img");
const change_BG = document.querySelector(".change-background");
const chatBG = document.querySelector(".conversation");

document.querySelector(".logo").addEventListener("click",()=>{
    settings.classList.add("show-setting");
});
document.querySelector(".set-btn").addEventListener("click",()=>{
    settings.classList.add("show-setting");
});
backSetx.addEventListener("click",()=>{
    settings.classList.remove("show-setting")    
});

camera.addEventListener("click",()=>{
    document.getElementById("my-img").click();
})

change_BG.addEventListener("click",()=>{
    document.getElementById("change-background").click();
})

function display(event){
    if(event.target.files[0]){
        const image = URL.createObjectURL(event.target.files[0]);
        myImg.src = image;
    }
}

function changeBG(event){
    if(event.target.files[0]){
        const image = URL.createObjectURL(event.target.files[0]);
        chatBG.style.backgroundImage = 'url('+image+')';
        chatBG.style.backgroundRepeat = 'no-repeat';
        chatBG.style.backgroundSize = 'cover';
        console.log(chatBG.style.backgroundImage);
    }
}



// Upload button
const upload = document.querySelector(".upload");

window.addEventListener("load",()=>{
    convers.scrollTop = convers.scrollHeight;
});


    
convers.scrollTop = convers.scrollHeight;