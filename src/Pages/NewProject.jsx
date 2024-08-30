import styles from './NewProject.module.css'
import ProjectForm from '../Components/Project/ProjectForm'
import apiUrl from '../axios/config'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function NewProject() {
    const navigate = useNavigate()


    // const [nome, setNome] = useState()
    // const [orcamento, setOrc] = useState()

    function createProject(project) {
        project.cost = 0;
        project.services = [];

        // Enviando o projeto via POST
        apiUrl.post("/projects", project)
        .then((response) => {
            console.log("Projeto criado:", response.data);
            // Navegar após a criação
            navigate('/projects', { state: { message: "Projeto criado com sucesso!" } });
        })
        .catch((error) => {
            console.error("Erro ao criar o projeto:", error);
            // Exibir uma mensagem de erro ou tratar o erro de forma apropriada
            navigate('/projects', { state: { message: "Falha ao criar o projeto." } });
        });
    
    }
    

    return (
        <div className={styles.newproject_container}>
            <h1 >Criar Projeto</h1>
            <p> Crie seu projeto para depois adicionar os serviços </p>
            <ProjectForm handleSubmit={createProject} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject