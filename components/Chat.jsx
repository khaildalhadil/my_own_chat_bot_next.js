'use client'

import { streamReader } from "openai-edge-stream";
import { useEffect, useState } from "react";
import Message from "./Message/Message";
import Loadding from "./Loadding";

export default function Chat() {

  const [incomingMesssage, setIncomingMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const [newChatMessages, setNewChatMessages] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [isLoading, seIsLoading] = useState(false);

  async function handelSendMessage(e) {
    
    setMessageText("")
    seIsLoading(true)

    e.preventDefault();

    setAllMessage(prev => {
      const newChatMessage = [...prev, {
      _id: Math.random(),
      role: "user",
      content: messageText,
      }]

    return newChatMessage
    })

    setNewChatMessages(prev => {

      const newChatMessage = [...prev, {
        _id: Math.random(),
        role: "user",
        content: messageText,
      }]

      return newChatMessage
    })

    const res = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({message: messageText})
    })
    const responseData = res.body;

    if (!responseData) {
      console.log("no data 🚫🚫")
      console.log(responseData)
      return;
    }

    const reader = responseData.getReader();
    let messageFromAi = ''
    await streamReader(reader, async (message) => {
      setIncomingMessage(m => `${m}${message.content}`)
      messageFromAi += message.content
    })
    addNowIncomingMessage(messageFromAi)
    
    seIsLoading(false)
    setIncomingMessage("")
  }

  function addNowIncomingMessage(messageAi) {

    setAllMessage(prev => {
      const newChatMessage = [...prev, {
      _id: Math.random(),
      role: "ai",
      content: messageAi,
      }]

    return newChatMessage
    })

  }

  return (
    <div className="z-10 absolute flex flex-col justify-between h-screen" >

      {/* {incomingMesssage && <div></div>} */}
      <div className={` p-10 flex-1 justify-items-end overflow-y-scroll poem`}>
        {allMessage.map((message)=> <Message key={message._id} content={message} />)}
        {isLoading && <Loadding incomingMesssage={incomingMesssage} />}
        
        {/* {newChatMessages.map((message) => <Message key={message._id} content={message} />)}
        {incomingMesssage && <Message key={Math.random()} content={{role: 'ai', content: incomingMesssage}} />} */}
      </div>

      <form onSubmit={handelSendMessage} className="flex flex-col w-screen  ">
        <div className="flex w-screen">
          <textarea 
            value={messageText}
            disabled={isLoading}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={` ${isLoading ?"ai sending now " : "Send a message..."} `}
            className={` w-full resize-none rounded-full text-xl bg-[#303030] pt-5 pl-7 text-white m-4 focus:outline ${isLoading? 'cursor-not-allowed': 'cursor-text'} text-end pr-5`} 
          />
          <button disabled={isLoading} className={` border border-green-700 bg-green-600 px-6 font-bold text-white rounded-full my-4 mr-4 ${isLoading? 'cursor-not-allowed': 'cursor-pointer'}`}>Send</button>
        </div>
        <p className="text-gray-400 p-2 text-center text-sm">Make by khalid abdullah alhadi 🥳</p>
      </form>

    </div>
  )
}
