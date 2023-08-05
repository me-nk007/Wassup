const socket = io()
let name;

let textarea = document.querySelector('#textarea')
let send = document.querySelector('#send')
let messageArea = document.querySelector('.message__area')
let brand = document.querySelector('.brand')
let notification = document.querySelector('.notification')

// Giving a prompt until user gives his username
do{
   name =  prompt("Please enter your name : ")
} while(!name)


let brandName = document.createElement('h1')


// Creating a schema
let markup = `
<h1>${name}</h1>
`

// Inserting markup into mainDiv
brandName.innerHTML = markup


// Appending mainDiv into messageArea
brand.appendChild(brandName)


// Sending a message
// If we press any button in keyboard, then "keyup" event will be triggered
textarea.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        if (e.target.value === '') {
            alert('Please Enter a value');
        } 
        else {
            sendMessage(e.target.value);
        } 
        e.preventDefault();

    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message
    }
    // Append
    appendMessage(msg, 'outgoing')

    // Send to server via websocket connection
    socket.emit('message', msg)



    textarea.value = ""
    scrollToBottom()
}




function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    
    // Creating a schema
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    
    // Inserting markup into mainDiv
    mainDiv.innerHTML = markup


    // Appending mainDiv into messageArea
    messageArea.appendChild(mainDiv)

}


// Adding Send Button
send.addEventListener('click', (e)=>{
    if (textarea.value === '') {
        alert('Please Enter a value');
    } 
    else {
        sendMessage(textarea.value);
    } 
})



// Receiving the message in client which will only run on browser not on server that is in console of Brave browser
    socket.on('message',(msg)=>{
        // console.log(msg)

        // Inserting received message into DOM
        appendMessage(msg, 'incoming')

        // Playing the messenger ring
        var audio = document.createElement('audio');
        audio.setAttribute('src','dong.mp3');
        audio.loop = false;
        audio.play();  
        
        // Adding Notification
        // let brandName = document.createElement('title')
        // let notificationMarkup = `<title>(1)${msg.message}</title>`
        // brandName.innerHTML = notificationMarkup
        scrollToBottom()
    })

    function scrollToBottom(){
        messageArea.scrollTop = messageArea.scrollHeight
    }



    // TODO
    // 1) ADD NOTICATIONS
    // 2) ADD IMAGES
    // 3) ADD GROUP FEATURES
    // 4) END TO END ENCRYPTION