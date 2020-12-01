const axios = require('axios');
const {ipcRenderer} = require('electron');


const load = async (counter) =>{

    const start = counter*20;
    const end = ((counter+1)*20)-1;


    const postsID = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy=%22$key%22&startAt="'+start+'"&endAt="'+end+'"')
    
    const posts = await getPosts(Object.values(postsID.data))
    
    counter = counter+1;

    return posts;    
    
    

}

const getPosts = async (postsID) =>{
    const posts =  await Promise.all(postsID.map(async(postID) => {

        const post = await axios.get('https://hacker-news.firebaseio.com/v0/item/'+postID+'.json?print=pretty')
        post.data.time = new Date(post.data.time*1000)
        return post.data

    }));

    return posts

} 

module.exports = load;