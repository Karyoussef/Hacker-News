const renderLi = (allPosts,index, item , flag) =>{

    
    var li;
    var body;


    li = document.querySelector('#newPostItem').cloneNode(true);

    var idText = allPosts? 'postItem:'+item.id+'-':'commentItem-';

    li.setAttribute('id' , idText + index);

    
    body = document.createTextNode(  htmlDecode(  allPosts? item.title : item.text ));

    li.querySelector('.spanAuthor').innerHTML = 'By:  ' + item.by;

    var date = item.time;

    li.querySelector( ' .spanDate').innerHTML = date.getUTCDate() +'/' + (date.getUTCMonth()+1) + '/' + date.getUTCFullYear() ;
    
    if(allPosts){
        li.classList.add( flag? "li-dark" : "li-light" );
        if(item.kids){
            li.querySelector( ' .spanComments').innerHTML = item.kids.length + " Comments";
        }else{
            li.querySelector( ' .spanComments').innerHTML = 0+ " Comments";
        }
    }else{
        li.classList.add( flag? "li-light" : "li-dark" );

    }

    li.appendChild(body)

    return li;
}


function htmlDecode(str) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
}

