import { useRef,useEffect,useState  } from "react"
import {BsFillHandThumbsUpFill} from "react-icons/bs"
import {FaRegHandRock,FaRegHandScissors,FaRegHandPaper} from "react-icons/fa"
import { useDispatch,useSelector} from "react-redux"
import { choice1, choice2,player1PhotoUpdate,multiCondition,player2PhotoUpdate } from "../../store/slice"
import io from 'socket.io-client'
import ChatBox from "./ChatBox"
const socket=io()
const FirstPlayer = ({myId,roomId,data}) => {
const buttonStyle="border-2 border-white border-double p-2 cursor-pointer"
const dispatch=useDispatch()
const imgRef=useRef()


const [playerNo,setPlayerNo]=useState()

const selectionHandler= async (selection)=> {
  socket.emit("firstplayerMove", roomId,myId,selection)

    }

const playerScore=useSelector((state)=>state.gameSliceReducer.player1)
const player1Choice=useSelector((state)=>state.gameSliceReducer.player1choice)
const player2Choice=useSelector((state)=>state.gameSliceReducer.player2choice)
const player1Photo=useSelector((state)=>state.gameSliceReducer.player1Photo)
    

const [playerName,setPlayerName]=useState("")

useEffect(() => {socketInitializer()

}, [data,myId])
const socketInitializer = async () => {
  socket.on('connect', () => {
    console.log('connected')
  }
  )
    if(data&&data.player1Id===myId){
      setPlayerNo("1")
     }else{
      setPlayerNo("2")
     }
}

useEffect(()=>{ 
  socket.connect("./api/socketserver")
  socket.on("dataResults",data=>{
    console.log(data)
    if(player1Choice===""&&player2Choice===""){
    if(data.player1Choice!==""&&data.player2Choice!==""){
    if(playerNo==="1"){
      dispatch(choice1(data.player1Choice))
      dispatch(choice2(data.player2Choice))
    }
    if(playerNo==="2"){
      dispatch(choice1(data.player2Choice))
      dispatch(choice2(data.player1Choice))
    }
      socket.emit("oppMove",data)
      setTimeout(()=>{
        dispatch(multiCondition())
    dispatch(choice1(""))
    dispatch(choice2(""))
  socket.emit("removeMoves",roomId)
},1750)
}
    }
  })
  return () => {
    socket.off('dataResults');
  }
},[roomId,playerNo,player1Choice,player2Choice])



useEffect(()=>{
  socket.connect("./api/socketserver")
  socket.on("photoDownload",(p1photo,p2photo)=>{
    if(playerNo==="1"){
    dispatch(player2PhotoUpdate(p2photo))
    }
    if(playerNo==="2"){
    dispatch(player2PhotoUpdate(p1photo))
    }
    socket.emit("photoUpload",roomId,imgRef.current.value,playerNo)
  })
 
  return () => {
    socket.off('photoDownload');
  }
},[playerNo])



const playerMove=
<div className="flex justify-center">
{player1Choice === "Rock" && (
    <FaRegHandRock className="text-4xl mb-[20px] " />
  )}
  {player1Choice === "Scissor" && (
    <FaRegHandScissors className="text-4xl mb-[20px]" />
  )}
  {player1Choice === "Paper" && (
    <FaRegHandPaper className="text-4xl mb-[20px]" />
  )}
</div>



const imgHandler = () => {
    dispatch(player1PhotoUpdate(imgRef.current.value))
    socket.emit("photoUpload",roomId,imgRef.current.value,playerNo)
}
    return(
        <div className="flex flex-col p-10 max-w-[550px] m-auto text-cyan-200">
            {player1Choice===""&&
        <div className="flex justify-center"><BsFillHandThumbsUpFill className="text-4xl animate-bounce"/></div>
        }
        {playerMove}
        <div className="flex justify-center gap-5 text-[50px] mt-5" style={{visibility:player1Choice===""?"visible":"hidden"}}>
         <FaRegHandRock className={buttonStyle} onClick={()=>selectionHandler("Rock")}/>
         <FaRegHandScissors className={buttonStyle} onClick={()=>selectionHandler("Scissor")}/>
         <FaRegHandPaper className={buttonStyle} onClick={()=>selectionHandler("Paper")}/>
        </div>

        <div className="text-right text-2xl">{playerScore}</div>
        <div className="flex flex-start gap-10 items-center">
           <img src={player1Photo} className="border-2 border-solid border-black max-w-[100px] max-h-[300px]"></img>
           <div className="flex flex-col">
            <div className="text-2xl ">Player:{playerNo}</div>
       <div> Photo Url : <input type="text" ref={imgRef} /> <button className="border-2 border-white" onClick={imgHandler}>Load</button></div>
       </div>
        </div>
       <div>RoomId : {roomId}</div>
       <ChatBox roomId={roomId} playerNo={playerNo}/>
        </div>
    )
}

export default FirstPlayer
