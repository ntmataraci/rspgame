import { useDispatch, useSelector } from "react-redux";
import { newGame } from "../store/slice";
const NewGame = () => {
const dispatch=useDispatch()
    const newGameHandler=()=>{
dispatch(newGame())
    }

    const winner=useSelector((state)=>state.gameSliceReducer.endGame)
let winnerPhoto=""
if(winner){
if(winner==="Player1"){
 winnerPhoto=useSelector((state)=>state.gameSliceReducer.player1Photo)
}else if(winner==="Player2"){
winnerPhoto=useSelector((state)=>state.gameSliceReducer.player2Photo) 
}
}



  return (
    <div className="m-auto text-cyan-200 font-bold max-w-[100px] ">
    <div className="mb-5">  {winner} is winner !</div>
    <img src={winnerPhoto}/>
    <div
      className="border-2 border-white border-solid rounded-xl p-5  cursor-pointer"
      onClick={newGameHandler}
    >
      Play Again
    </div>
    </div>
  );
};

export default NewGame;
