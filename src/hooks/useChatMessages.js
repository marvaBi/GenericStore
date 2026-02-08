import React from 'react';

const BOT_MESSAGES = [
    "Hi, how can I help you?",
    "Ok I am sorry to hear that",
    "Let me check what can I do for you",
    "Have a good day!"
]

export function useChatMessages() {
    const botIndexRef = React.useRef(0);

    function buildMessageObject(isSentByUser, content = "") {
        let timestamp = new Date();
        return {
            content: isSentByUser ? content : BOT_MESSAGES[botIndexRef.current % BOT_MESSAGES.length],
            isSentByUser: isSentByUser,
            time: timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false }),
            key: "message" + timestamp.getTime()
        }
    }

    function sendMessage(message) {
        let userMessage = buildMessageObject(true, message);
        setMessagesList(prev => [...prev, userMessage]);
        botIndexRef.current++;
        let botMessage = buildMessageObject(false);

        setTimeout(() => {
            setMessagesList(prev => [...prev, botMessage]);
        }, 500);
    }

    function resetMessagesList() {
        botIndexRef.current = 0;
        setMessagesList([buildMessageObject(false)]);
    }

    const [messagesList, setMessagesList] = React.useState([]);

    return { messagesList, sendMessage, resetMessagesList };
}