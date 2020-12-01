
const loadPosts = require(path.join(__dirname,'../utils/loadTwenty'))

var counter = 1;

const postsList = document.querySelector('#posts')


var loading = false

var scrollPosition

var counterThree = 0;

var dark = true;

var noLoad = false;

var yScroll;

const addTwenty =  (posts)=>{

    
    document.querySelector('#loading').style.display = 'none';
    

    
    var postBody;
    
    var li;
    if(!posts){
        return
    }
    posts.forEach(  (post) => {
       
        if(counterThree % 3 === 0 ){
            dark = !dark;
        }       
        li = renderLi(true,counterThree,post,dark)

        li.addEventListener('dragstart', drag);
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop',drop);
        li.addEventListener('dragenter', dragEnter);
        li.addEventListener('dragleave', dragLeave);
        li.addEventListener('click',hideList);
        postsList.appendChild(li);
        counterThree ++;
    })


    loading = false

}

dragEnter = function(e) {

    e.preventDefault();
    this.className+= ' hovered-post';

}

const reload = async (e) => {
    counterThree = 0 ;
    counter = 1
    dark = true;

    noLoad = false;
    
    document.querySelector('#posts').innerHTML = ''
    document.querySelector('#loading').style.display = 'block';    
    const posts = await loadPosts(0)
    addTwenty(posts)
  
}

document.querySelector('#reload-btn').addEventListener('click',reload)

dragLeave = function(e) {

    this.className=this.className.replace(' hovered-post','');   //' .hovered-post';
}


dragOver = function(e) {
    e.preventDefault()

}

drag = function(e)  {

    e.dataTransfer.setData("Post" , e.target.id);
  
}

drop = function(e)  {
    const draggedPostId = e.dataTransfer.getData("Post");
    const draggedPost = document.getElementById(draggedPostId);
    draggedPost.className = draggedPost.className.replace(' hovered-post','');
    this.className = this.className.replace(' hovered-post','');
    const dragidNum =  parseInt(draggedPostId.split("-")[1]);
    const dropidNum = parseInt(this.id.split("-")[1]);

    if( (draggedPost.className === this.className) && (Math.floor(dragidNum/3) === Math.floor(dropidNum/3)) ){
        this.className=this.className.replace(' hovered-post','');    
        swapElements(this,draggedPost)
        
        
    }


}

hideList = async (e) =>{
    

    yScroll = window.pageYOffset
    
    
    const temp = e.target.id.split(":")[1]
    const id = parseInt(temp.split("-")[0]);
    document.querySelector('#posts').style.display = 'none'
    document.querySelector('#back-btn').style.display = 'block';
    document.querySelector('#loading').style.display = 'block';
    document.querySelector('#reload-btn').style.display = 'none'

    await displaySinglePost(id)    
    

    noLoad = true


}


swapElements = (elem1, elem2) => {

    var temp = document.createElement("div");

    elem1.parentNode.insertBefore(temp, elem1);

    elem2.parentNode.insertBefore(elem1, elem2);


    temp.parentNode.insertBefore(elem2, temp);

    temp.parentNode.removeChild(temp)

}

ipcRenderer.on('fetchedPosts' , (e,posts) => {
    
    addTwenty(posts)

})

window.onscroll = async(ev) => {
    
    if ( ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) && loading === false && noLoad===false) {
        loading = true
        document.body.classList.add("stop-scrolling");
        const posts = await loadPosts(counter);
        counter = counter + 1;      
        addTwenty(posts)
    }
}



