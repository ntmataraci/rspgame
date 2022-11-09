const arrList= ["Rock","Scissor","Paper"]

export const randomChoice= ()=> {
    let randFloor=Math.floor(Math.random()*3)
    return arrList[randFloor]
    
}