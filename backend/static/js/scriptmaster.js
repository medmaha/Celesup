let btn = document.querySelector('#mobilMenu')
let sidenav = document.querySelector('#sidenav')
let dropdownTrigger = document.querySelector('.navbar--profile .profile')
let dropdownContent = document.querySelector('.navbar--profile #dropdown')
let isDropdown = false

document.addEventListener('click', closeUnusedtabs)

btn.addEventListener('click', () => {
    btn.classList.toggle('is--active')
    sidenav.classList.toggle('active')
})

dropdownTrigger.addEventListener('click', () => {
    dropdownContent.classList.toggle('active')
    isDropdown = false
})

// close dropdown tags if unattended
function closeUnusedtabs(event) {
    let dropdownTrigger = document.querySelector('.navbar--profile')

    if (event.target !== dropdownTrigger && isDropdown) {
        if (dropdownContent.classList.contains('active')) {
            console.log('removed');
            dropdownContent.classList.remove('active')
            isDropdown = false
        }
    } else if (event.target !== dropdownTrigger) {
        isDropdown = true
    }
}


// ======================================

let creatPost = document.querySelector('#addPost');
let postForm = document.querySelector('.post--form');
let activities = document.querySelector('#activities');

creatPost.addEventListener('click', () => {
    postForm.classList.toggle('active');
    console.log(activities)
    if (activities.style.display === 'none') {
        activities.style.display = 'block';

        creatPost.style.letterSpacing = '1px';
        creatPost.innerHTML = 'Create Post'
    } else {
        activities.style.display = 'none';
        creatPost.innerHTML = 'Cancel'
        creatPost.style.letterSpacing = '2px';
    }
})


// ===================================================

let chatButton = document.querySelector('#chat')
let chatWrapper = document.querySelector('#chat-wrapper ')
const chatsList = []
let miniChatWrapper = document.querySelector('#mini-chat .wrapper')
let miniChatActivator = document.querySelector('#mini-chat')



// chatButton.addEventListener('clicks', () => {
//     let chat = document.createElement('div')
//     chat.classList.add('chat-window')
//     chat.innerHTML = chatsList.length
//     chatsList.push(chat)

//     // Adds mini Chat fields
//     function isMiniChat(value) {
//         let miniChat = document.createElement('div')

//         miniChat.classList.add('chat')
//         miniChat.innerHTML = value

//         if (miniChatWrapper.children.length === 8) return

//         miniChatActivator.style.display = 'flex'
//         miniChatWrapper.appendChild(miniChat)
//     }


//     // append three nodes into ChatWrapper
//     for (let i = 0; i < chatsList.length; i++) {
//         if (i >= 3) return isMiniChat(chatsList.length)
//         else {
//             const node = chatsList[i];
//             chatWrapper.appendChild(node)
//         }
//     }
// })

chatButton.addEventListener('click', () => {

    if (document.getElementById('messenger').style.display === '' || document.getElementById('messenger').style.display === 'none') {
        document.getElementById('right').style.display = 'none'
        let a = document.getElementById('messenger').style.display = 'block';
    } else {
        document.getElementById('right').style.display = 'block'
        document.getElementById('messenger').style.display = 'none'
    }
})


let = count = 0

function selectMiniChat(value) {
    let subtitube = chatWrapper.children.item(count).innerHTML
    chatWrapper.children.item(count).innerHTML = value

    count++
    if (count === 3) count = 0
    return subtitube
}

miniChatWrapper.addEventListener('click', (event) => {
    let main = event.currentTarget
    let target = event.target
    document.querySelectorAll('#mini-chat .wrapper .chat').forEach(chat => {
        if (chat === target) {
            let subtitute = selectMiniChat(chat.innerHTML)
            // main.removeChild(target)
            chat.innerHTML = subtitute
        }
    })
})