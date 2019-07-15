
class Monster extends Entity {
    constructor() {
        super();
        
        this.moving = true;
        this.animType = Animation.BOUNCE;
        this.type = rand(0, 2);
        this.imgWidth = R.image(GREEN_L + this.type).width;
        this.imgHeight = R.image(GREEN_L + this.type).height;
        this.pos.x = rand(120, WIDTH - 120);
        this.vel.x = rand(80, 120);
        this.dir.x = Math.random() > .5 ? -1 : 1;
    }

    draw(ctx, y) {
        if(!this.alive) return;
        
        const i = this.type === 1 ? (
            this.dir.x < 0 ? LILA_L : LILA_R
         ) : (
            this.dir.x < 0 ? GREEN_L : GREEN_R
         );
        ctx.drawImage(R.image(i), this.pos.x, y - this.imgHeight);
    }

    update(dt, y) {
        const z = y - this.imgHeight;
        super.update(dt);

        this.colBox.l = this.pos.x;
        this.colBox.t = z;
        this.colBox.r = this.pos.x + this.imgWidth;
        this.colBox.b = z + this.imgHeight;
    }
}