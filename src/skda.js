
class Skda extends State {
    constructor() {
        super();
        this.hero = new Hero();
        this.level = new Level();
        this.particles = new Particles();
    }

    update(dt) {
        this.level.update(dt);
        this.particles.update(dt);
        if(this.hero.update(dt) === GAME_OVER) {
            window.dispatchEvent(new CustomEvent("stateChange", {
                detail: MENU
            }));
            return;
        }

        if(this.hero.pose === BURN) {
            const p = this.hero.pos.copy();
            p.x += this.hero.imgWidth >> 1;
            this.particles.spawn(p, this.hero.vel.y);
        }

        if(this.hero.alive) {
            const col = this.level.checkCollision(this.hero.colBox);
            
            if((col & Collision.DIAMOND) > 0) {
                this.hero.addDiamond();
                this.particles.startDiamond(this.level.getDiamondPosition());
                this.level.deleteDiamond();
            }
            if((col & Collision.LADER)) {
                this.hero.climb(this.level.getLadderX());
                this.level.scroll(() => {this.hero.nextLevel();});
            }
            if((col & Collision.MONSTER) > 0) {
                this.killHero();
            }
            if((col & Collision.SPIKE) > 0) {
                this.killHero();
            }
            if((col & Collision.FIRE) > 0) {
                this.killHero(true);
            }
            if((col & Collision.ARROW) > 0) {
                this.killHero();
            }
            if((col & Collision.BOULDER) > 0) {
                this.killHero();
            }
        }
    }

    killHero(fire = false) {
        const d = parseInt(localStorage.getItem('fatfrog_skda_D')) || 0,
              l = parseInt(localStorage.getItem('fatfrog_skda_L')) || 0;

        if(d < this.hero.score) {
            localStorage.setItem('fatfrog_skda_D', "" + this.hero.score);
        }
        if(l < this.hero.floors) {
            localStorage.setItem('fatfrog_skda_L', "" + this.hero.floors);
        }

        const p = this.hero.pos.copy();
        p.x += this.hero.imgWidth >> 1;
        this.particles.startBlood(p, fire);
        this.hero.dead(fire);
    }

    draw(ctx) {
        this.level.draw(ctx);
        this.hero.draw(ctx);
        this.particles.draw(ctx);
    }

    input(i) {
        this.hero.jump();
    } 

    start() {
        this.hero.reset();
        this.level.reset();
        this.particles.reset();
    }

    stats(ctx) {
        ctx.fillStyle = "#000";
		ctx.textAlign = "left";
		ctx.font = "24px Quantico"; 
        ctx.fillText("Diamonds: " + this.hero.score, 10, HEIGHT - 10);
        ctx.textAlign = "right";
		ctx.fillText("Floors: " + this.hero.floors, WIDTH - 10, HEIGHT - 10);
    }
}