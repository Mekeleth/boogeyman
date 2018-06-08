class NPC extends MainClass {
    constructor(coords, images) {
        super(coords, images);
        this.seenPlayer = false;
        this.previousHorizontalDirection = this.direction;
        this.currentImage = this.images.left;
    }

    move() {
        this.currentImage = this.images[`${this.direction === 'down' ? 'up' : this.direction}`];
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
                this.coords[1] -= this.speed;
                break;
            case 'down':
                this.coords[1] += this.speed;
        }
    }

    seePlayer(player) {
        if (this.coords[1] === player.coords[1]) {
            if ((direction === 'left' && this.coords[0] > player.coords[0]) || (direction === 'right' && this.coords[0] < player.coords[0])) {
                this.seenPlayer = true;
                return true;
            }
        }
        return false;
    }
}