const express = require("express")
const router = express.Router()

const {login, dashboard} = require("../controllers/main")

const authMiddleware = require("../middleware/auth")

// after authMiddleware ends the dashbord start work
router.route("/dashboard").get(authMiddleware, dashboard)

router.route("/login").post(login)

module.exports = router