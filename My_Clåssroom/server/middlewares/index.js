var { expressjwt: jwt } = require("express-jwt");

//give request user to access id
export const  requireSignin = jwt({
    getToken: (req, res) => req.cookies.token, 
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
}); 


