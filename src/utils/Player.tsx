class Player {
    x: number;
    y: number;
    radius: number;
    image: HTMLImageElement;
    imageLoaded: boolean;
    color:string
  
    constructor({ x, y, radius, color, num }: { x: number; y: number; radius: number; color: string; num: number }) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.image = new Image();
      this.imageLoaded = false;
      this.color=color
  
      if (num === 0) {
        this.image.src = '../img/p1.png';
      } else if (num === 1) {
        this.image.src = '../img/p2.png';
      } else {
        this.image.src = '../img/p3.png';
      }
  
      // Ensure the image is fully loaded before drawing it
      this.image.onload = () => {
        this.imageLoaded = true;
      };
    }
  
    draw(c: CanvasRenderingContext2D) {
    //   if (this.imageLoaded) {
    //     c.save();
  
    //     // Create a circular clipping path
    //     c.beginPath();
    //     c.arc(this.x, this.y, this.radius * window.devicePixelRatio, 0, Math.PI * 2, false);
    //     c.clip();
  
    //     // Draw the image centered at (x, y)
    //     const pixelRatio = window.devicePixelRatio;
    //     const width = this.radius * 2 * pixelRatio;
    //     const height = this.radius * 2 * pixelRatio;
    //     const x = this.x - this.radius * pixelRatio;
    //     const y = this.y - this.radius * pixelRatio;
    //     c.drawImage(this.image, x, y, width, height);
  
    //     c.restore();
    //   } else {
        // Fallback to drawing a circle if the image hasn't loaded yet
        c.beginPath();
        c.arc(this.x, this.y, this.radius * window.devicePixelRatio, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    //   }
    }
  }
  
  export default Player;