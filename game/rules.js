
export const winnerCondition = (player1,player2) => {
if(player1==="Rock"&&player2==="Scissor"){
    return "player1win"
}else if(player1==="Paper"&&player2==="Rock"){
    return "player1win"
}else if(player1==="Scissor"&&player2==="Paper"){
    return "player1win"
}else if(player1===player2){
    return "draw"
}else{
    return "player2win"
}

}