const {BadRequestError} = require("../errors/index")
const jwt = require("jsonwebtoken")
const AuthLoginSchema = require("../models/Auth")

const login = async (req, res) => {

    const {username, password} = req.body
    // you can check wether username or password is provided in mongoose validation Schema (required), or writng this code below..
    if (!username || !password) {
        throw new BadRequestError("Please provide email and password")
    }

    // just for demo, normally provided by DB!!!
    const id = new Date().getTime()

    // try to keep payload small, better experience for user
    // do not pass password or important credentials
    // {id, username} -- payload
    // process.env.JWT_SECRET -- token secret,   just for demo, in production use long complex and unguessable string value !!!!!!!!!
    // {expiresIn: "30d"} -- options
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: "30d"})


    res.status(200).json({msg: "user created", token})


    // IT IS THE SAME CODE AS ABOVE
    // const {username, password} = req.body
    // try {
    //     if (!username || !password) {
    //         res.status(400).json({msg: "Please provide email and password"})
    //     }
    //     res.send("Fake Login / Register / Sign up  Route")
    // } catch (error) {
    //     res.status(500).json({msg: error})
    // }

    // IT IS THE SAME CODE AS ABOVE
    // const {username, password} = req.body
    // try {
    //     const user = await AuthLoginSchema.create(req.body)
    //     res.send("Fake Login / Register / Sign up  Route")
    // } catch (error) {
    //     res.status(500).json({msg: error})
    // }


}

const dashboard = async (req, res) => {
    // console.log(req.user);
    const {username} = req.user


    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({msg: `Hello, ${username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})

}

module.exports = {
    login,
    dashboard
}