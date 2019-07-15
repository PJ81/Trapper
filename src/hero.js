
class Hero extends Entity {
    constructor() {
        super();
        this.imgWidth = R.image(HERO_R1).width;
        this.imgHeight = R.image(HERO_R1).height;
        this.addDiamond = () => this.score++;
        this.reset();
    }

    jump() {
        if(this.jumping) return;
        this.jumping = true;
        this.vel.y = this.jumpPower;
    }

    nextLevel() {
        this.pose = SIDE;
        this.climbing = false;
        this.vel.y = 50;
        this.floors++;
    }

    draw(ctx) {
        switch(this.pose) {
            case BURN:
                if(this.dir.x < 0) ctx.drawImage(R.image(HERO_BL), this.pos.x, this.pos.y);
                else ctx.drawImage(R.image(HERO_BR), this.pos.x, this.pos.y);
                return;
            break;
            case SIDE:
                if(this.frame) {
                    if(this.dir.x < 0) ctx.drawImage(R.image(HERO_L1), this.pos.x, this.pos.y);
                    else ctx.drawImage(R.image(HERO_R1), this.pos.x, this.pos.y);
                } else {
                    if(this.dir.x < 0) ctx.drawImage(R.image(HERO_L2), this.pos.x, this.pos.y);
                    else ctx.drawImage(R.image(HERO_R2), this.pos.x, this.pos.y);
                }
            break;
            case BACK:
                if(this.frame) {
                    ctx.drawImage(R.image(HERO_B1), this.pos.x, this.pos.y);
                } else {
                    ctx.drawImage(R.image(HERO_B2), this.pos.x, this.pos.y);
                }
            break;
        }
        if(this.animFrameTime < 0) {
            this.frame = this.frame == 0 ? 1 : 0;
            this.animFrameTime = .1;
        }
    }

    update(dt) {
        this.colBox.l = this.pos.x; this.colBox.t = this.pos.y;
        this.colBox.r = this.pos.x + this.imgWidth; 
        this.colBox.b = this.pos.y + this.imgHeight;
        super.update(dt);
        if(this.pos.y > HEIGHT) return GAME_OVER;
    }

    climb(x) {
        this.climbing = true;
        this.pose = BACK;
        this.pos.x = x - (this.imgWidth >> 1);
    }

    dead(fire = false) {
        this.alive = false;
        this.pose = fire ? BURN : SIDE;
        this.jumping = true;
        this.gravity = 20;
        this.vel.y = fire ? -350 : -250;
    }

    reset() {
        super.reset();
        this.moving = true;
        this.dir.set(1, 0);
        this.gravity = 10;
        this.animType = Animation.BOUNCE;
        this.animFrameTime = .05;
        this.frame = 0;
        this.pos.y = 0;
        this.jumping = true;
        this.jumpPower = -350;
        this.vel.set(120, 2000);
        this.score = this.floors = 0;
        this.burned = false;
        this.pose = SIDE;
        this.climbing = false;
    }
}