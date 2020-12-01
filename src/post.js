const path = require('path')
const loadSinglePost = require(path.join(__dirname,'../utils/loadPost'))
const electron = require('electron')
const {ipcRenderer} = electron;
const { webContents } = require('electron')


const singlePost = document.querySelector('#singlePost');
const displaySinglePost = async (postId) => {
    
    const post = await loadSinglePost(postId)

    document.querySelector('#loading').style.display = 'none'
    var li;
    var postBody;

    li = document.querySelector('#newPostItem').cloneNode(true);
    li.setAttribute('id' , 'postTitle');




    postBody = document.createTextNode(post.title);
    

    li.querySelector('.spanAuthor').innerHTML = 'By:  ' + post.by;
    
    if(post.kids){
        li.querySelector( ' .spanComments').innerHTML = post.kids.length + " Comments";
    }else{
        li.querySelector( ' .spanComments').innerHTML = 0+ " Comments";
        post.comments = []
    }
    
    var date = post.time;

    li.querySelector( ' .spanDate').innerHTML = date.getUTCDate() +'/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear() ;

    li.appendChild(postBody)

    singlePost.appendChild(li)

    const commentsHeader = document.createElement('h2')
    
    commentsHeader.innerHTML = 'Comments:'

    singlePost.appendChild(commentsHeader)


    var li;

    var commentBody;
        
    post.comments.forEach((comment) => {
        const index = post.comments.indexOf(comment)
        

        li = renderLi(false, index, comment,(index%2==0))

        singlePost.appendChild(li);

        


    })


}

const goBack = (e) => {
    document.querySelector('#singlePost').innerHTML = '';
    document.querySelector('#back-btn').style.display = 'none'
    document.querySelector('#posts').style.display='block';
    document.querySelector('#reload-btn').style.display='block'
    window.scrollTo(0,yScroll);

    noLoad= false
}

document.querySelector('#back-btn').addEventListener('click' , goBack)


function htmlDecode(str) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
}