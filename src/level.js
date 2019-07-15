

class Level {
    constructor() {
        this.reset();
        this.deleteDiamond = () => this.floors[0].deleteDiamond();
        this.getDiamondPosition = () => this.floors[0].diamondPosition();
    }

    reset() {
        this.floors = [];
        this.scrolling = false;
        this.floors = [];
        let bot = BOTTOM;
        this.scrollCallback = null;
        
        this.floors.push(new Floor(bot, true));
        for(let z = 0; z < 6; z++) {
            bot -= LEVEL_HEIGHT;
            this.floors.push(new Floor(bot));
        }
    }

    scroll(cb) {
        this.scrolling = true;
        this.scrollCallback = cb;
    }

    update(dt) {
        for(let f = 0; f < this.floors.length; f++) {
            this.floors[f].update(dt, this.scrolling);
        }

        if(this.scrolling && this.floors[1].y > BOTTOM) {
            this.resetAllLevels();
        }

        if(!this.floors[0].started) this.floors[0].start();
    }

    draw(ctx) {
        for(let f = this.floors.length - 1; f > -1 ; f--) {
            this.floors[f].draw(ctx);
        }
    }

    getLadderX(){
        const z = this.floors[1].lader.colBox;
        const x = z.l + ((z.r - z.l) >> 1);
        this.floors[1].lader.kill();
        return x
    }

    checkCollision(hero) {
        function collided(a, b) {
           return !(((a.b < b.t) || (a.t > b.b) || (a.r < b.l) || (a.l > b.r)));
        }

        let ret = Collision.NO_COL;
        const obst = this.floors[0].getFeatures();
        obst.push({
            colBox: this.floors[1].lader.colBox,
            type: Collision.LADER
        });

        for(let f = 0; f < obst.length; f++) {
            if(collided(hero, obst[f].colBox)) {
                ret |= obst[f].type;
            }   
        }
        return ret;
    }

    resetAllLevels() {
        this.scrolling = false;
        this.floors.splice(0, 1);
        this.floors[0].deleteLader();

        let bot = BOTTOM;
        for(let f = 0; f < this.floors.length; f++) {
            this.floors[f].y = bot;
            bot -= LEVEL_HEIGHT;
        }

        this.floors.push(new Floor(this.floors[this.floors.length - 1].y - LEVEL_HEIGHT));
        this.scrollCallback();
    }
}