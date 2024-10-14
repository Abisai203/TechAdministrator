import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

async function register(username, password) {
    const users = await userRepository.getUsers();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    await userRepository.saveUsers(users);

    return newUser;
}

async function login(username, password) {
    const users = await userRepository.getUsers();
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    return token;
}

export default {
    register,
    login
};
