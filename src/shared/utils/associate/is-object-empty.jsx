import React from 'react'

const IsObjEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

export default IsObjEmpty