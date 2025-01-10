import {Router} from 'express'
import { commentOnPost, deleteAComment, getAllComments } from '../controllers/Comment.controllers.js'

const router = Router()

router.route('/create').post(commentOnPost)
router.route('/all-comments').post(getAllComments)
router.route('/delete/:userId/:commentId').delete(deleteAComment)

export default router