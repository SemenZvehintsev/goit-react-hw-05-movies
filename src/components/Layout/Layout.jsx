import { NavLink, Outlet } from "react-router-dom";
import styles from 'components/Layout/Layout.module.css'

export const Layout = () => {
    return <><header>
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                <li><NavLink className={styles.link} to='/'>Home</NavLink></li>
                <li><NavLink className={styles.link} to='/movies'>Movies</NavLink></li>
            </ul>
        </nav>
    </header>
    <main>
        <Outlet/>
    </main>
    </>
}