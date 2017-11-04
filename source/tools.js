function removeIdenticalNeighbours(items) {
    let lastItem;
    return items.filter((item, index) => {
        if (index === 0) {
            return true;
        }
        const lastWasSame = lastItem === item;
        lastItem = item;
        return !lastWasSame;
    });
}

module.exports = {
    removeIdenticalNeighbours
};
