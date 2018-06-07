class Interactive {
    constructor(images, direction, coords) {
        this.direction = direction;
        this.images = images;
        this.coords = coords;
    }
}

class NPC extends Interactive {
    constructor(images, direction, coords) {
        super(images, direction, coords);
    }
}

class Player extends Interactive {
    constructor(images, direction, coords) {
        super(images, direction, coords);
    }
}