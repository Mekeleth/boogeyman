function start(ctx) {
    let kod = 'a';

    let bonus = 1200;
    let men = 0;
    let score = 0;
    let highestScore = localStorage.getItem(`winner1`) ? JSON.parse(localStorage.getItem(`winner1`)).score : 0;

    let player = new Player([490, 335], playerImages);
    let enemy1 = new NPC([100, 85], enemyImages);
    let enemy2 = new NPC([200, 85], enemyImages);
    let ball = new Ball('res/img/ball.png', [60, 90]);
    ctx.fillStyle = 'white';
    ctx.font = '13pt commodore64';
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
        ctx.fillText(bonus, 78, 85);
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

        killPLayer(player, game, men, [enemy1, enemy2], ball, scoreCheck, score, highestScore, ctx);

        if (ball.intercepted && player.coords[0] === borders[1] && player.coords[1] === floors[0]) {
            clearInterval(game);
            score += bonus;
            enemy1.coords = [100, 85];
            enemy2.coords = [200, 85];
            enemy1.direction = enemy2.direction = 'left';
            ball.image.src = 'res/img/ball.png';
            ball.intercepted = false;
            scoreCheck = false;
            draw(1200, men, score, highestScore, 'a', ctx, player, ball, enemy1, enemy2);
        }
    }, 1000 / 24);
}

function killPLayer(player, game, men, enemies, ball, scoreCheck, score, highestScore, ctx) {
    enemies.forEach(function (el) {
        if (enemyInRange(el, player)) {
            clearInterval(game);
            if (men) {
                --men;
                setTimeout(function () {
                    player.coords = [490, 335];
                    enemies[0].coords = [100, 85];
                    enemies[1].coords = [200, 85];
                    enemies[0].direction = enemies[1].direction = player.direction = 'left';
                    ball.image.src = 'res/img/ball.png';
                    ball.intercepted = false;
                    scoreCheck = false;
                    draw(1200, men, score, highestScore, 'a', ctx, player, ball, enemies[0], enemies[1]);
                }, 2000);
            }
            else {
                setTimeout(function () {
                    gameOver(ctx, score);
                }, 2000);
            }
        }
    })
}

function enemyInRange(e, p) {
    return (e.coords[0] - 30 <= p.coords[0] &&
        e.coords[0] + 30 >= p.coords[0] &&
        e.coords[1] - 35 <= p.coords[1] &&
        e.coords[1] + 10 >= p.coords[1]);
}

function gameOver(ctx, score) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 600, 440);
    ctx.font = '13pt commodore64';
    if (typeof(Storage) !== 'undefined') {
        let numberOfWinners;
        for (let i = 1; i <= 10; ++i) {
            if (!localStorage.getItem(`winner${i}`)) {
                numberOfWinners = i - 1;
                break;
            }
        }
        if (numberOfWinners === 10 && score < parseInt(localStorage.getItem(`winner${numberOfWinners}`).score)) {
            displayHallOfFame(ctx);
        }
        else {
            ctx.fillStyle = 'green';
            ctx.fillText('*******   WELL DONE!   *******', 100, 50);
            ctx.fillText('YOU ARE IN THE HALL OF FAME.', 100, 90);
            ctx.fillText('PLEASE ENTER YOUR NAME BELOW.', 100, 130);
            ctx.fillStyle = 'white';
            ctx.fillText('PRESS "ENTER" TO ENTER A CHARACTER', 100, 170);
            ctx.fillText('MAX. LENGTH 10 CHARACTERS', 100, 210);

            let playerName = '';

            document.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    let playerData = {
                        name: playerName,
                        score: score
                    };
                    localStorage.setItem(`winner${numberOfWinners + 1}`, JSON.stringify(playerData));
                    if(numberOfWinners > 1){
                        for (let i = 1; i <= numberOfWinners; ++i) {
                            if (JSON.parse(localStorage.getItem(`winner${i + 1}`)).score > JSON.parse(localStorage.getItem(`winner${i}`)).score) {
                                let pom = localStorage.getItem(`winner${i + 1}`);
                                localStorage.setItem(`winner${i + 1}`, localStorage.getItem(`winner${i}`));
                                localStorage.setItem(`winner${i}`, pom);
                                i = 0;
                            }
                        }
                    }
                    displayHallOfFame(ctx);
                }
                else if (playerName.length < 10) {
                    playerName += e.key;
                    ctx.fillText(playerName, 100, 270);
                }
            });
        }
    }
    else {
        ctx.fillStyle = 'white';
        ctx.fillText('Unable to save data! Make sure your browser supports localStorage.', 50, 90);
    }
}

function displayHallOfFame(ctx) {
    let hall = [];
    for (let i = 1; i <= 10; ++i) {
        let item = localStorage.getItem(`winner${i}`);
        if (item) hall.push(JSON.parse(item));
        else break;
    }
    console.log(hall);
    const space = 30;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 600, 440);
    ctx.fillStyle = 'white';
    ctx.font = '40pt commodore64';
    ctx.fillText('Hall Of Fame', 50, 80);
    ctx.font = '15pt commodore64';
    let yAxis = 130;
    hall.forEach(function (el, i) {
        ctx.fillStyle = getRandomColor();
        ctx.fillText(`${i + 1}.    ${el.score}. . . . .${el.name}`, 100, yAxis);
        yAxis += space;
    });
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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