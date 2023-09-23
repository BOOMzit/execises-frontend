const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

export default class Particle {
    constructor() {
        const r = Math.min(canvas.width, canvas.height) / 2
        const cx = canvas.width / 2
        const cy = canvas.height / 2
    }
}