export class HitDistribution {
    constructor(max, accuracy) {
        this.max = max
        this.accuracy = accuracy
    }

    output() {
        let hitDist = Array(this.max + 1).fill(0)
        hitDist[0] = 1 - this.accuracy
        for (dmg = 0; dmg <= this.max; dmg++) {
            hitDist[dmg] += this.accuracy / (this.max + 1)
        }
        return hitDist;
    }
}