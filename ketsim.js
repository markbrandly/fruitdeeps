const kill = ({acc, maxHp}) => {
    let hp = maxHp
    const psnChance = 0.25;

    let psnCounter = 0;

    let psnTick = 0;
    let attackCooldown = 0;

    let tickCount = 0;

    let regenTick = 0;

    let attackSpeed = 11;

    let healersSpawned = false;

    let healerTick = 0;

    let tickPoison = () => {
        if(psnCounter >= 0){
            psnTick++
            if(psnTick >= 30){
                let dmg = Math.floor(psnCounter / 5) + 1;
                hp -= dmg;
                psnCounter--;
                psnTick = 0;
                // console.log(dmg)
            }

            if(hp < 150 && !healersSpawned){
                healersSpawned = true;
                hp += 65
                // console.log("healers @ tick", tickCount)
                healerTick = tickCount
            }

            
        }
        // return false;
    }

    let hpRegen = () => {
        regenTick++;
        if(regenTick >= 100){
            if(hp > 0 && hp < maxHp) {
                hp++;
            }
            regenTick = 0;
        }
    }

    let attack = () => {
        attackCooldown--;
        if(attackCooldown <= 0){
            attackCooldown = attackSpeed;
            if(Math.random() <= acc){
                hp--;
                if(Math.random() <= psnChance){
                    psnCounter = 29;
                }
            }
        }
    }

    while(hp > 0){
        tickCount++;
        tickPoison();
        hpRegen();
        attack();
    }

    return [healerTick, tickCount]
}

const ranger = {
    maxHp: 40,
    acc: 0.0464
}

const mager = {
    maxHp: 160,
    acc: 0.0133
}

const meleer = {
    maxHp: 80,
    acc: 0.0256
}

const jad = {
    maxHp: 250,
    acc: 0.0068
}

let sampleSize = 10000;
let sum = 0;

let killArray = [];

let killMap = {}

for(let i = 0; i < 50; i++){
    killMap[(i).toString()] = 0
}

let counter = 0;

let sum2 = 0;


for(let i = 0; i < sampleSize; i++){
    let time = kill(jad)
    if(time[0] < 9000){
        sum++
        // counter++
        // if(time[1] < 36000){
        //     sum2 ++
        // }
        // killArray.push(time[1])
    }
    // killArray.push(time[1])
}


// console.log('Average ticks:', sum/sampleSize);
console.log(sum/sampleSize);
// console.log(killArray.reduce((a,b) => a + b));
// console.log(killArray)
// console.log(killMap)

// console.log(kill(jad));