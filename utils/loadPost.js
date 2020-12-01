const axios = require('axios') 


const loadPost = async (postId) => {


    const getByIdUrl = 'https://hacker-news.firebaseio.com/v0/item/'+postId+'.json?print=pretty'

    const post = await axios.get(getByIdUrl)

    post.data.time = new Date(post.data.time*1000)
    
    if(post.data.kids){
        post.data.comments = await getComments(post.data.kids)
    }
        return post.data
    
}



const getComments = async(commentsId) => {

    const comments = await Promise.all(commentsId.map( async(commentId) => {

        const comment = await axios.get('https://hacker-news.firebaseio.com/v0/item/'+commentId+'.json?print=pretty')
        comment.data.time = new Date(comment.data.time*1000);
        return comment.data

    }))

    return comments


}

module.exports = loadPost;