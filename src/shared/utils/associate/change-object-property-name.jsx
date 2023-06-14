

const ChangeObjPropertyName = (object, propertyNames) => {
    propertyNames.map(({oldProperty, newProperty})=>{
        object[newProperty] =  object[oldProperty] 
        delete object[oldProperty]
    })
    return object
}

export default ChangeObjPropertyName