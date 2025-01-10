import config from "@/config/config";
import axios from "axios";

export class Conf{
    api;
    constructor(){
        this.api = axios.create({
            baseURL: config.serverUrl,
            timeout: 10000
        })
    }
    async createPost({content, userId}) {
        try {
            const post = await this.api.post('/api/post/create', {content,userId})
            if(post) {
                return post?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }

    async allPost() {
        try {
            const posts = await this.api.get('/api/post/all-posts')
            if(posts) {
                return posts?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }
    async somePost() {
        try {
            const posts = await this.api.get('/api/post/some-posts')
            if(posts) {
                return posts?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }

    async postById({postId}) {
        try {
            const post = await this.api.get(`/api/post/${postId}`)
            if(post) {
                return post?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }
    async dashboard({userId}) {
        try {
            const post = await this.api.get(`/api/post/dashboard/${userId}`)
            if(post) {
                return post?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }
    async deletePost({userId, postId}) {
        try {
            const post = await this.api.delete(`/api/post/delete/${userId}/${postId}`)
            if(post) {
                return post?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }
    async likeUnlike({postId, userId}) {
        try {
            const like = await this.api.post(`/api/like/like-unlike`, {postId, userId})
            if(like) {
                return like?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }

    async createComment({comment, userId, postId}) {
        try {
            const commentInfo = await this.api.post('/api/comment/create', {comment, userId, postId})
            if(commentInfo) {
                return commentInfo?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }

    async allComments({postId}) {
        try {
            const commentInfo = await this.api.post('/api/comment/all-comments',{postId})
            if(commentInfo) {
                return commentInfo?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }

    async deleteComment({userId, commentId}) {
        try {
            const commentInfo = await this.api.delete(`/api/comment/delete/${userId}/${commentId}`)
            if(commentInfo) {
                return commentInfo.data
            } 
        } catch (error) {
            throw error.response.data
        }
    }

}

const conf = new Conf()

export default conf;
