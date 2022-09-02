

const npcFilter = async (query, itemList) => {
    let filteredList = itemList.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    filteredList = Array.from( new Set(filteredList.map(item => item.name)))
    return {query, list: filteredList }
}

export default npcFilter