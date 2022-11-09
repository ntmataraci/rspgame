import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
const socket=io()
const ChatBox = ({roomId,playerNo}) => {
const [chatHistory,setChatHistory]=useState([])
const [chatHandler,setChatHandler]=useState("")
const addingChat =(e)=>{
if(chatHandler.length>1){
setChatHistory((prev)=>["P"+playerNo+":"+chatHandler,...prev])
setChatHandler("")
socket.emit("chatRead",roomId,chatHandler)
}
}

useEffect(()=>{
    socket.emit("chatRead",roomId,"")
    socket.connect("./api/socketserver")
    socket.on("chatUpload",text=>{
        console.log("am i work")
        if(text===""){setChatHistory([])}
        if(text!==""){
        if(playerNo==="1"){
        setChatHistory((prev)=>["P2:"+text,...prev])
        }
        if(playerNo==="2"){
        setChatHistory((prev)=>["P1:"+text,...prev])
        }
        }
    })
    return () => {
        socket.off('chatUpload');
      }
},[roomId,playerNo])
    return(
        <div className="text-black m-auto w-[300px] h-[90px] mt-[5px]">
         <div className="w-[100%] bg-white h-[100%] overflow-auto">
            {chatHistory.length>0&&chatHistory.map((item,idx)=>
            <p key={idx}>{item}</p>
        )}
         </div>
         <div>
            <input type="text" className="border-2 border-solid border-black" onChange={(e)=>setChatHandler(e.target.value)} value={chatHandler}/>
         <button className="border-black border-1 border-solid" onClick={addingChat}>Send</button>
        </div>   
        </div>
    )
}

export default ChatBox