import { useEffect } from "react";
import './Header.css';
import { ReactComponent as Logo} from '../../Images/coreflix-logo.svg';
import { ReactComponent as SmallLogo} from '../../Images/coreflix-logo-small.svg';
import { Navigate, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export const Header = () => {

    useEffect(() => {
        const handleResize = () => {
          const navbarCollapse = document.getElementById("navbarNavDropdown");
          if (!navbarCollapse) return;
    
          const viewportWidth = window.innerWidth;
          if (viewportWidth >= 960) {
            navbarCollapse.classList.remove("show");
          }
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const { oktaAuth, authState } = useOktaAuth();

    const handleLogout = () => {
        oktaAuth.closeSession();
        oktaAuth.clearStorage();
        setTimeout(() => {
            <Navigate to="/" />
        }, 500);
    }

    return (
        <div className="header-container">
            <div className="header-wrapper">
                <div className="header-wrapper-inner">
                    <div className='wrapper-homePage-body-header'>
                        <div className="navbar navbar-expand-md navbar-dark d-inline-flex flex-wrap flex-row">
                            <div className='navbar-brand'>
                                <div className='smallLogo-container'>
                                    <SmallLogo />
                                </div>
                                <div className='logo-container'>
                                    <Logo />
                                </div>
                            </div>
                            <button className="navbar-toggler collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" 
                                aria-controls="navbarNavDropdown" aria-expanded="false" 
                                aria-label="Toggle Navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav ms-auto">
                                    <li className='nav-item'>
                                        <NavLink className='nav-link' to="/home">Home</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink className='nav-link' to="/search">Search Movies</NavLink>
                                    </li>
                                    {!authState?.isAuthenticated ? 
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">Sign In</NavLink>
                                        </li>
                                    :
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/watchlist">Watchlist</NavLink>
                                            </li>
                                            {authState.accessToken?.claims.userType === 'admin' &&
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/admin">Admin</NavLink>
                                                </li>
                                            }
                                            <li className="nav-item">
                                                <button className="nav-link" onClick={handleLogout} >Logout</button>
                                            </li>
                                        </>
                                    }
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
