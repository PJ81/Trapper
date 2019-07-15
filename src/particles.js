
class Particles {
    constructor() {
        this.partSystem = new Array(6);
        this.spawnIndex = -1;
        this.part = 0;

        for(let r = 0; r < this.partSystem.length; r++) {
            const part = [];
            for(let t = 0; t < 100; t++) {
                part.push({
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    g: 0,
                    alpha: 0,
                    size: 0
                });
            }
            this.partSystem[r] = {
                alive: false,
                prt: part,
                clr: 0
            };
        }
    }

    getParticleIndex() {
        for(let r = 0; r < this.partSystem.length; r++) {
            if(!this.partSystem.alive) {
                return r;
            }
        }
    }

    update(dt) {
        for(let s = 0; s < this.partSystem.length; s++) {
            const particles = this.partSystem[s];
            if(!particles.alive) continue;

            let f = false;
            for(let t = 0; t < particles.prt.length; t++) {
                const p = particles.prt[t];
                if(p.alpha === 0) continue;
                f = true;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.y += p.g * dt;
                p.alpha -= dt;
                p.size += 4 * dt;
                if(p.alpha < 0) p.alpha = 0;
                particles.prt[t] = p;
            }
            if(!f) particles.alive = false;
        }
    }

    draw(ctx) {
        for(let s = 0; s < this.partSystem.length; s++) {
            const particles = this.partSystem[s];
            if(!particles.alive) continue;
            for(let t = 0; t < particles.prt.length; t++) {
                const p = particles.prt[t];
                ctx.fillStyle = particles.clr + p.alpha + ")";
                ctx.fillRect(p.x - 1, p.y - 1, p.size, p.size);
            }
        }
    }

    spawn(o) {
        if(this.spawnIndex < 0) {
            this.spawnIndex = this.getParticleIndex();
            this.partSystem[this.spawnIndex].alive = true;
            this.partSystem[this.spawnIndex].clr = "rgba(22, 22, 22, ";
        }
        const cnt = rand(3, 8);
        for(let t = this.part; t < cnt; t++) {
            const r = this.partSystem[this.spawnIndex].prt[t];
            r.x = o.x + (Math.random() * 5) * (Math.random() < .5 ? -1 : 1);
            r.y = o.y + rand(-10, 10);// * (Math.random() < .5 ? -1 : 1);
            r.vx = 0;//rand(-10, 10);
            r.vy = 0;//rand(-30, 30);
            r.g = -20;
            r.alpha = 1;
            r.size = 5;
        }
        this.part += cnt;
        if(this.part > 29) this.part = 0;
    }

    startBlood(o, fire) {
        const z = this.getParticleIndex();
        this.partSystem[z].alive = true;
        this.partSystem[z].clr = fire ? "rgba(22, 22, 22, " : "rgba(178, 12, 0, ";
        const c = fire ? 60 : 45;
        for(let t = 0; t < c; t++) {
            const r = this.partSystem[z].prt[t],
                  ang = Math.random() * TWO_PI;
            r.x = o.x;
            r.y = o.y;
            r.vx = Math.cos(ang) * rand(30, 40);
            r.vy = Math.sin(ang) * rand(-30, 30);
            r.g = 10;
            r.alpha = 1;
            r.size = fire ? 5 : 3;
        }
    }

    startDiamond(o) {
        const z = this.getParticleIndex();
        this.partSystem[z].alive = true;
        this.partSystem[z].clr = "rgba(255, 255, 128, ";
        for(let t = 0; t < 30; t++) {
            const r = this.partSystem[z].prt[t],
                  ang = Math.random() * TWO_PI;
            r.x = o.x;
            r.y = o.y;
            r.vx = Math.cos(ang) * rand(50, 150);
            r.vy = Math.sin(ang) * rand(50, 150);
            r.g = 0;
            r.alpha = 1;
            r.size = 3;
        }
    }

    reset() {
        for(let r = 0; r < this.partSystem.length; r++) {
            this.partSystem[r].alive = false;
        }
    }
}