import {Link } from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

function Navbar(){
    return (
    <nav className={styles.navbar}>
        <Container>
            <Link to="/" className={styles.logo}>
            <img src = {logo} className='list' alt='Costs'/>
            </Link>
            <ul className={styles.navlink}>
                <li className={styles.list}>
                    <Link to= {`/`} className={styles.navlink}>Home</Link>
                </li>
                <li className={styles.list}>
                    <Link to= {`/company`} className={styles.navlink}> Company</Link>
                </li>
                <li className={styles.list}>
                    <Link to={`/contact`} className={styles.navlink}> Contact</Link>
                    
                </li>
                <li className={styles.list}>
                    <Link to={`/new_project`} className={styles.navlink}>New Project</ Link>
                </li>
                <li className={styles.list}>
                    <Link to={`/projects`} className={styles.navlink}>Projects</ Link>
                </li>
            </ul>
        </Container>
    </nav>  
    )

}

export default Navbar