import bcrypt from 'bcryptjs';    // Used to hash the password, so if the database is hacked no one can see the passwords.
import jwt from 'jsonwebtoken';   // Safe way to store the user token in the browser for some amount of time.

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;   // All the post data that you send will be available in the req.body.

  try {
    const existingUser = await User.findOne({ email });

    // Return an error message if the user information is incorrect.
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    // Check if the password is the same as when the user initially created the account.
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invald credentials." });

    // If user exists and the password is correct, do this.
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });    // 'test' should be a secret string stored in a .env file.
    
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." }); // 500 = undefined server error.
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(existingUser) return res.status(400).json({ message: "User already exists." });

    if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });

    res.status(200).json({ result, token });    // Return result and token.
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." }); // 500 = undefined server error.
  }
}

