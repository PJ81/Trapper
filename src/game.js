
class Game {
	constructor() {
		const canvas = document.createElement('canvas');
		canvas.width = WIDTH * SCALE;
		canvas.height = HEIGHT * SCALE;
        document.body.appendChild(canvas);
        
        this.ctx = canvas.getContext('2d');

        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;

		this.loop = (time) => {
			this.accumulator += (time - this.lastTime) / 1000;
			while(this.accumulator > this.deltaTime) {
				this.accumulator -= this.deltaTime;
				this.state.update(this.deltaTime);
			}

            this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
            this.state.draw(this.ctx);
            this.ctx.drawImage(this.bigCloud, 0, this.bigCloud.top);
            this.state.stats(this.ctx);

			this.lastTime = time;
			requestAnimationFrame(this.loop);
        }

        window.addEventListener("keydown", () => {
            this.state.input();
        });
        canvas.addEventListener("mousedown", () => {
            this.state.input();
        });
        canvas.addEventListener("touchstart", () => {
            this.state.input();
        });
        
        this.ctx.scale(SCALE, SCALE);
 
        this.bigCloud = R.image(BIG_CLD);
        this.bigCloud.top = HEIGHT - this.bigCloud.height;

        this.menu = new Menu();
        this.skda = new Skda();
        
        window.addEventListener("stateChange", (e) => {
            switch(e.detail) {
                case GAME:
                    this.state = this.skda;
                break;
                case MENU:
                    this.state = this.menu;
                break;
            }
            this.state.start();
        });
        
        this.state = this.menu;
        this.loop(0);
    }
}

const R = new Resources(() => new Game());