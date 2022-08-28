const accuracyFormula = (atk, def) => {
    let clamp = (n) => Math.max(0, Math.min(1, n))

    if (atk > def) {
        return clamp(1 - (def + 2)*(2*def+3)/(atk+1)/(atk+1)/6)
    } else {
        return clamp(atk * (4 * atk + 5) / 6 / (atk + 1) / (def + 1))
    }
}

console.log(accuracyFormula(1000,10000))