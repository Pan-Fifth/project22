import { createUser, getUserByEmail, loginByEmail } from "../services/auth.service.js";
import createError from 'http-errors'

export async function registerController(req, res, next) {
  try {
    const data = req.body;
    const checkUser = await getUserByEmail(data.email)
    if (checkUser) createError(400, "email already exist")
    const newUser = await createUser(data)
    res.status(201).json(newUser)
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const data = req.body
    const user = await loginByEmail(data.email, data.password)
    console.log('user', user)
    res.status(200).json({ user })
  } catch (error) {
    next(error);
  }
}

export function getMeController(req, res) { }
