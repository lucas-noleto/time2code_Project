import Message from '../Components/Router/layout/Message'
import { useLocation } from 'react-router-dom'
import apiUrl from '../axios/config'
import styles from './Projects.module.css'
import Container from '../Components/Router/layout/Container'
import LinkButton from '../Components/Router/layout/LinkButton'
import ProjectCard from '../Components/Project/ProjectCard.tsx'

import { useState, useEffect} from 'react'

function Projects(){
    const [projects, setProjects] = useState([])

    const location = useLocation()

    useEffect (()=>{
        apiUrl.get('/projects')
        .then((response)=>{
            console.log('Projetos criados:', response.data)
            const data = response.data
            setProjects(data)
        })
        .catch((error) => {
            console.error("Erro ao dar get em projetos:", error);
            // Exibir uma mensagem de erro ou tratar o erro de forma apropriada
             
        });

    },[])


    let message = ''
    if(location.state){
        message = location.state.message
    }

    function getProject() {
        

        // Enviando o projeto via POST
        apiUrl.get("/projects")
        .then((response) => {
            console.log("Projetos criados:", response.data);
            // Navegar após a criação
            
        })
        .catch((error) => {
            console.error("Erro ao dar get em projetos:", error);
            // Exibir uma mensagem de erro ou tratar o erro de forma apropriada
             
        });
    
    }


    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>
                    Meus Projetos
                    
                </h1>
                <LinkButton to ="/new_project" text="Criar projeto" />
            </div>
            {message && <Message msg={message} type="success" />}
            {getProject()}
            <Container customClass = 'start'>
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category ? project.category.name : 'No_Category'}
                        key={project.id}
                        
                        />                    
                    ))}
            </Container>
        </div>
    )
}

export default Projects 