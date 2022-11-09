import { randomChoice } from "../game/singleAi";
import { winnerCondition } from "../game/rules";

import { createSlice } from "@reduxjs/toolkit";
const initialState={
    player1:0,
    player2:0,
    player1choice:"",
    player2choice:"",
    endGame:"",
    player1Photo:"/vercel.svg",
    player2Photo:"/vercel.svg"
}





export const gameSlice=createSlice({
    name:"game",
    initialState,
    reducers:{
        choice1:(state,action)=>{
            state.player1choice=action.payload
        },
        choice2:(state,action)=>{
           state.player2choice=action.payload
        },
        gameCondition:(state)=>{
            state.player2choice=randomChoice()
            const condition= winnerCondition(state.player1choice,state.player2choice)
            if (condition==="player1win"){
                state.player1+=1
            }
            if (condition==="player2win"){
                state.player2+=1
            } 
            if (state.player1===3||state.player2===3){
                if(state.player1>state.player2){state.endGame="Player1"}
                if(state.player2>state.player1){state.endGame="Player2"}
            }        
        },
        multiCondition:(state)=>{
            const condition= winnerCondition(state.player1choice,state.player2choice)
            if (condition==="player1win"){
                state.player1+=1
            }
            if (condition==="player2win"){
                state.player2+=1
            } 
            if (state.player1===3||state.player2===3){
                if(state.player1>state.player2){state.endGame="Player1"}
                if(state.player2>state.player1){state.endGame="Player2"}
            }      
        },
        newGame:(state)=>{
            state.player1=0,
            state.player2=0,
            state.player1choice="",
            state.player2choice="",
            state.endGame=""
        },
        player1PhotoUpdate:(state,action)=>{
            state.player1Photo=action.payload
        },
        player2PhotoUpdate:(state,action)=>{
            state.player2Photo=action.payload
        }
    }
})

export const {score,choice1,choice2,gameCondition,newGame,player1PhotoUpdate,multiCondition,player2PhotoUpdate}=gameSlice.actions
export default gameSlice.reducer