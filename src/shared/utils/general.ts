export const updateData = (oldData: any, newData: any) => {
    Object.keys(newData).map(function (key, value) {
        oldData[key] = newData[key]
    });
    return oldData
}