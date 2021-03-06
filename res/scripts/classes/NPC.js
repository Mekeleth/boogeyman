class NPC extends MainClass {
    constructor(coords, images) {
        super(coords, images);
        this.defaultMove = true;
        this.playerVisible = false;
        this.previouslyVisible = false;
        this.previousHorizontalDirection = this.direction;
        this.currentImage = this.images.left;
        this.speed = this.speed - 2.5;
    }

    trackPlayer(playerX) {
        if (playerX) {
            if (!this.playerVisible) {
                if (this.coords[0] === playerX) {
                    this.previouslyVisible = false;
                    this.defaultMove = true;
                    let check = true;
                    if (this.floor < ladders.length) {
                        for (let j = 0; j < ladders[this.floor].length; ++j) {
                            if (this.coords[0] === ladders[this.floor][j]) {
                                this.direction = 'up';
                                this.move();
                                check = false;
                                break;
                            }
                        }
                    }
                    else if (check) {
                        for (let j = 0; j < ladders[this.floor - 1].length; ++j) {
                            if (this.coords[0] === ladders[this.floor - 1][j]) {
                                this.direction = 'down';
                                this.move();
                                break;
                            }
                        }
                    }
                }
                else {
                    // console.log('still');
                    this.move();
                }
            }
            else this.move();

        }
        else {
            if (this.direction === 'up' || this.direction === 'down') {
                for (let i = 0; i < floorsNPC.length; ++i) {
                    if (this.coords[1] === floorsNPC[i]) this.direction = this.previousHorizontalDirection;
                }
            }
            else {
                let currentFloor;
                let canAscend = false;
                let canDescend = false;
                for (let i = 0; i < floorsNPC.length; ++i) {
                    if (this.coords[1] === floorsNPC[i]) {
                        currentFloor = i;
                        break;
                    }
                }
                if (ladders[currentFloor]) {
                    for (let i = 0; i < ladders[currentFloor].length; ++i) {
                        if (this.coords[0] === ladders[currentFloor][i]) {
                            canAscend = true;
                            break;
                        }
                    }
                }
                if (ladders[currentFloor - 1]) {
                    for (let i = 0; i < ladders[currentFloor - 1].length; ++i) {
                        if (this.coords[0] === ladders[currentFloor - 1][i]) {
                            canDescend = true;
                            break;
                        }
                    }
                }
                if (canAscend) {
                    if (Math.round(Math.random())) this.direction = 'up';
                }
                else if (canDescend) {
                    if (Math.round(Math.random())) this.direction = 'down';
                }
            }
            this.move();
        }
    }

    move() {
        this.currentImage = this.images[`${this.direction}`];
        switch (this.direction) {
            case 'left':
                if (this.coords[0] === borders[0]) {
                    this.direction = 'right';
                    this.previousHorizontalDirection = this.direction;
                }
                else this.coords[0] -= this.speed;
                break;
            case 'right':
                if (this.coords[0] === borders[1]) {
                    this.direction = 'left';
                    this.previousHorizontalDirection = this.direction;
                }
                else this.coords[0] += this.speed;
                break;
            case 'up':
                if (this.up(floorsNPC))
                    this.coords[1] -= this.speed;
                else {
                    this.direction = this.previousHorizontalDirection;
                    this.move();
                }
                break;
            case 'down':
                if (this.down(floorsNPC))
                    this.coords[1] += this.speed;
                else {
                    this.direction = this.previousHorizontalDirection;
                    this.move();
                }
        }
    }

    seePlayer(player, previousCoords) {
        if (this.coords[1] - 10 === player.coords[1]) {
            if ((this.direction === 'left' && this.coords[0] > player.coords[0]) || (this.direction === 'right' && this.coords[0] < player.coords[0])) {
                this.playerVisible = true;
                this.defaultMove = false;
                return player.coords[0];
            }
        }
        else if (this.playerVisible) {
            this.playerVisible = false;
            this.previouslyVisible = true;
            return player.coords[0];
        }
        else if (this.previouslyVisible && !this.defaultMove) {
            return previousCoords;
        }
        return false;
    }

    getFloor() {
        for (let i = 0; i < floorsNPC.length; ++i) {
            if (this.coords[1] === floorsNPC[i]) return i;
        }
    }

    get floor() {
        return this.getFloor();
    }
}