const score = document.querySelector('.score');
const start=document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
car = document.createElement('div');
car.classList.add('car');
const HEIGHT_ELEM =100;

let SETTING = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

const MAX_ENEMY = 9;

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};


const countSection = Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM);
gameArea.style.height = countSection * HEIGHT_ELEM;


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const audio = document.createElement('audio');

audio.src ='audio.mp3';
audio.volume=0.7;

function getQuantityElements(heightElement) {
    return (gameArea.offsetHeight / heightElement) +1;
}



function startGame() {
    SETTING.speed = 3;
    gameArea.innerHTML = '';
    SETTING.score = 0;
    audio.play();
    start.classList.add('hide');
    gameArea.classList.remove('hide');
    score.classList.remove('hide');
    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM);i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * HEIGHT_ELEM)+'px';
        line.y = i * HEIGHT_ELEM;
        gameArea.append(line);
    }
    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM* SETTING.traffic);i++){
        const enemy = document.createElement('div');
        const randomEnemy = Math.floor(Math.random()*MAX_ENEMY)+1;
        enemy.classList.add('enemy');
        enemy.y = - HEIGHT_ELEM*SETTING.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - car.offsetWidth ))+ 'px';
        enemy.style.top = enemy.y +'px';
        enemy.style.background =`transparent url(./image/enemy${randomEnemy}.png) center / cover`;
        gameArea.append(enemy);
    }


    SETTING.start = true;
    gameArea.append(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.bottom = '10px';
    car.style.top = 'auto';
    car.style.background = `transparent url(./image/player.png) center / cover`;
    SETTING.x=car.offsetLeft;
    SETTING.y=car.offsetTop;
    requestAnimationFrame(playGame);
}


function playGame() {

    if (SETTING.start) {
        SETTING.score+=SETTING.speed;
        score.innerHTML = 'SCORE<br> ' + Math.floor(SETTING.score);
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && SETTING.x>0){
            SETTING.x -= SETTING.speed;
        }
        if (keys.ArrowRight && SETTING.x < (gameArea.offsetWidth - car.offsetWidth)) {
            SETTING.x += SETTING.speed;
        }
        if (keys.ArrowUp && SETTING.y > 0) {
            SETTING.y -= SETTING.speed;
        }
        if (keys.ArrowDown && SETTING.y < (gameArea.offsetHeight-car.offsetHeight)) {
            SETTING.y += SETTING.speed;
        }
        car.style.left = SETTING.x + 'px';
        car.style.top = SETTING.y + 'px';
        requestAnimationFrame(playGame);
        SETTING.speed+=0.005;
    }

}
function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;

};
function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;

}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){
        item.y += SETTING.speed*2;
        item.style.top = item.y + 'px';
        if(item.y >= gameArea.offsetHeight){
            item.y = -HEIGHT_ELEM;
        }
    });
}
function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top+2 <= enemyRect.bottom-2 && carRect.right-2 >= enemyRect.left+2 && carRect.left+2 <= enemyRect.right-2 && carRect.bottom-2 >= enemyRect.top+2 ){
            SETTING.start=false;
            audio.pause();
            audio.currentTime = 0;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
        }


        item.y += SETTING.speed/2;
        item.style.top = item.y + 'px';
        if (item.y >= gameArea.offsetHeight) {
            item.y = -HEIGHT_ELEM*SETTING.traffic;
            console.log(item.style.left);
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-car.offsetWidth))+'px';
        }
    });
}
