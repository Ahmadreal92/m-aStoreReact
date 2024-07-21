import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { ParfumModel } from '../models/parfum.model.js';
import { sample_users } from '../data.js';
import { sample_parfums } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);

export const dbconnect = async () => {
  try {
    await  connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await seedUsers();
    await seedParfums();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}

async function seedParfums() {
  const parfums = await ParfumModel.countDocuments();
  if (parfums > 0) {
    console.log('Parfums seed is already done!');
    return;
  }

  for (const parfum of sample_parfums) {
    parfum.imageUrl = `/parfums/${parfum.imageUrl}`;
    await ParfumModel.create(parfum);
  }

  console.log('Parfums seed Is Done!');
}