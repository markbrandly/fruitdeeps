const whiteList = [
    'Shayzien greaves',
    'Shayzien gloves',
    'Shayzien helm',
    'Shayzien platebody',
    'Shayzien boots',
    'Shayzien platebody',
    'Shayzien plate'
]

const blackList = [
    "(Locked)",
    "(0)",
    "(25)",
    "(50)",
    "(75)",
    "(100)",
    "(1)",
    "(2)",
    "(3)",
    "(4)",
    "(5)",
    "(6)",
    "(7)",
    "(8)",
    "(9)",
    "(10)",
    "Craw's bow (Uncharged)",
    "Tome of fire (Empty)",
    "Tome of fire (Empty)",
    "(Nightmare Zone)",
    "(New)",
    "(Damaged)",
    "(Last Man Standing)",
    "(Emir's Arena)",
    "(Poison)",
    "(Poison+)",
    "(Poison++)",
    "Masori headdress",
    "Masori amulet",
    "Masori chestplate",
    "Masori chainskirt",
    '(c)',
    '(Inactive)',
    '/10',
    '(historical)'
];

const removeList = [
    ' (Soul Wars)',
    " (Unpoisoned)",
    " (Normal)",
    " (Charged)",
    " (Active)",
]

const searchFilter = async (query, itemList) => {
    let filteredList = itemList.map((item) => {
        let itemCopy = JSON.parse(JSON.stringify(item))
        for(let i = 0; i < removeList.length; i++){
            itemCopy.name = itemCopy.name.replace(removeList[i], '')
        }
        // item.name = name
        return itemCopy
    })

    filteredList = filteredList.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

    filteredList = filteredList.filter((item) => {
        for(let i = 0; i < whiteList.length; i++){
            if(item.name.includes(whiteList[i])){
                return true
            }
        }
        for(let i = 0; i < blackList.length; i++){
            if(item.name.includes(blackList[i])){
                return false
            }
        }
        return true
    })

    filteredList.sort((a,b) => {
        let aSum = 0;
        let bSum = 0;
        for(let i = 0; i < a.bonuses.length; i++){
            aSum += a.bonuses[i]
            bSum += b.bonuses[i]
        }

        if(aSum > bSum){
            return -1
        }
        if(bSum > aSum){
            return 1
        }
        return 0
    })



    return {query, list: filteredList}
}

export default searchFilter