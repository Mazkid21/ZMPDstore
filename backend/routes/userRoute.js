import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { isAuthenticated, getToken } from '../util';

const router = express.Router();


router.put('/:id', isAuthenticated, asyncHandler(async (req, res) => {
  if (req.params.id !== req.user._id && !req.user.isAdmin) {
    return res.status(401).send({
      success: false,
      message: 'Can not update this user.',
    });
  }
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User not found.' });
  }
}));

router.post('/register', asyncHandler(async (req, res) => {

  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  res.status(201).send({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: getToken(newUser),
  });
}));

router.post('/signin', asyncHandler(async (req, res) => {
  const signinUser = await User.findOne({ email: req.body.email}); 
    if (!signinUser) {
    return res.status(400).send({ message: "The email does not exist" });
}
if(!bcrypt.compareSync(req.body.password, signinUser.password)) {
    return response.status(400).send({ message: "The password is invalid" });
}
  res.send({
    _id: signinUser._id,
    name: signinUser.name,
    email: signinUser.email,
    isAdmin: signinUser.isAdmin,
    token: getToken(signinUser),
  });
}));



export default router;


