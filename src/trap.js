

class Trap extends Entity {
    constructor() {
        super();

        this.isFire = (Math.random() > .5);
        this.frame = rand(0, 8);
        this.animFrameTime = .1;

        this.img = this.isFire ? R.image(F0) : R.image(SPIKE);
        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;

    }

    setPosition(lad, trap) {
        let cnt = 0;
        while(true) {
            while(true) {
                this.pos.x = rand(100, WIDTH - 100);
                if(Math.abs(lad.pos.x - this.pos.x) > 120) break;
            }
            if(trap) {
                const z = Math.abs(this.pos.x - trap.pos.x);
                if(!(z < 15 || (z > 22 && z < 50))) break;
            } else {
                break;
            }
            if(++cnt > 150) return;
        }
    }

    draw(ctx, y) {
        if(this.isFire) {
            ctx.drawImage(R.image(F0 + this.frame), this.pos.x, y - this.imgHeight);
        } else {
            ctx.drawImage(this.img, this.pos.x, y - this.imgHeight);
        }
    }

    update(dt, y) {
        if(this.isFire) {
            this.animFrameTime -= dt;
            if(this.animFrameTime < 0) {
                this.animFrameTime = .1;
                if(++this.frame > 7) this.frame = 0;
            }
        }
        
        const z = y - this.imgHeight;
        this.colBox.l = this.pos.x + 2;
        this.colBox.t = z + 2;
        this.colBox.r = this.pos.x + this.imgWidth - 2;
        this.colBox.b = z + this.imgHeight;
    }
}