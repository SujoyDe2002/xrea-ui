import React from 'react'
import { getLocalStorageItem } from '..';

const isLogin = () => {
    if (getLocalStorageItem("xrea")?.data?.loginData?.userId) {
        return getLocalStorageItem("xrea").data.loginData.userId
    }
    return false
}

export default isLogin