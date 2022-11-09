import Opponent from "./Opponent"
import Player from "./Player"
import SecondPlayer from "./multi/SecondPlayer"
import FirstPlayer from "./multi/FirstPlayer"
import { useSelector } from "react-redux"
import NewGame from "../game/NewGame"
import { useEffect } from "react"
const Screen = ({type,myId,roomId,data,entered}) => {
    const endGame=useSelector((state)=>state.gameSliceReducer.endGame)
 return(
<div className=" w-[100%] h-[100%] bg-sky-600">
{endGame!==""&&
<div className="pt-[100px]">
<NewGame/>
</div>
}
{endGame===""&&
<>
{type==="single"&&<><Opponent/><Player/></>}
{type==="multi"&&<><SecondPlayer  entered={entered}/><FirstPlayer myId={myId} roomId={roomId} data={data}/></>}
</>
}
</div>
    )
}

export default Screen