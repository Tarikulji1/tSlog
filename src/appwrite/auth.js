import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({ email, password, name }) {
        try {
            console.log("Creating account with email:", email);
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("Account created:", userAccount);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error('createAccount error:', error);
            throw error;
        }
    }


    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log('Session created:', session);
            return session;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }


    async getCurrentUser(){
        try {
            const user = await this.account.get();
            console.log('Current user:', user);
            return user;
        } catch (error) {
            if (error.code === 401) {
                console.log("User is not authenticated.");
            } else {
                console.error("Appwrite Service :: getCurrentUser :: error", error);
            }
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logged out successfully.");            
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;