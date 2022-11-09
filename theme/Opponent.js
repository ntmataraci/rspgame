import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { choice1, choice2, score } from "../store/slice";
import {
  FaRegHandRock,
  FaRegHandScissors,
  FaRegHandPaper,
} from "react-icons/fa";

const Opponent = () => {
  const OppenentScore = useSelector((state) => state.gameSliceReducer.player2);
  const OppenentSelection = useSelector(
    (state) => state.gameSliceReducer.player2choice
  );

  return (
    <div className="flex flex-col p-10 max-w-[550px] m-auto text-cyan-200">
      <div className="flex flex-start gap-10 items-center">
        <img
          src="/vercel.svg"
          className="w-1/6 border-2 border-solid border-black max-w-[100px] max-h-[300px]"
        ></img>
        <div className="text-2xl ">CPU</div>
      </div>
      <div className="text-right text-2xl">{OppenentScore}</div>
      {OppenentSelection===""&&
      <div className="flex justify-center mb-5">
        <BsFillHandThumbsUpFill className="text-4xl animate-bounce" />
      </div>
}

      <div className="flex justify-center">
        {OppenentSelection === "Rock" && (
          <FaRegHandRock className="text-4xl " />
        )}
        {OppenentSelection === "Scissor" && (
          <FaRegHandScissors className="text-4xl" />
        )}
        {OppenentSelection === "Paper" && (
          <FaRegHandPaper className="text-4xl " />
        )}
      </div>
    </div>
  );
};

export default Opponent;
