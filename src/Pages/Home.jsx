import styles from './Home.module.css'
import savings from '../../src/Components/img/savings.svg'
import LinkButton from '../Components/Router/layout/LinkButton'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>
                Bem-vindo ao <span>Costs</span>
            </h1>
            <p>Comece a gerenciar os seus projetos agora mesmo !</p>
            <LinkButton to ="/new_project" text="Criar projeto" />
            <img src={savings} alt='Costs'/>
        </section>
    )
}

export default Home