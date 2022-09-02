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
    "(Emir's Arena)"
];

const removeList = [
    ' (Soul Wars)'
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



    return {query, list: filteredList}
}

export default searchFilter