const score = document.querySelector('.score'),
    start=document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea');
    car = document.createElement('div');
    car.classList.add('car');


const keys = {
    ArrowUP: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start:false,
    score:0,
    speed:3
};
start.addEventListener('click', startGame);


document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
function startGame() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
}
function startRun(event){
    event.preventDefault('true');
    keys[event.key] = true;
    requestAnimationFrame(playGame);

};

function playGame(){
    console.log('play game!');
    if(setting.start === true)
        requestAnimationFrame(playGame);
}

function stopRun(event) {
    event.preventDefault('true');
    keys[event.key] = false;

}
