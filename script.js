const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// mouse object parameters
let mouse = {
    x: null,
    y: null,
    radius: 69
}
// mouse event listener
window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x + canvas.clientLeft/2;
        mouse.y = event.y + canvas.clientTop/2;
    }
);

function drawImage(){
    let imageWidth = png.width;
    let imageHeight = png.height;

    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // particles created from image data
    class Particle {
        constructor(x, y, color, size){
            this.x = x + canvas.width/2 - png.width * 2,
            this.y = y + canvas.height/2 - png.height * 2,
            this.color = color,
            this.size = 2,
            this.baseX = x + canvas.width/2 - png.width * 2,
            this.baseY = y + canvas.height/2 - png.height * 2,
            this.density = (Math.random() * 10) + 2;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
        }
        update() {
            ctx.fillStyle = this.color;

            // collision detection - Note # dx = delta x
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            // max distance, past where the force will be 0
            const maxDistance = 70;
            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 0;

            let directionX = (forceDirectionX * force * this.density * 0.6);
            let directionY = (forceDirectionY * force * this.density * 0.6);

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX){
                    let dx = this.x - this.baseX;
                    this.x -= dx/20;
                } 
                if (this.y !== this.baseY){
                    let dy = this.y - this.baseY;
                    this.y -= dy/20;
                }
            }
            this.draw()
        }
    }
    function init() {
        particleArray = [];

        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," +
                                        data.data[(y * 4 * data.width) + (x * 4) + 1] + "," +
                                        data.data[(y * 4 * data.width) + (x * 4) + 2] + ")";
                    particleArray.push(new Particle(positionX * 0.80, positionY * 0.80, color, 1));
                }
            }
        }
        
    }
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,.0)';
        

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    init();
    animate();
    
    // responsive resize screen
    window.addEventListener('resize', function () 
    canvas.width = newCanvasWidth; // Yeni genişlik değeri
    canvas.height = newCanvasHeight; // Yeni yükseklik değeri
    adjustParticlePositions();
        }
    );
}
// converted 100x100 pixel png image into Base64 data
const png = new Image();
png.src ="data:image/png;base64,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"

window.addEventListener('load', (event) => {
    console.log('page has loaded');
    ctx.drawImage(png, 0, 0);
    drawImage();
});
