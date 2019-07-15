

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = url;
    });
}

function mirror(img, hr = true) {
    const s = document.createElement("canvas");
    s.width = img.width;
    s.height = img.height;
    const c = s.getContext("2d");
    if(hr) {
        c.translate(s.width, 0);
        c.scale(-1, 1);
    } else {
        c.translate(0, s.height);
        c.scale(1, -1);
    }
    c.drawImage(img, 0, 0);
    const i = new Image();
    i.src = s.toDataURL();


    //let d=s.toDataURL("image/png");
    // let w=window.open('about:blank','image from canvas');
    // w.document.write("<img src='"+d+"' alt='from canvas'/>");
    //window.open(s.toDataURL('image/png'));

    return i;
}

function repeatImage(img, n, hr = true) {
    let size;
    const cn = document.createElement("canvas");
    if(hr) {
        size = img.width;
        cn.width = size * n;
        cn.height = img.height;
    } else {
        size = img.height;
        cn.width = img.width;
        cn.height = size * n;
    }
    const x = cn.getContext("2d");

    if(hr) {
        for(let r = 0; r < cn.width; r += size) {
            x.drawImage(img, r, 0);
        }
    } else {
        for(let r = 0; r < cn.height; r += size) {
            x.drawImage(img, 0, r);
        }
    }
    const i = new Image();
    i.src = cn.toDataURL();
    return i;
}

function rand(mn, mx) {
    const r = mx - mn;
    return Math.floor(Math.random() * r + mn);
}

class Point {
    constructor(x = 0, y = 0) {this.set(x, y);}
    copy() { return new Point(this.x, this.y)}
    set(x, y) {this.x = x; this.y = y;}
}

class State {
    constructor() {}
    update(dt) {}
    draw(ctx) {}
    input(i) {}
    start() {}
    stats(ctx) {}
}