// position fixed to header on scroll
let header = document.querySelector('.header');
let headerNav = document.querySelector('.header__nav');

window.onscroll = function(){
    if(window.scrollY > 10){
        headerNav.style.top = "100%";
    }else{
        headerNav.style.top = "9%";
    }
}

// headerNav.ch

// social icons hover text
let socialLinks = document.querySelectorAll(".social-icons .social-icon");
let linksArr = [...socialLinks];

function createText(el){
    let span = document.createElement("span");
    span.className = "icon-text";
    let spanText = document.createTextNode(`${el.dataset.text}`);
    span.appendChild(spanText);
    el.appendChild(span);
}

linksArr.forEach(function(e){
    e.addEventListener("mouseover" , () => createText(e))   
     e.addEventListener("mouseout" , () => {
        e.removeChild(document.querySelector(".icon-text"))
    })
})

// type writer

let title = document.getElementById('title');
let titleText = ["i'm a designer.","i'm a freelancer.","i'm ayah magdi."];
let arr = [];
let i = 0;
let j = 0;
let wordfinish = false;
let isEnd = false

function typeWriter(){
    title.innerHTML = arr.join("")
    if(i < titleText.length){
       if(!wordfinish && j < titleText[i].length){
           arr.push(titleText[i][j])
           title.innerHTML = arr.join("")
           j++;
           isEnd = false
       }
       if(wordfinish && j <= titleText[i].length){
        arr.pop(titleText[i][j]);
        title.innerHTML = arr.join("");
        j--;
        isEnd = false
       }
       if(j == titleText[i].length){
           wordfinish = true;
           isEnd = true
       }
       if(wordfinish && j == 0){
           i++;
           wordfinish = false;
           arr = []
           if(i == titleText.length){
             i = 0
           }
       }
    }

   let speedUp = Math.random() * (80 - 50) + 50;
   let speedNormal = Math.random() * (300 - 200) + 200 
   let time = isEnd ? 1000 : wordfinish ? speedUp : speedNormal
    setTimeout(typeWriter , time);
}

typeWriter();

/****************************************************/

let listIcon = document.querySelector('.header .list-icon');
let listNav = document.querySelector('.header .header__nav');
listIcon.addEventListener('click' , function(){
    listNav.classList.toggle('show');
    if(this.firstElementChild.classList.contains('fa-bars')){
        this.firstElementChild.classList.add('fa-xmark');
        this.firstElementChild.classList.remove('fa-bars');
    }else{
        this.firstElementChild.classList.add('fa-bars');
        this.firstElementChild.classList.remove('fa-xmark');
    }
});

/*****************************************************/

let list = document.querySelectorAll(".header .links a");
let arrList = [...list];


window.addEventListener("scroll" , function(el){
    let sections = document.querySelectorAll(".main-content > div");
    let current = '';
     sections.forEach(function(e){
        let sectiontop = e.offsetTop;
        let sectionheight = e.clientHeight;
        if (window.scrollY >= sectiontop - 100 && window.scrollY < sectiontop + sectionheight){
             current = e.getAttribute("id");
        }
    })
    list.forEach(function(item){
        item.classList.remove("active");
        if(item.getAttribute("data-scroll") == current){
            item.classList.add("active");
        }
    })
    
})

arrList.forEach(function(e){
    e.addEventListener("click" , function(el){
        headerNav.classList.remove('show');
        listIcon.firstElementChild.classList.remove('fa-xmark');
        listIcon.firstElementChild.classList.add('fa-bars');
        window.animate({
            scrollTo: document.getElementById(e.getAttribute("data-scroll")).offsetTop
        }, 2000)
        // window.scrollTo
        arrList.forEach(function(r){
            r.classList.remove("active");
        });
        this.classList.add("active")
    })
})

/*********************************************************/

let element = document.querySelectorAll(".about-stats__stat h4 span");
let aboutsection = document.querySelector('.main-content__about');
let start = false;

function numberIncrease(el){
    let num = el.dataset.number;
    let interval = setInterval(function (){
        if(el.textContent == num ){
            clearInterval(interval)
        }else{
            el.textContent++;
        }
    } , 2000 / num);
}

window.addEventListener("scroll" , function (e){
    if(window.scrollY >= aboutsection.offsetTop){
        if(!start){
            element.forEach(function (n){
                numberIncrease(n)
            })
        }
        start = true;
    }
})

/************************************************************/

let resSpan = document.querySelectorAll(".skills .skill span");
let resSection = document.querySelector('.main-content__resume');

window.addEventListener("scroll" , function(e){
    if(window.scrollY >= resSection.offsetTop + 400){
        resSpan.forEach(function (span){
            let width = span.parentNode.dataset.progress;
            span.style.width = width
        })
    }
})

/*************************************************************/
let html = document.querySelector("html");
let darkmode = html.dataset.theme;
let darkbtn = document.querySelector(".switcher .mode i");
let settingsbtn = document.querySelector(".switcher .gear");
let colorsbtn = document.querySelectorAll(".switcher .colors li");
let colorArray = [...colorsbtn];
// let elementRoot = document.querySelector(':root');
// let maincolor = colorsbtn.dataset.color;
// console.log(elementRoot.setProperty('--main-color' , 'red'))

darkbtn.addEventListener("click" , function(e){
   if(darkbtn.classList.contains("fa-moon")){
     darkbtn.classList.remove('fa-moon');
     darkbtn.classList.add('fa-sun');
     if(darkmode === "light"){
        html.setAttribute('data-theme' , "dark")
    }
   }else{
    darkbtn.classList.add('fa-moon');
    darkbtn.classList.remove('fa-sun');
    html.setAttribute('data-theme' , "light")
   }
})

// show settings 
settingsbtn.addEventListener("click" , function(){
    this.parentNode.parentNode.classList.toggle('translate')
})

// change website colors
colorArray.forEach(function(btn){
    btn.addEventListener("click" , function(){
       let maincolor = btn.dataset.color;
       let root = document.querySelector(':root');
    //    root['--main-color'] = '#080';
    root.style.setProperty('--main-color' , maincolor)
    })
})

/*****************************************************/

let testimonials = document.querySelectorAll('.testimonials-container .testimonial');
let testiArray = [...testimonials];
let pagenations = document.querySelector('.pagenation');
let media_query = 'screen and (min-width:320px) and (max-width:991px)';
let matched = window.matchMedia(media_query).matches;
let current = 1;

// create pagenation
function createPagenation(){
  if(!matched){
    let bullets = document.createElement('ul');
    for(let i = 0 ; i < testiArray.length / 2 ; i++){
        let bulletsLi = document.createElement('li');
         bulletsLi.setAttribute('data-index' , i);
         bullets.appendChild(bulletsLi);
        }
        pagenations.appendChild(bullets);
    }else{
        let bullets = document.createElement('ul');
        for(let i = 0 ; i < testiArray.length ; i++){
            let bulletsLi = document.createElement('li');
               bullets.appendChild(bulletsLi);
               bulletsLi.setAttribute('data-index' , i);
            }
            pagenations.appendChild(bullets);
            console.log(pagenations);
    }
}
createPagenation();
let liList = document.querySelectorAll('.pagenation ul li');

function checker(){

    // remove active class 
    removeActive()

    liList[current - 1].classList.add('active');
    console.log(liList[current - 1])

    testiArray[current - 1].classList.add('active');
    
    testiArray[current].classList.add('active');
}

checker();

function removeActive(){
    liList.forEach(function(bullet){
        bullet.classList.remove('active')
    })
    testiArray.forEach(function(slide){
        slide.classList.remove('active')
    })
}

// for(i = 0 ; i < liList.length ; i++){
//     if(matched){
//        liList[i].addEventListener('click' , function(){
//         removeActive();
        
//        })
//     }
// }

