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

//------------------Enemy images------------------

let ENEMY_IMAGE = [];

ENEMY_IMAGE[0] = new Image();
ENEMY_IMAGE[0].src = 'res/img/enemy-left.png';

ENEMY_IMAGE[1] = new Image();
ENEMY_IMAGE[1].src = 'res/img/enemy-right.png';

ENEMY_IMAGE[2] = new Image();
ENEMY_IMAGE[2].src = 'res/img/enemy-up.png';

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