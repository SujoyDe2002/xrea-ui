export const setLocalStorageItem = (id, data) => {
    localStorage.setItem(id, JSON.stringify({ data }))
}

