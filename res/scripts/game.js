function start(ctx) {
    let kod = 'a';

    let bonus = 1200;
    let men = 4;
    let score = 0;
    let highestScore = 0;

    let player = new Player([490, 335], playerImages);
    let enemy1 = new NPC([100, 85], enemyImages);
    let enemy2 = new NPC([200, 85], enemyImages);
    let ball = new Ball('res/img/ball.png', [60, 90]);
    ctx.fillStyle = 'white';
    ctx.font = '13pt Courier bold';
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
    });
    let img = document.getElementById('plansza');
    let scoreCheck = false;
    let found1, found2;
    let game = setInterval(function () {
        if (bonus) --bonus;

        ctx.clearRect(0, 0, 600, 440);
        ctx.drawImage(img, 0, 0);
        ctx.fillText(bonus, 85, 85);
        ctx.fillText(men, 235, 85);
        ctx.fillText(highestScore, 350, 85);
        ctx.fillText(score, 500, 85);
        ctx.drawImage(ball.image, ball.coords[0], ball.coords[1]);
        found1 = enemy1.seePlayer(player, found1);
        found2 = enemy2.seePlayer(player, found2);
        enemy1.trackPlayer(found1);
        enemy2.trackPlayer(found2);
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
            ball.image.src = '';
            ball.intercepted = true;
        }

        if (ball.intercepted && !scoreCheck) {
            scoreCheck = true;
            score += 200;
        }

        if (ball.intercepted && player.coords[0] === borders[1] && player.coords[1] === floors[0]) {
            clearInterval(game);
            score += bonus;
            console.log('WIN!', score);
            enemy1.coords = [100, 90];
            enemy2.coords = [200, 90];
            enemy1.direction = enemy2.direction = 'left';
            ball.image.src = 'res/img/ball.png';
            ball.intercepted = false;
            scoreCheck = false;
            draw(1200, men, score, highestScore, 'a', ctx, player, ball, enemy1, enemy2);
        }
    }, 1000 / 24);
}

window.onload = function () {
    let ctx = document.getElementById('canvas').getContext('2d');
    let OPENING = document.getElementById('opening');
    ctx.drawImage(OPENING, 0, 0);
    const startGame = (event) => {
        if (event.code === 'Space') {
            document.removeEventListener('keydown', startGame);
            start(ctx);
        }
    };
    document.addEventListener('keydown', startGame);
};