
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors/select-user-role';
import ROLE from '../../constatns/ROLE';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const roleId =useSelector(selectUserRole)
    if (roleId!==ROLE.ADMIN) {
        return <Navigate to="/" replace />;
    }else{
        return children
    }


};

export default ProtectedRoute;
