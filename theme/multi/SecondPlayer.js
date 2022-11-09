import { useEffect, useRef,useState } from "react"
import {BsFillHandThumbsUpFill} from "react-icons/bs"
import {FaRegHandRock,FaRegHandScissors,FaRegHandPaper} from "react-icons/fa"
import { useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { io } from "socket.io-client"
const SecondPlayer = ({entered}) => {

const [enteredHandler,setEnteredHandler]=useState(false)

const playerScore=useSelector((state)=>state.gameSliceReducer.player2)
const player1Choice=useSelector((state)=>state.gameSliceReducer.player2choice)
const player1Photo=useSelector((state)=>state.gameSliceReducer.player2Photo)
    
useEffect(()=>setEnteredHandler(entered),[entered])



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


const imgRef=useRef()

    return(
        <div className="flex flex-col p-10 max-w-[550px] m-auto text-cyan-200">
                   <div className="flex flex-start gap-10 items-center">
           <img src={player1Photo} className="border-2 border-solid border-black max-w-[100px] max-h-[300px]"></img>
           <div className="flex flex-col">
            <div className="text-2xl ">
              {!enteredHandler&&"Waiting Opponent..."}
              {enteredHandler&&"Rival"}
              </div>
</div>
        </div>
            {player1Choice===""&&
        <div className="flex justify-center"><BsFillHandThumbsUpFill className="text-4xl animate-bounce"/></div>
        }
        {playerMove}
    

        <div className="text-right text-2xl">{playerScore}</div>
 
       
       
        </div>
    )
}

export default SecondPlayer