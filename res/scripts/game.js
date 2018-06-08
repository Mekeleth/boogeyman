function start() {
    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');

    let kod = 'a';

    let bonus = 2000;
    let men = 4;
    let score = 0;
    let highestScore = 0;

    let player = new Player([490, 335], playerImages);
    let enemy1 = new NPC([100, 90], enemyImages);
    let enemy2 = new NPC([200, 90], enemyImages);
    let ball = new Ball('res/img/ball.png', [60, 90]);
    let OPENING = document.getElementById('opening');
    ctx.drawImage(OPENING, 0, 0);

    draw(bonus, men, score, highestScore, kod, ctx, player, ball, enemy1, enemy2);
}

function playerDraw(ctx, player, direction, axis) {
    ctx.beginPath();
    if (player.coords[axis] % 2 === 0) ctx.drawImage(player.images[`${direction}1`], player.coords[0], player.coords[1]);
    else ctx.drawImage(player.images[`${direction}2`], player.coords[0], player.coords[1]);
    ctx.stroke();
}

//rysowanie
function draw(bonus, men, score, highestScore, kod, ctx, player, ball, enemy1, enemy2) {
    window.addEventListener('keypress', function (event) {
        kod = event.key;
        if (event.code === 'Space') {
            ctx.clearRect(0, 0, 600, 440);
        }
    });
    let img = document.getElementById('plansza');
    let game = setInterval(function () {
        ctx.clearRect(0, 0, 600, 440);
        ctx.drawImage(img, 0, 0);
        ctx.drawImage(ball.image, ball.coords[0], ball.coords[1]);
        enemy1.move();
        enemy2.move();
        ctx.drawImage(enemy1.currentImage, enemy1.coords[0], enemy1.coords[1]);
        ctx.drawImage(enemy2.currentImage, enemy2.coords[0], enemy2.coords[1]);
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
            ball.intercepted = true;
        }

        if(ball.intercepted && player.coords[0] === borders[1] && player.coords[1] === floors[0]) {
            console.log('WIN!');
            score += 200+bonus;
            clearInterval(game);
            ball.image.src = 'res/img/ball.png';
            ball.intercepted = false;
            draw(2000, men, score, highestScore, 'a', ctx, player, ball, enemy1, enemy2);
        }
    }, 1000 / 24);
}

window.onload = function () {
    start();
};