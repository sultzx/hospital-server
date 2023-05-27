import mongoose from "mongoose";
import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

export const registration = async (req, res) => {

  try {

    const { fullname, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(6);

    const hash = await bcrypt.hash(password, salt);

    const document = new User({
      personal: {
        fullname: fullname
      },
      email,
      pass: hash,
      role
    });

    const isEmailExist = await User.findOne({
      email: email,
    });

    if (isEmailExist) {
      return res.status(400).json({
        message: "Қолданушы желіде тіркелген",
      });
    }

    const user = await document.save();

    const { pass, ...userData } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.get("jwt_key"),
      { expiresIn: "2h" }
    );

    res.status(200).json({
      userData,
      token,
      message: "Қолданушы желіге сәтті тіркелді",
    });

  } catch (error) {
    res.status(500).json(error.message);
  }
}


export const login = async (req, res) => {
  try {

    const { email, password } = req.body

    await User.findOne({ email })

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        message: `'${email}' желіде жоқ`,
      });
    }

    const isPassValid = await bcrypt.compare(
      password,
      user._doc.pass
    );

    if (!isPassValid) {
      return res.status(400).json({
        message: "құпия сөз қате терілген",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.get("jwt_key"),
      {
        expiresIn: "1h",
      }
    );

    const { pass, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
      message: 'Жүйеге сәтті кірілді!'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Серверден қате келді'
    });
  }
}


export const me = async (req, res) => {
  try {

    const userId = req.userId;

    let user = await User.findById(userId)

    const { pass, ...userData } = user._doc;

    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const all = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export const update = async (req, res) => {

  try {

    const { fullname, phone, birthday, address, height, weight, specialization, whbegin, whend } = req.body

    const userId = req.userId

    const user = await User.findById(userId)

    await User.updateOne({
      _id: user._id
    }, {
      personal: {
        fullname: fullname && fullname,
        phone: phone && phone,
        birthday: birthday && birthday,
        address: address && address,
      },
      medical: {
        height: height && height,
        weight: weight && weight,
      },
      specialization: specialization && specialization,
      working_hours: {
        begin: whbegin && whbegin,
        end: whend && whend,
      },
    })

    let role = []

    switch (user?.role) {
      case 'patient': role.push('Науқас')
        break;
      case 'doctor': role.push('Дәрігер')
        break;
      case 'admin': role.push('Админ')
        break
    }

    res.status(200).json({
      message: `${role[0]} мәліметі сәтті жаңартылды`
    })

  } catch (error) {

    res.status(500).json(error.message);

  }
}

