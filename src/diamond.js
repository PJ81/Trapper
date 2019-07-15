

class Diamond extends Entity {
    constructor() {
        super();

        this.moving = true;
        this.animType = Animation.IOIO;
        this.img = R.image(DIAMOND);
        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;
        this.pos.set(rand(50, WIDTH - 50), rand(30, 90));
        this.vel.set(Math.random() * TWO_PI, 8);
    }

    update(dt, y) {
        super.update(dt);
        const z = y - this.pos.y;
        this.colBox.l = this.pos.x;
        this.colBox.t = z;
        this.colBox.r = this.pos.x + this.imgWidth;
        this.colBox.b = z + this.imgHeight;
        
    }

    draw(ctx, y) {
        ctx.drawImage(this.img, this.pos.x, y - this.pos.y);
    }
}
