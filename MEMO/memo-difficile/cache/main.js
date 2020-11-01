let cards = document.querySelectorAll('.card_inner')
let cardsOuter = document.querySelectorAll('.card_outer')
let cardsFront = document.querySelectorAll('.front')
let cardsBack = document.querySelectorAll('.back')
let firstClick = false
let counter = 0
let cardPair = []
let cardPairOuter = []
let cardPairFront = []
let cardPairBack  = []
let score = document.querySelector("#score").innerHTML
let srcs = ['Sacre De Napoleon', 'Sacre de Napoleon', '1er abdication de napoleon', '1er abdication de napoleon', 'bataille de ligny(belgique)', 'bataille de ligny(belgique)', 'bataille de waterlo', 'bataille de waterlo', 'fin du congres de Vienne', 'fin du congres de Vienne', 'fuite de Louis XIII', 'fuite de Louis XIII', 'mort de Napoleon a Saint-Helene', 'mort de Napoleon a Saint-Helene', 'ouverture du congres de Vienne', 'ouverture du congres de Vienne', "retour de napoleonde l'ile d'elbe", "retour de napoleonde l'ile d'elbe", 'seconde abdication de napoleon','seconde abdication de napoleon',  ];
let tour=0
// c'est bien juste card sans "s" dans le foreach, c'est un argument
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
            cardPairOuter.push(cardsOuter[i])
            cardPair.push(cards[i])
            cardPairFront.push(cardsFront[i])
            cardPairBack.push(cardsBack[i])
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
            verification()   
            tour++        
        }
        else{
            unmatched(cardPair[0],cardPair[1])
        }
    }
}
function verification() {
    let cardSrcName = cardPair[0].querySelector('img').src
    cardSrcName = cardSrcName.split('.')
    cardSrcName.pop()
    cardSrcName = cardSrcName.join()
    cardSrcName = cardSrcName.split('/')
    cardSrcName = cardSrcName.pop()


    // alert("ésrca" + srcsA)

    setTimeout(() => {
        let promptReply = prompt(`c\'est quoi/qui est illustré.e sur cette carte?  ||  ${srcs[0]} ||  ${srcs[1]} ||  ${srcs[2]} ||  ${srcs[3]} ||  ${srcs[4]} ||  ${srcs[5]} ||  ${srcs[6]} ||  ${srcs[7]} ||  ${srcs[8]} ||  ${srcs[9]} ||` )
        
        if(promptReply == null ){
            for (let k = 0; k < 10; k) {
                alert("interdit d'annuler, veuillez actualiser la page ou le cas échéant, relancer le jeu")
                
            }    
        }
        promptReply = promptReply.split(" ").join("").toLowerCase()
        if(promptReply == cardSrcName) {
            scoreChangeMore() //quand on repond vrai animation=>score+1
        }else{
            scoreChangeLess() //quand on repond faux animation=>score-1
        }
    }, 45);
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

    
    cardPair[0].state = 'blocked'
    cardPair[1].state = 'blocked'
    counter = 0
    cardPair = []
    cardPairFront = []
    cardPairBack = []
    
    cardPairOuter = []
}

function matched(){
    cardPair[0].state = 'blocked'
    cardPair[1].state = 'blocked'
/////////   \/     pour que les cartes disparraissent si reponse = vrai    \/    //////////// 
    // cardPair[0].style.display = 'none';
    // cardPair[1].style.display = 'none';

    cardPair[0].style.animation = 'scaleNone 1s ease forwards';
    cardPair[1].style.animation = 'scaleNone 1s ease forwards';
    setTimeout(() => {
        cardPairOuter[0].style.display = 'none';
        cardPairOuter[1].style.display = 'none';
        
        cardPairFront[0].style.display = 'none';
        cardPairBack[1].style.display = 'none';
        
        cardPairFront = []
        cardPairBack = []
        
        cardPairOuter = []
        cardPair = []
        // console.log('c ok');

            counter = 0

    }, 1000);
    counter=0

//////////////////////////                 /\                     /////////////////////////////////////
    
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
         cardPairFront = []
        cardPairBack = []
        
        cardPairOuter = []
    cardPair = []
}
function time(){

    if (tour <10){
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
        if(tour <10){ timer() }
    }, 1000);

}

function shuffle(){
    let images = document.querySelectorAll('img')
    for(let i=srcs.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
    }
    
    for(let i = 0; i<images.length; i++){
        images[i].src = "cache/images/"+srcs[i].split(" ").join("").toLowerCase() +".png"
    }

}





//////////////
let i = 1
let j = 450
function scoreAnimation() {

    if(i < 450){
        
        if(i<250){i = i*1.1}else{i = i*(262/252)}
        
        document.getElementById('scoreAnimation').style.right = i+ 'px';
        document.getElementById('scoreAnimation').style.opacity = i/458;
        j = 450
        requestAnimationFrame(scoreAnimation)
    }else if(j>1){
        j = j*0.9
        document.getElementById('scoreAnimation').style.right =  j +'px';
        document.getElementById('scoreAnimation').style.opacity = j/800;
        if(j>1){
            requestAnimationFrame(scoreAnimation)
        }else{
            i=1
        }
    }

}

// images[i].src = "cache/images/"+srcs[i].split(" ").join("").toLowerCase() +".png"
