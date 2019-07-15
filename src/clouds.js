
class Clouds extends Entity {
    constructor() {
        super();

        this.clouds = [];
        const sp = rand(0, 3);

        this.clouds.push({
            pos: new Point(rand(200, WIDTH - 100), rand(40, 100)),
            size: sp,
            speed: sp + Math.random() * (sp + 1)
        });
        
        for(let c = 0; c < 2; c++) {
            this.createOneCloud();   
        }
    }

    createOneCloud() {
        let lp = this.clouds[this.clouds.length - 1].pos.x + rand(150, 210),
            sp = rand(0, 3);
        if(lp < WIDTH) lp = WIDTH + rand(2, 20);
        this.clouds.push({
            pos: new Point(lp, rand(40, 100)),
            size: sp,
            speed: sp + Math.random() * (sp + 1)
        });
    }

    update(dt) {
        for(let c = this.clouds.length - 1; c > -1; c--) {
            this.clouds[c].pos.x -= dt * this.clouds[c].speed;
            if(this.clouds[c].pos.x < -R.image(W0 + this.clouds[c].size).width) {
                this.clouds.splice(c, 1);
                this.createOneCloud();
            }
        }
    }

    draw(ctx, y) {
        for(let c = 0; c < this.clouds.length; c++) {
            const d = this.clouds[c];
            if(d.pos.x > WIDTH + 10) continue;
            ctx.drawImage(R.image(W0 + d.size), d.pos.x, y - d.pos.y);
        }
    }
}