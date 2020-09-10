const score = document.querySelector('.score');
const start=document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
car = document.createElement('div');
car.classList.add('car');

const SETTING = {
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

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement +1;
}



function startGame() {
    start.classList.add('hide');
    gameArea.classList.remove('hide');
    for (let i = 0; i < getQuantityElements(100);i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top=(i*100)+'px';
        line.y = i*100;
        gameArea.appendChild(line);
    }
    for(let i=0; i<getQuantityElements(100* SETTING.traffic);i++){
        const enemy = document.createElement('div');
        const randomEnemy = Math.floor(Math.random()*MAX_ENEMY)+1;
        enemy.classList.add('enemy');
        enemy.y =- 100*SETTING.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50 ))+ 'px';
        enemy.style.top = enemy.y +'px';
        enemy.style.background =`transparent url(../image/enemy${randomEnemy}.png) center / cover`;
        gameArea.appendChild(enemy);
    }


    SETTING.start = true;
    gameArea.appendChild(car);
    SETTING.x=car.offsetLeft;
    SETTING.y=car.offsetTop;
    requestAnimationFrame(playGame);
}


function playGame() {
    console.log(SETTING.speed);
    if (SETTING.start) {
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
    }

}
function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
    requestAnimationFrame(playGame);

};
function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;

}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){
        item.y += SETTING.speed;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y=-100;
        }
    });
}
function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        item.y += SETTING.speed+0.5;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100*SETTING.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}
