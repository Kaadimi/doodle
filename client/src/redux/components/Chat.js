import React, { useState, useRef, useEffect } from 'react'
import '../styles/sideContainers.css'

function Chat() {
    const el = useRef(null)

    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    })
    const messages = [
        {name: 'ilias', message: 'Banan'},
        {name: 'ilias', message: 'Banan'},
        {name: 'ilias', message: 'Banan'},
        {name: 'ilias', message: 'Banan'},
        {name: 'ilias', message: 'Banan'},
        {name: 'ilias', message: 'Banan'},
        {name: 'ilias', message: 'Banan'}
    ]
    const [message, setMessage] = useState('')

    return (
        <div className="chatLog">
        {messages.map((message, index) => (
            <div key={index} className='messageContainer'>
                <p className="myMessageName messageName">{message.name}</p>
                <p className="messageText">{message.message}</p>
            </div>
        ))}
        <div id={'el'} ref={el}>
            <form className="chatForm">
                <input
                className="chatInput"
                type="text"
                placeholder="Type a message..."
                value={message}
                maxLength={40}
                onChange={(event) => setMessage(event.target.value)}
                // onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button
                className="sendButton"
                // onClick={(event) =>  sendMessage(event)}
                >SEND</button>
            </form>
        </div>
    </div>
    )
}

export default Chat
