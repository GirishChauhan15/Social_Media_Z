import config from "@/config/config";
import axios from "axios";

export class AuthServices{
    api;
    constructor(){
        this.api = axios.create({
            baseURL: config.serverUrl,
            timeout: 10000
        })
    }

    async allUsersInfo() {
        try {
            const userInfo = await this.api.get('/api/user/all-users')
            if(userInfo) {
                return userInfo?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }

    async userByEmail({email}) {
        try {
            const userInfo = await this.api.post(`/api/user/info`, {email})
            if(userInfo) {
                return userInfo?.data
            } 
        } catch (error) {
            throw error?.response?.data || error?.message
        }
    }
}

const authServices = new AuthServices()

export default authServices;