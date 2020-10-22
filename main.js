let cards = document.querySelectorAll('.card_inner')
let firstClick = false
let counter = 0
let cardPair = []
let score = document.querySelector("#score").innerHTML

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
            matched()
        }
        else{
            unmatched(cardPair[0],cardPair[1])
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
    console.log('dans time(). score: ' + score);

    if (score <2){
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
        mins<10?MM=`0${mins}`:SS=`${mins}`
    
        document.querySelector('#time').innerHTML = `${MM}:${SS}`
        if(score != 2){ timer() }
    }, 1000);

}

function shuffle(){
    let images = document.querySelectorAll('img')
    let srcs = ['images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img5.jpg', 'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg','images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img5.jpg', 'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg'];
//   'images/img11.jpg', 'images/img12.jpg', 'images/img13.jpg', 'images/img14.jpg', 'images/img15.jpg', 'images/img16.jpg', 'images/img17.jpg', 'images/img18.jpg', 'images/img19.jpg', 'images/img20.jpg',
    
    for(let i=srcs.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
    }
    
    for(let i = 0; i<images.length; i++){
        images[i].src = srcs[i]
    }
}
