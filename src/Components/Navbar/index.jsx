import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to='/bands'>
          <button>Bands</button>
        </Link>
      </div>
      {isLoggedIn ? (
        <div>
          <button onClick={logOutUser}>Logout</button>
          <p>{user && user.name}</p>
        </div>
      ) : (
        <div>
          <div>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
