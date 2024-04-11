const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';

const { z } = require('zod');


const emailSchema = z.string().email();
const passwordSchema = z.string().min(6);

function signJwt(username, password) {

    const usernameRes = emailSchema.safeParse(username);
    const passwordRes = passwordSchema.safeParse(password)

    if(!usernameRes.success || !passwordRes.success){
        return null;
    }
const signature = jwt.sign({username},jwtPassword)
return signature
}

function verifyJwt(token) {
let ans = true;
    try {
    jwt.verify(token,jwtPassword)
} catch (error) {
    ans = false;
    
}
return ans;
    
}

function decodeJwt(token) {
   const decoded = jwt.decode(token)

   if(decoded) return true;
   else return false;
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
t