export const isExistIetmInArray = (collection, item) => {
    if (Array.isArray(collection)) return collection.includes(item)

    return false
}

export const isEqualString = (str1, str2) => {
    const strLeft = String(str1)
    const strRight = String(str2)

    if (typeof strLeft !== 'string' || typeof strRight !== 'string') {
        throw new Error('Both arguments must be strings')
    }

    return strLeft === strRight
}

export const createArrayOfLength = length => {
    return Array.from({ length }, (_, index) => index)
}