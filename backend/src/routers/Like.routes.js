import {Router} from 'express'
import { likeAndUnlike } from '../controllers/Like.controllers.js'

const router = Router()

router.route('/like-unlike').post(likeAndUnlike)

export default router