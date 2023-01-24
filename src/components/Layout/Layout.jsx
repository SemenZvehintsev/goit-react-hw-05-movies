import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
    return <><header>
        <nav>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/movies'>Movies</NavLink></li>
        </nav>
    </header>
    <main>
        <Outlet/>
    </main>
    </>
}