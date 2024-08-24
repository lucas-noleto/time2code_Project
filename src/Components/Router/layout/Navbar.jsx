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
                    <Link to= "Home" className={styles.navlink}>Home</Link>
                </li>
                <li className={styles.list}>
                    <Link to= "Company" className={styles.navlink}> Company</Link>
                </li>
                <li className={styles.list}>
                    <Link to="Contact" className={styles.navlink}> Contact</Link>
                    
                </li>
                <li className={styles.list}>
                    <Link to="New Project" className={styles.navlink}>New Project</ Link>
                </li>
            </ul>
        </Container>
    </nav>  
    )

}

export default Navbar