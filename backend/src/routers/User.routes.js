import {Router} from 'express'
import { clerkWebHook, getAllUsers, getUserBYEmail } from '../controllers/User.controllers.js'

const router = Router()

router.route('/webhooks').post(clerkWebHook)
router.route('/all-users').get(getAllUsers)
router.route('/info').post(getUserBYEmail)
export default router