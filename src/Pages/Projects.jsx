import Message from '../Components/Router/layout/Message'
import { useLocation } from 'react-router-dom'
import apiUrl from '../axios/config'
import styles from './Projects.module.css'
import Container from '../Components/Router/layout/Container'
import LinkButton from '../Components/Router/layout/LinkButton'
import ProjectCard from '../Components/Project/ProjectCard.tsx'

import Loading from '../Components/Router/layout/Loading.tsx'

import { useState, useEffect} from 'react'

function Projects(){
    const [projects, setProjects] = useState([])
    const [removeLoading,setRemoveLoading] =useState(false)
    const location = useLocation()
    const [projectMessage,setProjectMessage] = useState([''])

    useEffect (()=>{
       setTimeout (()=>{
        apiUrl.get('/projects')
        .then((response)=>{
            console.log('Projetos criados:', response.data)
            const data = response.data
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((error) => {
            console.error("Erro ao dar get em projetos:", error);
            // Exibir uma mensagem de erro ou tratar o erro de forma apropriada
             
        });
       },1500)

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

    function removeProject(id){

        apiUrl.delete(`/projects/${id}`)
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
            
            
        })
        .catch((error) => {
            console.error("Erro ao deletar projeto", error);
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
            {message && <Message msg={message} 
            type="success" />}
            {projectMessage && <Message msg={projectMessage} 
            type="success" />}
            
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
                        handleRemove={removeProject}
                        
                        />                    
                    ))}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos cadastrados!</p>
                )}

            </Container>
        </div>
    )
}

export default Projects 