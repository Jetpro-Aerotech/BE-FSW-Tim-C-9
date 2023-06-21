const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { uploadToImagekit } = require("../lib/imagekit");
const User = require("../models").user;
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "sorry, your email account doesn't exist." });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).json({ message: "Passwords don't match" });
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY);

    res.status(200).json({ message: "login successful", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { full_name, username, email, phone_number, password, role } = req.body;
  if (req.file === undefined || full_name === "" || username === "" || email === "" || phone_number === "" || password === "") {
    return res.status(400).json({ message: "Please input a relevant data" });
  } else {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({ message: "User already exists" });

      const photo = await uploadToImagekit(req);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        full_name,
        email,
        password: hashedPassword,
        username,
        phone_number,
        photo: photo.url,
        role,
      });
      res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

// test users
const getUsers = async (req, res) => {
  try {
    await User.findAll().then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

let otpCache = {};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Simpan OTP ke cache
    otpCache[email] = otp;

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Konfigurasi email
    const mailOptions = {
      from: 'Flytix',
      to: email,
      subject: 'Verification Code',
      text: `Your OTP: ${otp}`,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Ambil OTP dari cache berdasarkan email
    const cachedOTP = otpCache[email];

    if (!cachedOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (otp === cachedOTP) {
      // OTP valid
      delete otpCache[email]; // Hapus OTP dari cache setelah diverifikasi
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      // OTP tidak valid
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

module.exports = {
  login,
  register,
  getUsers,
  forgotPassword,
  verifyOTP,
};
