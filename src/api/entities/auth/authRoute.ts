import express, { Router } from 'express';
import authControllers from './authControllers';
const router:Router = express.Router()
const user = authControllers

router.route("/signup").post(user.signUp)
router.route("/signin").post(user.login)


export default router