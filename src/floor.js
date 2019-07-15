
class Floor {
    constructor(y, bottom = false) {
        this.bottom = bottom;
        this.y = y;
        this.lader = null;
        this.started = false;

        this.createAllFeatures();
    }

    start() {
        this.started = true;
        for(let mm = 0; mm < this.features.length; mm++) {
            const m = this.features[mm];
            if(m.type === Collision.ARROW || m.type === Collision.BOULDER) {
                m.feat.start();
            }
        }
    }

    draw(ctx) {
        if(this.y < -100) return;

        for(let mm = 0; mm < this.features.length; mm++) {
            this.features[mm].feat.draw(ctx, this.y);
        }
        //this.testColBox(ctx);
    }

    update(dt, md) {
        if(md) this.y += SCROLL_SPEED * dt;
        for(let f = this.features.length - 1; f > -1; f--) {
            const z =  this.features[f].feat;
            if(z.alive) z.update(dt, this.y);
        }
        for(let f = this.features.length - 1; f > -1; f--) {
            const z =  this.features[f].feat;
            if(!z.alive) this.features.splice(f, 1);
        }
    }   

    createAllFeatures() {
        this.features = [];

        this.features.push({
            type: NONE,
            feat: new Clouds()
        });

        this.features.push({
            type: NONE,
            feat: new Ground()
        });

        
        if(this.bottom) return;

        this.lader = new Lader();

        const trap = new Trap(this.y);
        trap.setPosition(this.lader, null);
        this.features.push({
            type: trap.isFire ? Collision.FIRE : Collision.SPIKE,
            feat: trap
        });

        if(Math.random() < .4) {
            const trap2 = new Trap(this.y);
            trap2.setPosition(this.lader, trap);
            this.features.push({
                type: trap2.isFire ? Collision.FIRE : Collision.SPIKE,
                feat: trap2
            });
        }

        const r = Math.random();
        if(r < .2) {
            this.features.push({
                type: Collision.ARROW,
                feat: new Arrow()
            });
        } else if(r < .4) {
            this.features.push({
                type: Collision.BOULDER,
                feat: new Boulder()
            });
        } else {
            this.features.push({
                type: Collision.MONSTER,
                feat: new Monster()
            });
        }

        
        /*if(Math.random() > .7) {
            this.features.push({
                type: Collision.MONSTER,
                feat: new Monster()
            });
        }*/
        
        this.features.push({
            type: Collision.LADER,
            feat: this.lader
        });

        if(Math.random() > .1) {
            this.features.push({
                type: Collision.DIAMOND,
                feat: new Diamond(this.y)
            });
        }
    }

    getFeatures() {
        let ret = [];
        for(let f = this.features.length - 1; f > -1; f--) {
            if(this.features[f].type === NONE) continue;
            ret.push({
                colBox: this.features[f].feat.colBox,
                type: this.features[f].type
            });
        }
        return ret;
    }

    testColBox(ctx) {
        function drawColBox(o, ctx) {
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(o.l, o.t);
            ctx.lineTo(o.r, o.t);
            ctx.lineTo(o.r, o.b);
            ctx.lineTo(o.l, o.b);
            ctx.closePath();
            ctx.stroke();
        }

        for(let t = 0; t < this.features.length; t++) {
            if(this.features[t].feat.colBox)
                drawColBox(this.features[t].feat.colBox, ctx);
        }
    }

    deleteLader() {
        this.lader = null;
        for(let f = this.features.length - 1; f > -1; f--) {
            if(this.features[f].type === Collision.LADER)  {
                this.features[f].type = NONE;
                this.features[f].feat.fall(() => {
                    this.features[f].feat.alive = false;
                }, this.y);
                return;
            }
        }
    }

    deleteDiamond() {
        for(let f = 0; f < this.features.length; f++) {
            if(this.features[f].type === Collision.DIAMOND) {
                this.features[f].type = NONE;
                this.features[f].feat.alive = false;
                return;
            }
        }
    }

    diamondPosition() {
        for(let f = 0; f < this.features.length; f++) {
            if(this.features[f].type === Collision.DIAMOND) {
                const p = this.features[f].feat.pos;
                p.y = this.y - p.y;
                p.x += this.features[f].feat.imgWidth >> 1;
                p.y += this.features[f].feat.imgHeight >> 1;
                

                return p;
            }
        }
    }
}