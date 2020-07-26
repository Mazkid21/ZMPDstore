import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, dropDups: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true });

userSchema.methods.hash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };


const User = mongoose.model('User', userSchema);


export default User;
