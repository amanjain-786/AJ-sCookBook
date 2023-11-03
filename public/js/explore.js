console.log('in the js file');

const recepieCards=document.getElementById('recepieCards');
function renderOnDelete(data){
    console.log(data);
    let temp=``;
    data.forEach(element => {
        temp+=`
        <div class="recepieCard">

            <div class="cardContent">
                <h2>${element.name}</h2>
                <img src="${element.imageUrl}" alt="image of the dish">
                <p class="description">${element.description}</p>
                <span class="preparationTime">Time:${element.preparationTime} min</span><br>
            </div>

            <div class="cardButtons">
                <a href="/posts/getpost?_id=${element._id}"><button>explore<i class="fa-solid fa-arrow-right-long"></i></button></a>
                <button class="delete" data-id="${element._id}">delete</button>
                <a href="/posts/updatepost?_id=${element._id}"><button>update</button></a>
            </div>
        </div>
        `
    });
    recepieCards.innerHTML=temp;
    return;
}



$('body').on('click',(event)=>{
    console.log($(event.target).attr('data-id'));
    let id=$(event.target).attr('data-id');
    let aclass=$(event.target).attr('class');
    if(aclass=='delete'){
        console.log('i want to delete one thing bro.')

        fetch(`/posts/delete?_id=${id}`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            renderOnDelete(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
})


const explore=document.getElementById('explore');
explore.classList.add('currentLink');