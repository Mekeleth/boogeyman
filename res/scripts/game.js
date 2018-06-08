const SPEED = 5;

const playerImages = {
    left1: PLAYER_IMAGE[0],
    left2: PLAYER_IMAGE[1],
    right1: PLAYER_IMAGE[2],
    right2: PLAYER_IMAGE[3],
    up1: PLAYER_IMAGE[4],
    up2: PLAYER_IMAGE[5]
};
const enemyImages = {
    left: ENEMY_IMAGE[0],
    right: ENEMY_IMAGE[1],
    up: ENEMY_IMAGE[2]
};

function start() {
    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');

    let kod = 'a';

    let BONUS = 1000;
    let MEN = 4;
    let SCORE = 0;
    let HIGHEST_SCORE = 0;
    let BALL_INTERCEPTED = false;

    let player = new Player([490, 335], playerImages);
    let enemy1 = new NPC([100, 100], enemyImages);
    let enemy2 = new NPC([100, 200], enemyImages);
    let ball = new Ball('res/img/ball.png', [60, 90]);
    let OPENING = document.getElementById('opening');
    ctx.drawImage(OPENING, 0, 0);

    draw(kod, ctx, player, ball, enemy1, enemy2);
}

function playerDraw(ctx, player, direction, axis) {
    ctx.beginPath();
    if (player.coords[axis] % 2 === 0) ctx.drawImage(player.images[`${direction}1`], player.coords[0], player.coords[1]);
    else ctx.drawImage(player.images[`${direction}2`], player.coords[0], player.coords[1]);
    ctx.stroke();
}

//rysowanie
function draw(kod, ctx, player, ball, enemy1, enemy2) {
    window.addEventListener('keypress', function (event) {
        kod = event.key;
        if (event.code === 'Space') {
            ctx.clearRect(0, 0, 600, 440);
        }
    });
    let img = document.getElementById('plansza');
    setInterval(function () {
        ctx.clearRect(0, 0, 600, 440);
        ctx.drawImage(img, 0, 0);
        ctx.drawImage(ball.image, ball.coords[0], ball.coords[1]);
        switch (kod) {
            case 'w':
            case 's':
                playerDraw(ctx, player, 'up', 1);
                break;
            case 'a':
                playerDraw(ctx, player, 'left', 0);
                break;
            case 'd':
                playerDraw(ctx, player, 'right', 0);
                break;
            default:
                switch (player.direction) {
                    case 'left':
                        playerDraw(ctx, player, 'left', 0);
                        break;
                    case 'right':
                        playerDraw(ctx, player, 'right', 0);
                        break;
                    case 'up':
                    case 'down':
                        playerDraw(ctx, player, 'up', 1);
                }
        }

        if (player.coords[0] === ball.coords[0] && player.coords[1] === floors[4]) {
            console.log('ok');
            ball.image.src = '';
            BALL_INTERCEPTED = true;
        }
    }, 1000 / 24);
}

window.onload = function () {
    start();
};