
class Arrow extends Entity {
    constructor() {
        super();
        this.timer = 0;
        this.moving = false;
        this.animType = Animation.ONCE;
        this.dir.x = Math.random() > .5 ? 1 : -1;
        
        this.start = () => this.timer = Math.random();

        if(this.dir.x < 0) {
            this.img = R.image(ARROW_L);
            this.pos.x = 8 + WIDTH - this.img.width;
        } else {
            this.img = R.image(ARROW_R);
            this.pos.x = -8;
        }

        this.imgWidth = this.img.width;
        this.imgHeight = this.img.height;
        this.vel.x = rand(350, 450);
    }

    draw(ctx, y) {
		ctx.drawImage(this.img, this.pos.x, y - 20);
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
        
        const z = y - 20;
        super.update(dt);

        this.colBox.l = this.pos.x;
        this.colBox.t = z;
        this.colBox.r = this.pos.x + this.imgWidth;
        this.colBox.b = z + this.imgHeight;
    }
}