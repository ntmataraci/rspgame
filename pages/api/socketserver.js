import { Server } from 'socket.io'
let msgBox={}
let gameRooms=[
{roomId:"",
player1Id:"",
player2Id:"",
player1Choice:"",
player2Choice:"",
player1Photo:"",
player2Photo:"",
chatBox:""
}]





const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    
        io.on("connection",socket=>{
          
          socket.on("gameEntered",id=>{
            socket.join(id)
            const roomExist=gameRooms.findIndex(item=>item.roomId===id)
            if (roomExist<0){
            gameRooms[gameRooms.length]={roomId:id,player1Id:socket.id,player2Id:"",player1Choice:"",player2Choice:"",player1Photo:"",player2Photo:"",chatBox:""}
            }else if( gameRooms[roomExist].player2Id===""){
            gameRooms[roomExist].player2Id=socket.id
            }
            socket.to(id).emit("gameRoom",gameRooms[roomExist])
          })
          socket.on("firstplayerMove",(roomId,myId,selection)=>{
            socket.join(roomId)
            const roomExist=gameRooms.findIndex(item=>item.roomId===roomId)
            if(gameRooms[roomExist].player1Id===myId){
              gameRooms[roomExist].player1Choice=selection
            }else{
              gameRooms[roomExist].player2Choice=selection
            }
            // if( gameRooms[roomExist].player2Choice!==""&& gameRooms[roomExist].player1Choice!==""){
            socket.to(roomId).emit("dataResults",gameRooms[roomExist])
            // }
            socket.once("oppMove",()=>{
              socket.to(roomId).emit("dataResults",gameRooms[roomExist])
              console.log("i work")
            })
            }
            )
       

         socket.on("removeMoves",(roomId)=>{
          socket.join(roomId)
          const roomExist=gameRooms.findIndex(item=>item.roomId===roomId)
          gameRooms[roomExist].player1Choice=""
          gameRooms[roomExist].player2Choice=""
         })
       
        socket.on('input-change',(id,msg)=>{
            socket.join(id)
        })

        socket.on("photoUpload",(roomId,img,player)=>{
          socket.join(roomId)
          const roomExist=gameRooms.findIndex(item=>item.roomId===roomId)
          if(player==="1"){
            gameRooms[roomExist].player1Photo=img
          }
          if(player==="2"){
            gameRooms[roomExist].player2Photo=img
          }
          socket.to(roomId).emit("photoDownload",gameRooms[roomExist].player1Photo,gameRooms[roomExist].player2Photo)
     
        })
      
        socket.on("chatRead",(roomId,text)=>{
          socket.join(roomId)
          const roomExist=gameRooms.findIndex(item=>item.roomId===roomId)
         
          if(text!==""){gameRooms[roomExist].chatBox=text}
            console.log(text)
          socket.to(roomId).emit("chatUpload",text)
        
        })

    })
  }
  res.end()
}

export default SocketHandler
