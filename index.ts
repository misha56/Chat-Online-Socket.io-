import {
	Response,
  Request,
} from 'express';
import { Socket } from 'socket.io';
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
import { Types } from 'mongoose';
import { ChatMessage } from './schemas/chat-message.schema';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});


class ChatMessageService {
	private messageModel = mongoose.model('ChatMessage', ChatMessage);
	public async getAll(): Promise<any> {
		return this.messageModel.find({});
	}
	public async create(msg: string): Promise<any>{
		return this.messageModel.create({_id: Types.ObjectId(), text: msg, sendDate: Date.now()});
	}
	public async deleteById(id: string): Promise<any> {
		return this.messageModel.remove({_id: id});
	}
}

const messageService = new ChatMessageService();

app.get('/', function(req: Request, res: Response){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', async function(socket:Socket){
	console.log('a user connected');
	const socketId = socket.id;
	const messages = await messageService.getAll();
	for (let message of messages) {
		if (message.text) {
			io.to(`${socketId}`).emit('early message', message.text);
		}
	}
});

io.on('connection', function(socket:Socket){
	socket.on('chat message', async function(msg){
		await messageService.create(msg);
	});
});

io.on('connection', function(socket:Socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3220, function(){
	console.log('listening on 127.0.0.1:3220');
});

