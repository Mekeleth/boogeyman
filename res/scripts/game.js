const SPEED = 5;
let kod = 'a';
let c = document.getElementById('canvas');
let ctx = c.getContext('2d');

//------------------Players images------------------
let PLAYER_IMAGE = [];

PLAYER_IMAGE[0] = new Image();
PLAYER_IMAGE[0].src = 'res/img/man-left-1.png';

PLAYER_IMAGE[1] = new Image();
PLAYER_IMAGE[1].src = 'res/img/man-left-2.png';

PLAYER_IMAGE[2] = new Image();
PLAYER_IMAGE[2].src = 'res/img/man-right-1.png';

PLAYER_IMAGE[3] = new Image();
PLAYER_IMAGE[3].src = 'res/img/man-right-2.png';

PLAYER_IMAGE[4] = new Image();
PLAYER_IMAGE[4].src = 'res/img/man-up-1.png';

PLAYER_IMAGE[5] = new Image();
PLAYER_IMAGE[5].src = 'res/img/man-up-2.png';

const playerImages = {
    left1: PLAYER_IMAGE[0],
    left2: PLAYER_IMAGE[1],
    right1: PLAYER_IMAGE[2],
    right2: PLAYER_IMAGE[3],
    up1: PLAYER_IMAGE[4],
    up2: PLAYER_IMAGE[5]
};

//------------------Enemy images------------------

let ENEMY_IMAGE = [];

ENEMY_IMAGE[0] = new Image();
ENEMY_IMAGE[0].src = 'res/img/enemy-left.png';

ENEMY_IMAGE[1] = new Image();
ENEMY_IMAGE[1].src = 'res/img/enemy-right.png';

ENEMY_IMAGE[2] = new Image();
ENEMY_IMAGE[2].src = 'res/img/enemy-up.png';

const enemyImages = {
    left: ENEMY_IMAGE[0],
    right: ENEMY_IMAGE[1],
    up: ENEMY_IMAGE[2]
};

//-----------------Class instances----------------

let ENEMY_COORDS = [
    [100, 100],
    [100, 200]
];

let PLAYER_COORDS = [490, 335];

let player = new Player(playerImages, 'left', PLAYER_COORDS);
let enemy1 = new NPC(enemyImages, 'left', ENEMY_COORDS[0]);
let enemy2 = new NPC(enemyImages, 'left', ENEMY_COORDS[1]);
let ball = new Image();
ball.src = 'res/img/ball.png';


let BONUS = 1000;
let MEN = 4;
let SCORE = 0;
let HIGHEST_SCORE = 0;
let BALL_INTERCEPTED = false;

// let BALL_COVER = new Image();
// BALL_COVER.src = 'res/img/ball-cover.png';

//zmiana pozycji gracza - tablica
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'a':
            console.log('a');
            PLAYER_COORDS[0] -= SPEED;
            console.log(PLAYER_COORDS[0]);
            break;

        case 'w':
            console.log('w');
            PLAYER_COORDS[1] -= SPEED;
            console.log(PLAYER_COORDS[1]);
            break;

        case 'd':
            console.log('d');
            PLAYER_COORDS[0] += SPEED;
            console.log(PLAYER_COORDS[0]);
            break;

        case 's':
            console.log('s');
            PLAYER_COORDS[1] += SPEED;
            console.log(PLAYER_COORDS[1]);
            break;
    }
});

function drawBoard() {

    let img = document.getElementById('plansza');
    ctx.drawImage(img, 0, 0);

}


function check() {
    window.addEventListener('keypress', function (event) {
        kod = event.key;
    });
}

//rysowanie
function draw() {
    check();

    setInterval(function () {
        ctx.clearRect(0, 0, 600, 440);
        drawBoard();
        ctx.drawImage(ball, 50, 90);
        // ctx.drawImage(PLAYER_IMAGE[4], 391, 335);

        //a
        if (kod === 'a') {
            if (PLAYER_COORDS[0] % 2 === 0) {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[0], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[1], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
        }
        //w
        else if (kod === 'w') {
            if (PLAYER_COORDS[1] % 2 === 0) {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[4], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[5], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
        }
        //d
        else if (kod === 'd') {
            if (PLAYER_COORDS[0] % 2 === 0) {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[2], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[3], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
        }
        //s
        else if (kod === 's') {
            if (PLAYER_COORDS[1] % 2 === 0) {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[4], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.drawImage(PLAYER_IMAGE[5], PLAYER_COORDS[0], PLAYER_COORDS[1]);
                ctx.stroke();
            }
        }

        if ((PLAYER_COORDS[0] === 61 || PLAYER_COORDS[0] === 64) && PLAYER_COORDS[1] === 71) {
            console.log('ok');
            // ctx.drawImage(BALL_COVER, 50, 90);
            BALL_INTERCEPTED = true;
        }

        // if ()


    }, 1000 / 24);

}

function start() {
    let OPENING = document.getElementById('opening');
    ctx.drawImage(OPENING, 0, 0);
    window.addEventListener('keypress', function (event) {
        if (event.code === 'Space') {
            ctx.clearRect(0, 0, 600, 440);
            draw();
        }
    })
}


window.onload = function () {
    start();
    // draw();
};