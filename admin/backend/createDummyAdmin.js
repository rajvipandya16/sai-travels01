const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sai-travels-admin';

async function createDummyAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const email = 'admin@saitravels.com';
  const password = 'admin123';
  const name = 'Admin User';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Dummy admin already exists:', email);
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, password: hashedPassword });
  await admin.save();
  console.log('Dummy admin created:', email, 'Password:', password);
  mongoose.disconnect();
}

createDummyAdmin().catch(err => {
  console.error('Error creating dummy admin:', err);
  mongoose.disconnect();
}); 