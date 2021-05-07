export function HitDistribution(max, accuracy) {
    let hitDist = Array(max + 1).fill(0)
    hitDist[0] = 1 - accuracy
    for (let dmg = 0; dmg <= max; dmg++) {
        hitDist[dmg] += accuracy / (max + 1)
    }
    return hitDist;
}