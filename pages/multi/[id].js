import { useRouter } from 'next/router'
import { useEffect,useRef,useState } from 'react'
import Screen from "../../theme/Screen"
import io from 'socket.io-client'
let socket
const RoomId= () => {
    const router = useRouter()
    const {id}=router.query
    useEffect(() => {socketInitializer()}, [id])
  const [data,setData]=useState()
  const [myId,setMyId]=useState()
  const [entered,setEntered]=useState(false)
  
    const socketInitializer = async () => {
        if(id){
        await fetch('/api/socketserver')
        socket = io()
        socket.on('connect', () => {
          console.log('connected')
        })
  
        socket.on("gameRoom",data=>{
          console.log(data)
          setData(data)
          setMyId(socket.id)
          if(data.player2Id!==""){
            setEntered(true)
          }
        })

        socket.once("gameRoom",data=>{
          socket.emit("gameEntered",id)
        })

        socket.emit("gameEntered",id)
        socket.on('update-input', msg => {
            setMessages(msg)
           })

      }
    }



      const [messages,setMessages]=useState("")
    return(
        <>
 <div>
    {messages&&messages.map((item,idx)=>
    <div className='flex' key={idx}>
        <div>{item.name}</div>
        <div>{item.msg}</div>
        </div>
        )}
 </div>
 <Screen type={"multi"} myId={myId} roomId={id} data={data} entered={entered}/>
        </>
    )
}
export default RoomId