const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export default class Particle {
  constructor(canvas) {
    const { devicePixelRatio } = window;
    const r = Math.min(canvas.width, canvas.height) / 2;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    this.x = cx + r * Math.cos(rad);
    this.y = cy + r * Math.sin(rad);
    this.size = getRandom(2, 5) * devicePixelRatio;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#5445544d';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  moveTo(tx, ty) {
    const duration = 500; //500ms的运动时间
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (tx - sx) / duration;
    const ySpeed = (ty - sy) / duration;
    const startTime = Date.now();
    const _moveTo = () => {
      const t = Date.now() - startTime;
      this.x = xSpeed * t;
      this.y = ySpeed * t;
      if (t > duration) {
        this.x = tx;
        this.y = ty;
        return;
      }
      window.requestAnimationFrame(_moveTo);
    };
  }
}
