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
                        // console.log('a');
                        that.coords[0] -= that.speed;
                        // console.log(that.coords[0]);
                    }
                    break;
                case 'w':
                    if (that.up()) {
                        that.direction = 'up';
                        // console.log('w');
                        that.coords[1] -= that.speed;
                        // console.log(that.coords[1]);
                    }
                    break;
                case 'd':
                    if (that.coords[0] < borders[1] && that.leftAndRight()) {
                        that.direction = 'right';
                        // console.log('d');
                        that.coords[0] += that.speed;
                        // console.log(that.coords[0]);
                    }
                    break;
                case 's':
                    if (that.down()) {
                        that.direction = 'down';
                        // console.log('s');
                        that.coords[1] += that.speed;
                        // console.log(that.coords[1]);
                        break;
                    }
            }
        });
    }
}