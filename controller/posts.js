
import Posts from "../models/Posts.js";

export function addPost(post){
    return Posts.create(post)
}

export async function editPosts(id,post) {
    const newPost= await Posts.findByIdAndUpdate(id,post,{ReturnDocument:'after'})
    return newPost
}

export function deletePosts(id){
    return Posts.deleteOne({_id:id})
}

export function getPost(id){
    return Posts.findById(id)
}

export async function getAllPosts(search='',limit=100,page=1,category='',generation=null) {
        const filterPosts = {
            name: {$regex:search,$options:'i'}
        }
        if(category) filterPosts.category=category
         if (generation !== null && !isNaN(generation)) {
        filterPosts.generation = generation 
         }
        const [posts,count] = await Promise.all([
            Posts.find(filterPosts).limit(limit)
            .skip((page-1)*limit),
            Posts.countDocuments(filterPosts)
        ])
        return{
            posts,
            count
        }
}