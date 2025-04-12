import { v4 } from 'uuid';
import User from '../models/User';

interface IUserCreateDTO {
  name: string;
  email: string;
  password: string
}

export default class UserDAO {
  // Create a new user
  static async create(data: IUserCreateDTO) {
    const id = v4();
    const user = new User({ ...data, id });
    return await user.save();
  }

  // Find user by email
  static async findByEmail(email: string) {
    return await User.findOne({ email }).exec();
  }

  // Find user by userId (your custom auto-incremented ID)
  static async findById(id: number) {
    return await User.findOne({ id }).exec();
  }
}
