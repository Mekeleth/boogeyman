const floors = [335, 270, 205, 140, 75];
const ladders = [
    [180, 390],
    [80, 285, 495],
    [180, 390],
    [285]
];
const borders = [35, 525];

class Interactive {
    constructor(coords, images, direction = 'left') {
        this.direction = direction;
        this.images = images;
        this.coords = coords;
    }
}

class NPC extends Interactive {
    constructor(coords, images) {
        super(coords, images);
    }
}

class Player extends Interactive {
    constructor(coords, images) {
        super(coords, images);
        //zmiana pozycji gracza - tablica
        let that = this;
        window.addEventListener('keypress', function (event) {
            console.log(that);
            switch (event.key) {
                case 'a':
                    if (that.coords[0] > borders[0] && that.leftAndRight()) {
                        that.direction = 'left';
                        console.log('a');
                        that.coords[0] -= SPEED;
                        console.log(that.coords[0]);
                    }
                    break;
                case 'w':
                    if (that.up()) {
                        that.direction = 'up';
                        console.log('w');
                        that.coords[1] -= SPEED;
                        console.log(that.coords[1]);
                    }
                    break;
                case 'd':
                    if (that.coords[0] < borders[1] && that.leftAndRight()) {
                        that.direction = 'right';
                        console.log('d');
                        that.coords[0] += SPEED;
                        console.log(that.coords[0]);
                    }
                    break;
                case 's':
                    if (that.down()) {
                        that.direction = 'down';
                        console.log('s');
                        that.coords[1] += SPEED;
                        console.log(that.coords[1]);
                        break;
                    }
            }
        });
    }

    up() {
        let check = false;
        for (let i = 0; i < floors.length - 1; ++i) {
            if (this.coords[1] === floors[i]) {
                for (let j = 0; j < ladders[i].length; ++j) {
                    if (this.coords[0] === ladders[i][j]) {
                        check = true;
                        break;
                    }
                }
                break;
            }
            else if (this.coords[1] < floors[i] && this.coords[1] > floors[i + 1]) {
                for (let j = 0; j < ladders[i].length; ++j) {
                    if (this.coords[0] === ladders[i][j]) {
                        check = true;
                        break;
                    }
                }
                break;
            }
        }
        return check;
    }

    down() {
        console.log(floors[floors.length - 1]);
        let check = false;
        for (let i = 1; i < floors.length; ++i) {
            if (this.coords[1] === floors[i]) {
                for (let j = 0; j < ladders[i - 1].length; ++j) {
                    if (this.coords[0] === ladders[i - 1][j]) {
                        check = true;
                        break;
                    }
                }
                break;
            }
            else if (this.coords[1] < floors[i - 1] && this.coords[1] >= floors[i]) {
                for (let j = 0; j < ladders[i - 1].length; ++j) {
                    if (this.coords[0] === ladders[i-1][j]) {
                        check = true;
                        break;
                    }
                }
                break;
            }
        }
        return check;
    }

    leftAndRight() {
        let check = false;
        for(let i =0; i<floors.length; i++){
            if(this.coords[1] === floors[i]) {
                check = true;
                break;
            }
        }
        return check;
    }
}

class Ball {
    constructor(imageSrc, coords) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.coords = coords;
    }
}