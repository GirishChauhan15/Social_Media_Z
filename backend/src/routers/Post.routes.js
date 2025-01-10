import {Router} from 'express'
import { beforeLoginPosts, createPost, deletePost, getAllPosts, getPostById, userDashboard } from '../controllers/Post.controllers.js'

const router = Router()

router.route('/create').post(createPost)
router.route('/all-posts').get(getAllPosts)
router.route('/some-posts').get(beforeLoginPosts)
router.route('/:postId').get(getPostById)
router.route('/delete/:userId/:postId').delete(deletePost)
router.route('/dashboard/:userId').get(userDashboard)

export default router