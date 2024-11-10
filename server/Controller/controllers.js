import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    const user = new User({ username, password, confirmPassword });
    await user.save();
    res.status(201).json({ message: "User Register Successfully" });
  } catch (e) {
    res.status(400).json({ message: "Error Occuring while register the user" });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const isPasswordCOrrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCOrrect) {
      return res.status(400).json({ message: "Password Incorrest" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error Logging in" });
  }
};

export const getTasks = async (req, res) => {
  const task = Task.find({ user: req.user.id });
  res.json(task);
};

export const createTask = async (req, res) => {
  const { taskText } = req.body;
  const newTask = new Task({ text, user: req.user.id });

  await newTask.save();
  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { text, completed } = req.body;
  const task = new Task.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { text, completed },
    { new: true }
  );

  if (!task) return res.status(400).json({ message: "Task not Found!!" });
  res.status(201).json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};

// module.exports = {
//   Register,
//   Login,
//   getTask,
//   creatTask,
//   updateTask,
//   deleteTask,
// };
