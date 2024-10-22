import styles from './Project.module.css'
import apiUrl from '../axios/config'
import ProjectForm from '../Components/Project/ProjectForm.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Router/layout/Loading.tsx'
import Container from '../Components/Router/layout/Container'
import Message from '../Components/Router/layout/Message'

function Project(){
    const [project, setProject] = useState([]) 
    const [removeLoading, setRemoveLoading] = useState(false) 
    const { id } = useParams()
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [projectMessage, setProjectMessage] = useState('') // Alterar para string
    const [type, setType] = useState('') // Definir o tipo de mensagem (error ou success)

    useEffect(() => {
        setTimeout(() => {
            apiUrl.get(`/projects/${id}`)
            .then((response) => {
                console.log('Projeto:', response.data)
                setProject(response.data)
                setRemoveLoading(true)
            })
            .catch((error) => {
                console.error("Erro ao dar get em projetos:", error);
                setProjectMessage('Erro ao carregar o projeto')
                setType('error')
            });
        }, 750);
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function EditPost(project) {
        // Validação de orçamento
        if (project.budget < project.cost) {
            setProjectMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }
    
        // Enviando o projeto via PATCH
        apiUrl.patch(`/projects/${project.id}`, project)
            .then((response) => {
                console.log("Projeto editado:", response.data);
                setProject(project);  // Atualizar o projeto localmente
                setProjectMessage('Projeto editado com sucesso!');
                setType('success');
                setShowProjectForm(false);  // Fechar o formulário de edição
            })
            .catch((error) => {
                console.error("Erro ao editar o projeto:", error);
                setProjectMessage('Falha ao editar o projeto.');
                setType('error');
            });
    }

    return(
        <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass='column'>
                    {/* Renderizar a mensagem de sucesso ou erro */}
                    {projectMessage && <Message type={type} msg={projectMessage} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? ( 
                            <div className={styles.project_info}>
                                <p><span>Categoria: </span>{project.category.name}</p>
                                <p>
                                    <span>Total do Orçamento: </span>R${project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado: </span>R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={EditPost} btnText='Concluir edição' projectData={project}/>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
        </>
    );
}

export default Project;
