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
    
    if(document.body.classList&&document.body.classList.contains("darkTheme")){
        convers.style.backgroundImage = 'url("image/BG2.webp")';
    }else{
        convers.style.backgroundImage = 'url("image/BG.jpg")';
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

    if(document.body.classList&&document.body.classList.contains("darkTheme")){
        convers.style.backgroundImage = 'url("image/BG2.webp")';
    }else{
        convers.style.backgroundImage = 'url("image/BG.jpg")';
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
    let nm
    if(e.target.parentNode.classList[0]=="chat-values"){
        nm = e.target.querySelector(".name").textContent
    }else if(e.target.parentNode.classList[1]=="chatts"){
        nm = e.target.querySelector(".name").textContent;
    }


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

document.querySelectorAll(".chat-values p").forEach((chatItem)=>{
    chatItem.addEventListener("click", show);
});

document.querySelectorAll(".chat-list .list-item").forEach((chatItem)=>{
    chatItem.addEventListener("click", show);
});




document.querySelector(".back-btn").addEventListener("click", ()=>{
        document.querySelector(".chat-container").classList.remove("show-chat");
        document.querySelector(".audio-recorder").classList.remove("visibleS");
});




//Activate / deactive send button while typing
const send = document.querySelector(".send");
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

//Activate / deactive microphone 
const recorder = document.querySelector(".audio-recorder");
const mic = document.querySelector(".mic");

document.querySelector(".mic").addEventListener("click",()=>{
    recorder.classList.add("visibleS");
});

document.querySelector(".trash").addEventListener("click",()=>{
    recorder.classList.remove("visibleS");
});

document.querySelector(".send-rec").addEventListener("click",()=>{
    recorder.classList.remove("visibleS");
});



//Click on chat image
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closen = document.querySelector(".modal-close");

function showModal(e){
    const nm = e.target.nextElementSibling.querySelector(".name").textContent;
    childClick=true;
    modal.querySelector(".modal-name").textContent = nm;
    modal.classList.add("active-modal");
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

// Sedimg message

// document.querySelector(".send").addEventListener("click",sendMsg);
// function sendMsg(e){
//     console.log(e);
// }
    
convers.scrollTop = convers.scrollHeight;