import User from "../models/user";
import {hashPassword, comparePassword} from "../utils/auth";
import jwt from "jsonwebtoken";
import nanoid from "nanoid";
import AWS from "aws-sdk";
//import dynamic from 'next/dynamic'
 
/* const nanoid = dynamic(() => import('nanoid'), {
  ssr: false,
}); */

const awsconfig = {
    accesskeyid: process.env.ACCESS_KEY_AWS_ID,
    secretAccessKey: process.env.SECRET_ACCESS_AWS_KEY,
    region: process.env.AWS_REGION,
    apiVersion:process.env.AWS_API_VERSION 
};

const SES = new AWS.SES(awsconfig);
//using RegExpression to highlight an accurate email
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const register = async (req, res) => {
    try {
        //console.log(req.body);
        const {name, email, password} = req.body;
        //validation
        if (!name) return res.status(400).send("Name is required");
        if(!password || password.length < 6) {
            return res.status(400).send("Password is required. min of 6 charaters");
        }
        if (!emailRegexp.test(email)) {
            errors.push({ email: "invalid" });
        }
        let userExist = await User.findOne({email}).exec();
        if (userExist) return res.status(400).send("Email already taken");
    
        // Hash password
        const hashedPassword = await hashPassword(password);
  
        //register
        const user = new User({
            name, 
            email,
            password: hashedPassword,
        });
        await user.save();
        // console.log("user saved", user);
        return res.json({ok: true});
    
    } 
      catch (err) {
        console.log(err);
        return res.status(400).send("Incorrect. Try again");
        
    }
    
};
//login export module to enable it from the server side
export const login = async (req, res) => {
    try {
        //console.log(req.body);
        const {email, password} = req.body;
        //validation from db for user email
        const user = await User.findOne({email}).exec();
        if (!user) return res.status(400).send("User not found");
        if(!password || password.length < 6) {
            return res.status(400).send("Password is required. min of 6 charaters");
        }
        if (!emailRegexp.test(email)) {
            errors.push({ email: "invalid" });
        }

        // checking password by comparing againt db
        const match = await comparePassword(password, user.password);
        //create signed jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '48hrs',
        });
         
        //return user and token to client, 
        //exclude hashed password
        user.password = undefined;
        //sending tokin in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true  //this work when swithing to https
        });
        //send user as json response
        res.json(user);
    } 
      catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again");
        
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({message: "logout completed"})
        
    } catch (err) {
        console.log(err);
        
    }
};

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").exec();
        console.log("CURRENT_USER", user);
        return res.json({ok: true}); 
    } catch (err) {
        console.log(err)
        
    }
};

/* export const sendTestEmail = async (req, res) => {
     console.log("send email using SES");
    res.json({ok:true}); 
    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: ["usmanabubakarabba@gmail.com"]
        },
        ReplyToAdresses: [process.env.EMAIL_FROM],
        Message: {
            Body:{
                Html:{
                    Charset: "UTF-8",
                    Data: `
                        <html>
                            <h1>Reset password link</h1>
                            <p>Please use the following link to reset your password</p>
                    </html>
                    `,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Password reset link",
            },
        },

    };
    const emailSent = SES.sendEmail(params).promise();
    emailSent
    .then((data) => {
        console.log(data);
        res.json({ok: true});
    })
    .catch((err) => {
        console.log(err);
    });
}; */
 
export const resetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        //console.log(email); 
        const shortCode = nanoid(6).toUpperCase();
        const user = await User.findOneAndUpdate({email}, 
        {passwordReset: shortCode});
        if (!user) return res.status(400).send("User not found");

        // sending email
            const params = {
                Source: process.env.EMAIL_FROM,
                Destination:{
                    ToAddresses: [email],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data:`
                                <html>
                                <h1>Reset password</h1>
                                <p>Hello User, use the link to reset your password</p>
                                <h2 style="color:red;">${shortCode}</h2>
                                <i>My_Classroom.com</i>
                                </html>
                            `,
                        },
                    },
                    Subject:{
                        Charset: "UTF-8",
                        Data: "Reset Password",
                    },
                }, 
            };
        const emailSent = SES.sendEmail(params).promise();
        emailSent
        .then((data) => {
            console.log(data);
            res.json({ok:true});
        })
        .catch((err) =>{
            console.log(err);
        });

    } catch (err) {
        console.log(err)
        
    }
};
    




 
