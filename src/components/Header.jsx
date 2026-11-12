import { NavLink } from "react-router";
import useTheme from "../hooks/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <nav className="jet-font navbar navbar-expand-lg bg-body-tertiary border-bottom">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                    И
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ms-auto align-items-baseline">
                            <li className="nav-item pt-2">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="theme-toggle ms-2"
                                    type="button"
                                    onClick={toggleTheme}
                                    aria-label="Cambia tema"
                                    title="Cambia tema"
                                >
                                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
