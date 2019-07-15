
class Boulder extends Entity {
    constructor(y) {
        super();
        
        this.moving = false;
        this.animType = Animation.ONCE;
        this.img = R.image(BOULDER);
        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;
        this.dir.x = Math.random() > .5 ? -1 : 1;

        this.start = () => this.timer = Math.random();

        this.pos.x = this.dir.x < 0 ? WIDTH - this.imgWidth + 10 : -10;
        this.vel.x = rand(200, 250);
        this.ang = 0;
    }

    update(dt, y) {
        if(this.timer > 0) {
            this.timer -= dt;
            if(this.timer < 0) {
                this.timer = 0;
                this.moving = true;
            }
        }

        if(!this.moving) return;
        this.ang += dt * 16 * this.dir.x;
        if(this.ang > TWO_PI) this.ang = 0;

        const z = y - this.imgHeight;

        super.update(dt);

        this.colBox.l = this.pos.x;
        this.colBox.t = z;
        this.colBox.r = this.pos.x + this.imgWidth;
        this.colBox.b = z + this.imgHeight;
    }

    draw(ctx, y) {
        const w = this.imgWidth >> 1,
              h = this.imgHeight >> 1,
              z = y - this.imgHeight;
        ctx.save();
        ctx.translate(this.pos.x + w, z + h);
		ctx.rotate(this.ang);
		ctx.drawImage(this.img, -w, -h);
        ctx.restore();
    }
}