const floors = [335, 270, 205, 140, 75];
const floorsNPC = floors.map(function (x) {
    return x + 10;
});
const ladders = [
    [180, 390],
    [80, 285, 495],
    [180, 390],
    [285]
];
const borders = [35, 525];

class MainClass {
    constructor(coords, images, direction = 'left') {
        this.direction = direction;
        this.images = images;
        this.coords = coords;
        this.speed = 5;
    }

    up(floors) {
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

    down(floors) {
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
                    if (this.coords[0] === ladders[i - 1][j]) {
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
        for (let i = 0; i < floors.length; i++) {
            if (this.coords[1] === floors[i]) {
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
        this.intercepted = false;
    }
}