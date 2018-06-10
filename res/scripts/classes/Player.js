class Player extends MainClass {
    constructor(coords, images) {
        super(coords, images);
        //zmiana pozycji gracza - tablica
        let that = this;
        window.addEventListener('keypress', function (event) {
            switch (event.key) {
                case 'a':
                    if (that.coords[0] > borders[0] && that.leftAndRight()) {
                        that.direction = 'left';
                        that.coords[0] -= that.speed;
                    }
                    break;
                case 'w':
                    if (that.up(floors)) {
                        that.direction = 'up';
                        that.coords[1] -= that.speed;
                    }
                    break;
                case 'd':
                    if (that.coords[0] < borders[1] && that.leftAndRight()) {
                        that.direction = 'right';
                        that.coords[0] += that.speed;
                    }
                    break;
                case 's':
                    if (that.down(floors)) {
                        that.direction = 'down';
                        that.coords[1] += that.speed;
                        break;
                    }
            }
        });
    }
}