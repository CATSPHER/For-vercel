import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

// class banadi
export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug
                ,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
 
        }catch(error){
            console.log("Appwrite service :: createPost ::error ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        }catch(error){
            console.log("Appwrite service :: updatePost ::error ",error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            // ab frontend par h ki kaise iss true ko handle karenge
            return true;

        }catch(error){
            console.log("Appwrite service :: deletePost ::error ",error);
            // error aaje toh false ki frontend me if true else karke kuch karlen
            return false;

        }

    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )

        }catch(error){
            console.log("Appwrite service :: getPost ::error ",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,

                // isko upar hi define kardia line 88
                queries,

            )
            

        }catch(error){
            console.log("Appwrite service :: getPosts ::error ",error);
            return false;
        }
    }

    // file upload method/service


    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }catch(error){
            console.log("Appwrite service :: uploadFile ::error ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;

        }catch(error){
            console.log("Appwrite service :: deleteFile ::error ",error);

        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

// class se object banadia so that we can easily(directly) access jo bhi method AuthService class me banenge.
const service=new Service();
export default service;
