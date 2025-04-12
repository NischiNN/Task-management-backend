// src/models/User.ts
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs'
import network from '../config/network';

export interface IUser extends Document {
  userId: number;
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true, },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true}
});

userSchema.pre<IUser>('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});

userSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
