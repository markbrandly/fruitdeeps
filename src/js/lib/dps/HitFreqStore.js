class HitFreqItem {
    constructor() {
        this.nextHitList = []
        this.p = 0
    }

    next(i) {
        if (this.nextHitList[i] === undefined) {
            this.nextHitList[i] = new HitFreqItem();
        }
        return this.nextHitList[i]
    }

    setP(p) {
        this.p += p
    }

    getP() {
        return this.p;
    }
}

export class HitFreqStore {
    constructor() {
        this.base = new HitFreqItem();
        this.hitSet = [];
    }
    store(hitList, p) {
        hitList = [...hitList]
        hitList.sort((a, b) => b - a)

        let hitItem = this.base;
        for (let i = 0; i < hitList.length; i++) {
            let dmg = hitList[i]
            hitItem = hitItem.next(dmg);
        }

        if (hitItem.getP() === 0) {
            this.hitSet.push(hitList)
        }

        hitItem.setP(p)
    }

    getFreqs() {
        let hitList = []
        for (let i = 0; i < this.hitSet.length; i++) {
            let hitItem = this.base
            for (let j = 0; j < this.hitSet[i].length; j++) {
                hitItem = hitItem.next(this.hitSet[i][j])
            }
            hitList.push({ dmg: [...this.hitSet[i]], p: hitItem.getP() })
        }
        return hitList
    }
}