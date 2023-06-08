import isLogin from 'shared/utils/associate/is-login';

const PrivateComponent = ({children}) => {
    if (isLogin()) {
        return children
    } else {
        return null
    }
};

export default PrivateComponent;