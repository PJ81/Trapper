

class Menu extends State {
    constructor() {
        super();
        this.floor = R.image(FLOOR);
        this.man = new Hero();

        this.start();
    }

    input(i) {
        window.dispatchEvent(new CustomEvent("stateChange", {
            detail: GAME
        }));
    }

    update(dt) {
        this.man.update(dt);
    }

    draw(ctx) {
        ctx.drawImage(this.floor, 0, 500);
        this.man.draw(ctx);

        ctx.fillStyle = "#222";
		ctx.textAlign = "center";
		ctx.font = "40px Quantico"; 
		ctx.fillText("CLICK TO", WIDTH >> 1, HEIGHT * .35);
        ctx.fillText("PLAY", WIDTH >> 1, HEIGHT * .42);
        
		ctx.font = "24px Quantico"; 
        ctx.fillText("Top Diamonds: " + this.recordDiamonds, WIDTH >> 1, HEIGHT * .2);
		ctx.fillText("Top Floors: " + this.recordLevels , WIDTH >> 1, HEIGHT * .27);
    }

    start() {
        const d = localStorage.getItem('fatfrog_skda_D'),
              l = localStorage.getItem('fatfrog_skda_L');
        this.recordDiamonds = d || 0;
        this.recordLevels = l || 0;
    }
}