import {} from "../services/auth.service.js";

export function registerController(req, res, next) {
  try {
    const data = req.body;
    res.send("hh");
  } catch (error) {
    next(error);
  }
}

export function loginController(req, res, next) {
  try {
    res.send("hello");
  } catch (error) {
    next(error);
  }
}

export function getMeController(req, res) {}
