const {UnauthenticatedError} = require("../errors/index")
const jwt = require("jsonwebtoken")


const authenticatonMiddleware = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Invalid credentials to access this route")
    }

    const token = authHeader.split(" ")[1]
    // console.log(token);

     try {
        // for verification we must provide token and jwt secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        const {id, username} = decoded

        // now we can pass {id, username}  to "dashboard"
        req.user = {id, username}

        // next() is very important. after authenticatoinMiddleware ends next step will be dashboard
        next()
       
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route")
    }

}

module.exports = authenticatonMiddleware