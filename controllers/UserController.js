const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { registrationValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password, phone, age, gender} = req.body

// The code below is used for hashing passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // the error below is a variable from the joi we installed

    const { error } = registrationValidation(req.body)
    if(error){
        return res.status(401).json({error: error.details[0].message})
    }

// This code below is used to check if an email exists
    const emailExists = await User.findOne({ email: email })
    if (emailExists){
        return res.status(401).json({ error: 'Email already exists' })
    } 
    
    const user = new User({
        username: username,
        email: email, 
        phone: phone,
        age: age,
        password: hashedPassword,
        gender: gender
    }) 

    try{
        const savedUser = await user.save()
        res.status(201).json({success: "User created successfully", data: savedUser})
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const login = async (req, res) => {
    try{
// had to use pwd below, so there wont be conflicts of password variables below
        const  { email, pwd }  = req.body
         
        const { error } = loginValidation(req.body)
    if(error){
        return res.status(401).json({error: error.details[0].message})
    }
// to check if the email input is correct or not
    const user = await User.findOne({ email: email })
    if(!user){
        return res.status(404).json({error: "User not found"})
    }

// to check if the password input is correct or not

    const validPass = await bcrypt.compare(pwd, user.password)
    if(!validPass){
        return res.status(404).json({error: "invalid credentials"})
    }

    const { password, ...others } = user._doc

// remeber to install jwt using "npm i jsonwebtoken"
// remember to add jwt to the env too
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    res.header('auth-token', token).json({"success": others, "token": token})

    }catch(error){
        res.status(500).json({ error: error.message })
    }
}

module.exports = { register, login }