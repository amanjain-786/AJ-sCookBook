let changeText=document.getElementById('changeText');
const navbar=document.getElementById('navbar');

const arr=['Desserts.','Drinks.','Snacks.','Soups.','Breads.','Pizza.'];
let i=1;
setInterval(() => {
    if(i==arr.length){
        i=0;
    }
    changeText.innerText=arr[i];
    i++;
},5000);


window.addEventListener('scroll',()=>{
    // console.log(window.innerHeight);
    // console.log(window.scrollY);
    if(window.scrollY>window.innerHeight-30){
        navbar.classList.add('addition');
    }
    else{
        navbar.classList.remove('addition');
    }
})