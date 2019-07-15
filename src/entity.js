
class Entity {
    constructor() {
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.colBox = {l:0, t:0, r:0, b:0};
        this.dir = new Point();
        this.pos = new Point();
        this.vel = new Point();
        this.reset();
    }

    reset() {
        this.jumpPower = 0;
        this.frame = 0;
        this.gravity = 0;
        this.animType = NONE;
        this.animFrameTime = 0;
        this.moving = this.jumping = false;
        this.alive = true;
        this.dir.set(0, 0); 
        this.pos.set(0, 0);
        this.vel.set(0, 0);
    }

    update(dt) {
        if(!this.moving) return;

        this.animFrameTime -= dt;

        if(this.climbing) {
            if(this.pos.y < BOTTOM - this.imgHeight)
                this.pos.y += dt * 60;
            else 
                this.pos.y = BOTTOM - this.imgHeight;
           return;
        }

        if(this.jumping) {
            this.pos.y += dt * this.vel.y;
            this.vel.y += this.gravity;
        }

        if(this.alive) {
            if(this.pos.y + this.imgHeight < BOTTOM) {
                this.vel.y += this.gravity;
            } else {
                this.pos.y = BOTTOM - this.imgHeight;
                this.vel.y = 0;
                this.jumping = false;
            }

            switch(this.animType) {
                case Animation.ONCE:
                    this.pos.x += dt * this.vel.x * this.dir.x;
                    if(this.pos.x < -this.imgWidth || this.pos.x > WIDTH) {
                        this.alive = false;
                    }
                break;
                case Animation.BOUNCE:
                    this.pos.x += dt * this.vel.x * this.dir.x;
                    if((this.dir.x < 0 && this.pos.x <= 0) ||
                        (this.dir.x > 0 && this.pos.x + this.imgWidth >= WIDTH)) {
                        this.dir.x = -this.dir.x;
                    }
                break;
                case Animation.IOIO:
                    this.pos.y += dt * this.vel.y * Math.cos(this.vel.x);
                    this.vel.x += dt * 2;
                    if(this.vel.x > TWO_PI) this.vel.x = 0;
                break;
            }

        }
    }
}