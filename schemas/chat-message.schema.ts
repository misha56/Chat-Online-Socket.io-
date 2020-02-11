import { Schema, Types } from 'mongoose';

export const ChatMessage = new Schema({
  _id: Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  sendDate: {
    type: Date,
    required: true,
  }
});

