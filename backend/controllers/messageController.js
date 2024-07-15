import { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/messageModel.js"
import { getRecieverId } from "../webSocket/socket.js"
import { io } from "../webSocket/socket.js"

export const sendMessage = async (req,res)=>{
    try {
        const senderid = req.id
        const receiverid = req.params.id
        const {message} = req.body
        
        let gotConversation = await Conversation.findOne({
            participants : {$all : [senderid,receiverid]}
        })

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants : [senderid, receiverid]
            })
        }

        const newMessage = await Message.create({
            message, senderId: senderid, receiverId: receiverid
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id)
        }

        await Promise.all([gotConversation.save(), newMessage.save()]);

        //SOCKET IO
        const recieverSocketId = getRecieverId(receiverid)

        if(recieverSocketId){
            console.log("reciever socket id -> ",recieverSocketId)
            io.to(recieverSocketId).emit("newmessage", newMessage)
        }

        return res.status(200).json({newMessage})

    } catch (error) {
        console.log(error)
    }
}

export const getMessage = async (req,res)=>{
    try {
        const senderid = req.id
        const receiverid = req.params.id

        const conversation = await Conversation.findOne({
            participants : {$all : [senderid,receiverid]}
        }).populate("messages")

        return res.status(200).json(conversation?.messages)

    } catch (error) {
        console.log(error)
    }
}