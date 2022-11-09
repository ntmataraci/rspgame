import { useEffect,useRef,useState } from 'react'
import io from 'socket.io-client'
let socket

const Multi = () => {
  useEffect(() => {socketInitializer()}, [])
    const [messages,setMessages]=useState("")
  const socketInitializer = async () => {
    await fetch('/api/socketserver')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('update-input', msg => {
       setMessages(msg)
      })
  }

  const onChangeHandler = () => {
    socket.emit('input-change', {name:nameRef.current.value,msg:inputRef.current.value})
  }
  const inputRef=useRef()
  const nameRef=useRef()
  return(
    <>
    <input
    placeholder="Type something"
    ref={inputRef}
  />
  <input type="text" placeholder="yourname" ref={nameRef}/>
  <button onClick={onChangeHandler}>Send</button>
 
 <div>
    {messages&&messages.map((item,idx)=>
    <div className='flex' key={idx}>
        <div>{item.name}</div>
        <div>{item.msg}</div>
        </div>
        )}
 </div>
  </>
  )
}

export default Multi;
