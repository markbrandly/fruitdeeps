const categoryTable = {
    "Chinchompas": [
        { name: "Short fuse", type: "Ranged", style: "Accurate" },
        { name: "Medium fuse", type: "Ranged", style: "Rapid" },
        { name: "Long fuse", type: "Ranged", style: "Longrange" }
    ],

    "Slash Sword": [
        { name: "Chop", type: "Slash", style: "Accurate" },
        { name: "Slash", type: "Slash", style: "Aggressive" },
        { name: "Lunge", type: "Stab", style: "Controlled" },
        { name: "Block", type: "Slash", style: "Defensive" }
    ],

    "Stab Sword": [
        { name: "Stab", type: "Stab", style: "Accurate" },
        { name: "Lunge", type: "Stab", style: "Aggressive" },
        { name: "Slash", type: "Slash", style: "Aggressive" },
        { name: "Block", type: "Stab", style: "Defensive" }
    ],
    "Thrown": [
        { name: "Accurate", type: "Ranged", style: "Accurate" },
        { name: "Rapid", type: "Ranged", style: "Rapid" },
        { name: "Longrange", type: "Ranged", style: "Longrange" }
    ],
    "Crossbow": [
        { name: "Accurate", type: "Ranged", style: "Accurate" },
        { name: "Rapid", type: "Ranged", style: "Rapid" },
        { name: "Longrange", type: "Ranged", style: "Longrange" }
    ],
    "Staff": [
        { name: "Bash", type: "Crush", style: "Accurate" },
        { name: "Pound", type: "Crush", style: "Aggressive" },
        { name: "Focus", type: "Crush", style: "Defensive" }
    ],

    "Pickaxe": [
        { name: "Spike", type: "Stab", style: "Accurate" },
        { name: "Impale", type: "Stab", style: "Aggressive" },
        { name: "Smash", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Stab", style: "Defensive" }
    ],

    "Blunt": [
        { name: "Pound", type: "Crush", style: "Accurate" },
        { name: "Pummel", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Crush", style: "Defensive" }
    ],

    "Axe": [
        { name: "Chop", type: "Slash", style: "Accurate" },
        { name: "Hack", type: "Slash", style: "Aggressive" },
        { name: "Smash", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Slash", style: "Defensive" }
    ],

    "Spiked": [
        { name: "Pound", type: "Crush", style: "Accurate" },
        { name: "Pummel", type: "Crush", style: "Aggressive" },
        { name: "Spike", type: "Stab", style: "Controlled" },
        { name: "Block", type: "Crush", style: "Defensive" }
    ],
    "Unarmed": [
        { name: "Punch", type: "Crush", style: "Accurate" },
        { name: "Kick", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Crush", style: "Defensive" }
    ],
    "Banner": [
        { name: "Lunge", type: "Stab", style: "Accurate" },
        { name: "Swipe", type: "Slash", style: "Aggressive" },
        { name: "Pound", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Stab", style: "Defensive" }
    ],
    "Whip": [
        { name: "Flick", type: "Slash", style: "Accurate" },
        { name: "Lash", type: "Slash", style: "Controlled" },
        { name: "Deflect", type: "Slash", style: "Defensive" }
    ],

    "Spear": [
        { name: "Lunge", type: "Stab", style: "Controlled" },
        { name: "Swipe", type: "Slash", style: "Controlled" },
        { name: "Pound", type: "Crush", style: "Controlled" },
        { name: "Block", type: "Stab", style: "Defensive" }
    ],

    "Claws": [
        { name: "Chop", type: "Slash", style: "Accurate" },
        { name: "Slash", type: "Slash", style: "Aggressive" },
        { name: "Lunge", type: "Stab", style: "Controlled" },
        { name: "Block", type: "Slash", style: "Defensive" }
    ],

    "Polestaff": [
        { name: "Jab", type: "Stab", style: "Controlled" },
        { name: "Swipe", type: "Slash", style: "Aggressive" },
        { name: "Fend", type: "Stab", style: "Defensive" }
    ],

    "Bladed Staff": [
        { name: "Jab", type: "Stab", style: "Accurate" },
        { name: "Swipe", type: "Slash", style: "Aggressive" },
        { name: "Fend", type: "Crush", style: "Defensive" }
    ],

    "Powered Staff": [
        { name: "Accurate", type: "Magic", style: "Accurate" },
        { name: "Accurate", type: "Magic", style: "Accurate" },
        { name: "Longrange", type: "Magic", style: "Longrange" }
    ],

    "2h Sword": [
        { name: "Chop", type: "Slash", style: "Accurate" },
        { name: "Slash", type: "Slash", style: "Aggressive" },
        { name: "Smash", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Slash", style: "Defensive" }
    ],

    "Scythe": [
        { name: "Reap", type: "Slash", style: "Accurate" },
        { name: "Chop", type: "Slash", style: "Aggressive" },
        { name: "Jab", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Slash", style: "Defensive" }
    ],
    "Bow": [
        { name: "Accurate", type: "Ranged", style: "Accurate" },
        { name: "Rapid", type: "Ranged", style: "Rapid" },
        { name: "Longrange", type: "Ranged", style: "Longrange" }
    ],
    "Bulwark": [
        { name: "Pummel", type: "Crush", style: "Accurate" }
    ],
    "Gun": [
        { name: "Kick", type: "Crush", style: "Aggressive" }
    ],
    "Salamander": [
        { name: "Scorch", type: "Slash", style: "Aggressive" },
        { name: "Flare", type: "Ranged", style: "Rapid" },
        { name: "Blaze", type: "Magic", style: "Defensive" }
    ],
    "Bludgeon": [
        { name: "Pound", type: "Crush", style: "Aggressive" },
        { name: "Pummel", type: "Crush", style: "Aggressive" },
        { name: "Block", type: "Crush", style: "Aggressive" }
    ],
    "Polearm": [
        { name: "Jab", type: "Stab", style: "Controlled" },
        { name: "Swipe", type: "Slash", style: "Aggressive" },
        { name: "Fend", type: "Stab", style: "Defensive" }
    ]
}

export function AttackStyles(category) {
    if (category in categoryTable) {
        return categoryTable[category]
    }
    return categoryTable['Unarmed']
}