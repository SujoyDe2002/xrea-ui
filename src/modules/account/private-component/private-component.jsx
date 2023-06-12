import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from 'shared/utils/associate/is-login';

const PrivateComponent = ({children}) => {
    if (isLogin()) {
        return children
    } else {
        return null
    }
};

export default PrivateComponent;