const main = document.querySelector("main")
const input = document.getElementById('chatInput')
const button = document.querySelector("button")

let currentNick = null
function addMessage(message, nick, time) {
    main.innerHTML += `
        <div class="mensagem ${currentNick == nick ? "owner" : " "}">
            <div class="content">${message}</div>
            <div class="nick">${nick}</div>
            <div class="time">${time}</div>
        </div>
    `
    main.scrollTop = main.scrollHeight
}

const ws = new WebSocket("ws://192.168.120.53:4000")

ws.addEventListener("open", () => console.log("Conectado"))
ws.addEventListener("close", () => console.log("Desconectado"))

ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data)
    addMessage(data.message, data.nick, data.time)
})

button.addEventListener("click", () => {
    sendMessage()
})

function sendMessage() {
    const messageText = input.value.trim()

    if (messageText === "") {
        alert("Por favor, digite uma mensagem.")
        return
    }

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    addMessage(messageText, currentNick, currentTime)
    ws.send(JSON.stringify({ message: messageText, nick: currentNick }))
    input.value = ''
    input.focus()
}

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage()
    }
})