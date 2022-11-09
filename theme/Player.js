import { useRef } from "react"
import {BsFillHandThumbsUpFill} from "react-icons/bs"
import {FaRegHandRock,FaRegHandScissors,FaRegHandPaper} from "react-icons/fa"
import { useDispatch,useSelector } from "react-redux"
import { choice1, choice2,gameCondition, player1PhotoUpdate,multiCondition } from "../store/slice"
const Player = ({type}) => {
    const buttonStyle="border-2 border-white border-double p-2 cursor-pointer"
const dispatch=useDispatch()

const selectionHandler=(selection)=> {
dispatch(choice1(selection))
dispatch(gameCondition())
setTimeout(()=>{
    dispatch(choice1(""))
    dispatch(choice2(""))
},750)
    }

const playerScore=useSelector((state)=>state.gameSliceReducer.player1)
const player1Choice=useSelector((state)=>state.gameSliceReducer.player1choice)
const player1Photo=useSelector((state)=>state.gameSliceReducer.player1Photo)
    

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
const imgHandler = () => {
    dispatch(player1PhotoUpdate(imgRef.current.value))
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
            <div className="text-2xl ">Player1</div>
       <div> Photo Url : <input type="text" ref={imgRef} /> <button className="border-2 border-white" onClick={imgHandler}>Load</button></div>
       </div>
        </div>
       
       
        </div>
    )
}

export default Player