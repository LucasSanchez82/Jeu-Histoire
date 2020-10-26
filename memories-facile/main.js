let cards = document.querySelectorAll('.card_inner')
let firstClick = false
let counter = 0
let cardPair = []
let score = document.querySelector("#score").innerHTML
let srcs = ['IMG 1', 'IMG 2', 'IMG 3', 'IMG 4', 'IMG 5', 'IMG 6', 'IMG 7', 'IMG 8', 'IMG 9', 'IMG 10','IMG 1', 'IMG 2', 'IMG 3', 'IMG 4', 'IMG 5', 'IMG 6', 'IMG 7', 'IMG 8', 'IMG 9', 'IMG 10'];

// c'est bien juste card dans le foreach, je crois que c'est un argument
cards.forEach((card) => {
    card.state = 'unclicked'
})

shuffle()

for(let i = 0; i<cards.length; i++){
    cards[i].addEventListener('click', ()=>{
        if(!firstClick){time()}
        firstClick = true

        if(cards[i].state == 'unclicked'){
            cards[i].style.transform = 'rotateY(180deg)'
            cards[i].state = 'clicked'
            counter++
            cardPair.push(cards[i])
            check()
        }

        else if(cards[i].state == 'clicked'){
            cards[i].style.transform = 'rotateY(0deg)'
            cards[i].state = 'unclicked'
            counter--
            cardPair = []
        }
    })
}

function check(){
    if(counter==2){
        if(  cardPair[0].querySelector('img').src== cardPair[1].querySelector('img').src){
            // alert(srcs[0])
            
            scoreChangeMore()


            
        }
        else{
            unmatched(cardPair[0],cardPair[1])
        }
    }
}
function scoreChangeMore() {
    document.getElementById('scoreAnimation').style.background = 'linear-gradient(35deg, #000000 0%, #2c5538 35%, #47a764 70%, #02ff4e 100%)'
    document.getElementById('scoreAnimation').innerHTML = '+1';
    matched()
    requestAnimationFrame(scoreAnimation)

}
function scoreChangeLess() {
    document.getElementById('scoreAnimation').style.background = 'linear-gradient(45deg, #240000 0%, #5c1313 35%, #c77171 70%, #e69090 100%)';
    document.getElementById('scoreAnimation').innerHTML = '+0';
    requestAnimationFrame(scoreAnimation)
}
let i = 1
let j = 450
function scoreAnimation() {

    if(i < 450){
        
        if(i<250){i = i*1.08}else{i = i*(262/252)}
        
        document.getElementById('scoreAnimation').style.right = i+ 'px';
        document.getElementById('scoreAnimation').style.opacity = i/458;
        j = 450
        requestAnimationFrame(scoreAnimation)
    }else if(j>1){
        j = j*0.97
        document.getElementById('scoreAnimation').style.right =  j +'px';
        document.getElementById('scoreAnimation').style.opacity = j/277;
        if(j>1){
            requestAnimationFrame(scoreAnimation)
        }else{
            i=1
        }
    }

}

function matched(){
    cardPair[0].state = 'blocked'
    cardPair[1].state = 'blocked'
    counter = 0
    cardPair = []
    
    score++
    document.querySelector('#score').innerHTML = score
    return score
}

function unmatched(x,y){
    setTimeout(() => {
        x.style.transform = 'rotateY(0deg)'
        y.style.transform = 'rotateY(0deg)'
    }, 750)
    cardPair[0].state = 'unclicked'
    cardPair[1].state = 'unclicked'
    counter = 0
    cardPair = []
}
function time(){

    if (score <10){
        setTimeout( timer(), 1000);
    }
}
let secs = 0
let mins = 0
let SS
let MM
function timer(){
    setTimeout(() => {
        secs++
        if(secs==60){secs=0;mins++}
    
        secs<10?SS=`0${secs}`:SS=`${secs}`
        mins<10?MM=`0${mins}`:MM=`${mins}`
    
        document.querySelector('#time').innerHTML = `${MM}:${SS}`
        if(score != 10){ timer() }
    }, 1000);

}

function shuffle(){
    let images = document.querySelectorAll('img')
//   'images/img11.jpg', 'images/img12.jpg', 'images/img13.jpg', 'images/img14.jpg', 'images/img15.jpg', 'images/img16.jpg', 'images/img17.jpg', 'images/img18.jpg', 'images/img19.jpg', 'images/img20.jpg',
    for(let i=srcs.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
    }
    
    for(let i = 0; i<images.length; i++){
        images[i].src = "images/"+srcs[i].split(" ").join("").toLowerCase() +".jpg"

    }

}
