import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { ChatMessage } from './schemas/chat-message.schema';

export class ChatMessage {
	private messageModel = mongoose.model('ChatMessage', ChatMessage);
	public async getAll(): Promise<any>{
		return await this.messageModel.find({});
	}
	public async create(msg: string): Promise<any>{
		return await this.messageModel.create({_id: Types.ObjectId(), text: msg});
	}
	public async deleteById(id: string): Promise<any> {
		return await this.messageModel.remove({_id: id});
	}
}
