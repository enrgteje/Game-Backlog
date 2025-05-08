import { Redirect, Route } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
  
    return(
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };
export default ProtectedRoute;