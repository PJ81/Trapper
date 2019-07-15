

class Resources {
    constructor(cb) {
        this.images = new Array(29);
        
        Promise.all([
            (loadImage("./img/game/arrow.png")).then((i) => {this.images[ARROW_L] = i;}),
            (loadImage("./img/game/boulder.png")).then((i) => {this.images[BOULDER] = i;}),
            (loadImage("./img/game/diamond.png")).then((i) => {this.images[DIAMOND]= i;}),
            (loadImage("./img/game/f0.png")).then((i) => {this.images[F0] = i;}),
            (loadImage("./img/game/f1.png")).then((i) => {this.images[F1] = i;}),
            (loadImage("./img/game/f2.png")).then((i) => {this.images[F2] = i;}),
            (loadImage("./img/game/f3.png")).then((i) => {this.images[F3] = i;}),
            (loadImage("./img/game/f4.png")).then((i) => {this.images[F4] = i;}),
            (loadImage("./img/game/f5.png")).then((i) => {this.images[F5] = i;}),
            (loadImage("./img/game/f6.png")).then((i) => {this.images[F6] = i;}),
            (loadImage("./img/game/f7.png")).then((i) => {this.images[F7] = i;}),
            (loadImage("./img/game/floor.png")).then((i) => {this.images[FLOOR] = i;}),
            (loadImage("./img/game/lader.png")).then((i) => {this.images[LADER] = i;}),
            (loadImage("./img/game/liana.png")).then((i) => {this.images[LIANA] = i;}),
            (loadImage("./img/game/spike.png")).then((i) => {this.images[SPIKE] = i;}),
            (loadImage("./img/game/w0.png")).then((i) => {this.images[W0] = i;}),
            (loadImage("./img/game/w1.png")).then((i) => {this.images[W1] = i;}),
            (loadImage("./img/game/w2.png")).then((i) => {this.images[W2] = i;}),

            (loadImage("./img/game/back1.png")).then((i) => {this.images[HERO_B1] = i;}),
            (loadImage("./img/game/back2.png")).then((i) => {this.images[HERO_B2] = i;}),
            (loadImage("./img/game/side1.png")).then((i) => {this.images[HERO_R1] = i;}),
            (loadImage("./img/game/side2.png")).then((i) => {this.images[HERO_R2] = i;}),
            (loadImage("./img/game/heroB.png")).then((i) => {this.images[HERO_BR] = i;}),

            (loadImage("./img/game/green.png")).then((i) => {this.images[GREEN_R] = i;}),
            (loadImage("./img/game/lila.png")).then((i) => {this.images[LILA_L] = i;}),

            (loadImage("./img/game/cloud.png")).then((i) => {this.images[BIG_CLD] = i;})

        ]).then(() => {
            this.build();
            cb();
        });
    }

    build() {
        this.images[HERO_L1] = mirror(this.images[HERO_R1]);
        this.images[HERO_L2] = mirror(this.images[HERO_R2]);
        this.images[HERO_BL] = mirror(this.images[HERO_BR]);

        this.images[GREEN_L] = mirror(this.images[GREEN_R]);
        this.images[LILA_R] = mirror(this.images[LILA_L]);

        this.images[ARROW_R] = mirror(this.images[ARROW_L]);

        this.images[FLOOR] = repeatImage(this.images[FLOOR], Math.ceil(WIDTH / this.images[FLOOR].width));
        
        this.images[LADER] = repeatImage(this.images[LADER], 5, false);

        this.images[LIANA] = repeatImage(this.images[LIANA], 3, false);
    }

    image(index) {
        if(index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}