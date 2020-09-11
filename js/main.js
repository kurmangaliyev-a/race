const score = document.querySelector('.score');
const start=document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
car = document.createElement('div');
car.classList.add('car');

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


start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const audio = document.createElement('audio');

audio.src ='audio.mp3';
audio.volume=0.7;

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement +1;
}



function startGame() {
    SETTING.speed = 3;
    gameArea.innerHTML = '';
    SETTING.score = 0;
    audio.play();
    start.classList.add('hide');
    gameArea.classList.remove('hide');
    score.classList.remove('hide');
    for (let i = 0; i < getQuantityElements(100);i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top=(i*100)+'px';
        line.y = i*100;
        gameArea.append(line);
    }
    for(let i=0; i<getQuantityElements(100* SETTING.traffic);i++){
        const enemy = document.createElement('div');
        const randomEnemy = Math.floor(Math.random()*MAX_ENEMY)+1;
        enemy.classList.add('enemy');
        enemy.y =- 100*SETTING.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50 ))+ 'px';
        enemy.style.top = enemy.y +'px';
        enemy.style.background =`transparent url(./image/enemy${randomEnemy}.png) center / cover`;
        gameArea.append(enemy);
    }


    SETTING.start = true;
    gameArea.append(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.bottom = '10px';
    car.style.top = 'auto';

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
        if(item.y >= document.documentElement.clientHeight){
            item.y=-100;
        }
    });
}
function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && carRect.right >= enemyRect.left && carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top ){
            SETTING.start=false;
            audio.pause();
            audio.currentTime = 0;
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
        }


        item.y += SETTING.speed/2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100*SETTING.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}
