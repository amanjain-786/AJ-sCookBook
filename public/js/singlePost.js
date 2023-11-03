const commentForm=document.getElementById('commentForm');
const recepieId=document.getElementById('recepieId');
const rName=document.getElementById('name');
const comment=document.getElementById('comment');
const comments=document.getElementById('comments');

commentForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    //now from here i have to send the request bro so let's do
    axios.post('/comment/addcomment',{
        id:recepieId.value,
        name:rName.value,
        comment:comment.value
    })
    .then((data)=>{
        console.log(data);
        rName.value='';
        comment.value='';
        renderComment(data.data);
    })
    .catch((err)=>{
        console.log(err);
        console.log('couldnt post the comment');
    })
})


function renderComment(data){
    let comment=document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML=`
        <div class="commentBody">
            <h3 class="commentHeading">${data.writerName}</h3>
            <p class="commentText">${data.comment}</p>
            <p class="commentId">${data._id}</p>
        </div>
        <div class="commentButtons">
            <button class="buttons upvote commentButton">Upvote</button>
            <button class="buttons downvote commentButton">Downvote</button>
        </div>
    `;
    comments.appendChild(comment);
}



async function renderOnLoad(){
    //first i have to get the data bro so let's fetch it first
    try{
        let response=await fetch(`/comment/getcomment?recepieId=${recepieId.value}`);
        let data=await response.json();
        console.log(data);
        data.forEach(element=>{
            renderComment(element);
        })
    }
    catch(err){
        console.log(err);
        console.log('couldnt fetch the comments bro');
    }    
}


renderOnLoad();