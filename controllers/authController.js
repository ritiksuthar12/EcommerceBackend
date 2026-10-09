const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const getToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'});
}

const UserRegister = async (req , res) => {

    const { name , email , password } = req.body; 

    try {
        const userExist = await user.findOne({email});
        if(userExist){
            return res.status(400).json({message:'user already exist'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = new user.create({name,email,password:hashedPassword});

        if(user){
            const otp = Math.floor(100000 + math.random()*900000).toString();
            const message = `
            Welcome to Shop it ${name}! Thankyou for being a part of our community , we are really exicted to have you as a part of our team.
            your otp for shopit registration is${otp}`;

            await sendEmail(email,"welcome to shopit your otp for registration",message);
                res.status(200).json({
                  id:user._id,
                  name:user.name,
                  email:user.email,
                  role:user.role,
                  token: getToken(user.id)
                });
        }
        else{
            res.status(400).json({message:"invalid user data"})
        }


      

    } catch (error) {
        return res.status(500).json({message:"server error"});
    }
};

// Login

const UserLogin = async( req , res ) =>{
    const{email,password} = req.body;

    try {
        const user = user.findOne({email});
        if(user &&(await bcrypt.compare( password,user.password))){

        }
    } catch (error) {
        
    }
}



module.exports = {UserRegister};