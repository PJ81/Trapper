

class Lader {
    constructor() {
        this.colBox = {l:0, t:0, r:0, b:0};
        this.active = this.alive = true;
        this.fallCallback = null;
        this.vel = new Point();
        this.pos = new Point(rand(50, WIDTH - 50), 0);
        this.isLader = (Math.random() > .075);
        this.img = this.isLader ? R.image(LADER) : R.image(LIANA);
        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;

        this.kill = () => {
            this.colBox.l = this.colBox.t = this.colBox.r = this.colBox.b = -1;
            this.active = false;
        };
    }

    draw(ctx, y) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y > 0 ? this.pos.y : y);
    }

    fall(cb, y) {
        this.fallCallback = cb;
        this.vel.y = 500;
        this.pos.y = y;
    }

    update(dt, y) {
        if(this.active) {
            this.colBox.l = this.pos.x;
            this.colBox.t = y;
            this.colBox.r = this.pos.x + this.imgWidth;
            this.colBox.b = y + this.imgHeight;
        } else {
            this.pos.y += this.vel.y * dt;
            if(this.pos.y > HEIGHT) {
                this.fallCallback();
            }
        }
    }
}