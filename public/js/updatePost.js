const id=document.getElementById('postId').value;
console.log(id);

//now i have the id and i just need to fetch the data bro
let data;
fetch(`/ajax/getpost?_id=${id}`)
.then((res)=>{
    return res.json();
})
.then((d)=>{
    data=d;
    console.log(data);
    renderData(data);
})
.catch((err)=>{
    console.log(err);
})


let recepieName=document.getElementById('name');
let imageUrl=document.getElementById('imageUrl');
let cookName=document.getElementById('cookName');
let desc=document.getElementById('desc');
let recepieImage=document.getElementById('recepieImage');
let servingSize=document.getElementById('servingSize');
let preparationTime=document.getElementById('preparationTime');
let steps=document.getElementById('steps');
let ingredients=document.getElementById('ingredients');


let radioVeg=document.getElementById('veg');
let radioNonVeg=document.getElementById('nonVeg');


let radioDrink=document.getElementById('drink');
let radioDessert=document.getElementById('dessert');
let radioBreads=document.getElementById('breads');
let radioSnack=document.getElementById('snacks');
let radioSalads=document.getElementById('salads');
let radioSoups=document.getElementById('soups');
let radioSabzi=document.getElementById('sabzi');


function renderData(data){
    recepieName.value=data.name;
    imageUrl.value=data.imageUrl;
    cookName.value=data.cookName;
    desc.value=data.description;
    recepieImage.setAttribute("src",data.imageUrl);

    let temp='';
    data.steps.forEach((element,index) => {
        if(index==data.steps.length-1){
            temp+=element;
        }
        else{
            temp+=element+'\r\n';
        }
    });
    steps.value=temp;

    ingredients.value=data.ingredients;

    servingSize.value=data.servingSize;
    preparationTime.value=data.preparationTime;

    if(data.type=='veg'){
        radioVeg.checked=true;
    }
    else{
        radioNonVeg.checked=true;
    }

    if(data.category=='drink'){
        radioDrink.checked=true;
    }
    else if(data.category=='dessert'){
        radioDessert.checked=true;
    }
    else if(data.category=='breads'){
        radioBreads.checked=true;
    }
    else if(data.category=='snacks'){
        radioSnack.checked=true;
    }
    else if(data.category=='salads'){
        radioSalads.checked=true;
    }
    else if(data.category=='soups'){
        radioSoups.checked=true;
    }
    else if(data.category=='sabzi'){
        radioSabzi=true;
    }
}