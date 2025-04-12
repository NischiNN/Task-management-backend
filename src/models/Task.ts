// src/models/Task.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  id: string;
  userId: string; // this can be ObjectId if you want tighter relation
  title: string;
  desc: string;
  state: number;
  category: number;
  priority: number;
  createdAt: number;
}

const taskSchema = new Schema<ITask>({
  id: { type: String, unique: true },
  userId: { type: String, required: true, ref: 'User' }, // assuming userId is a string like "123"
  title: { type: String, required: true },
  desc: { type: String, required: false },
  state: { type: Number, required: true },
  category: { type: Number, required: true },
  priority: { type: Number, required: true },
  createdAt: { type: Number, required: true },
});

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
