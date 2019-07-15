

class Ground {
    constructor() {
        this.img = R.image(FLOOR);
        this.alive = true;
    }

    draw(ctx, y) {
        ctx.drawImage(this.img, 0, y);
    }

    update(dt, md) {}
}