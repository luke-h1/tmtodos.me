import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import notes from './data/notes.js';
import User from './models/userModel.js';
import Notes from './models/noteModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Notes.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleNotes = notes.map((note) => ({ ...note, user: adminUser }));
    await Notes.insertMany(sampleNotes);
    console.log('Data imported'.green.inverse);
    process.exit(0);
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Notes.deleteMany();
    console.log('Data destroyed'.red.inverse);
    process.exit(1);
  } catch (e) {
    console.error(`${e}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
