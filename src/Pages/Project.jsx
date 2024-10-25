import styles from './Project.module.css'
import apiUrl from '../axios/config'
import ProjectForm from '../Components/Project/ProjectForm.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Router/layout/Loading.tsx'
import Container from '../Components/Router/layout/Container'
import Message from '../Components/Router/layout/Message'
import ServiceForm from '../Components/service/ServiceForm.jsx'
import ServiceCard from '../Components/service/ServiceCard.jsx'
import { parse, v4 as uuidv4 } from 'uuid'

function Project(){
    const [project, setProject] = useState([]) 
    const [services,setService] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false) 
    const { id } = useParams()
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setServiceForm] = useState(false)
    const [projectMessage, setProjectMessage] = useState('') // Alterar para string
    const [type, setType] = useState('') // Definir o tipo de mensagem (error ou success)

    useEffect(() => {
        setTimeout(() => {
            apiUrl.get(`/projects/${id}`)
            .then((response) => {
                console.log('Projeto:', response.data)
                setProject(response.data)
                setService(response.data.services)
                setRemoveLoading(true)
            })
            .catch((error) => {
                console.error("Erro ao dar get em projetos:", error);
                setProjectMessage('Erro ao carregar o projeto')
                setType('error')
            });
        }, 750);
    }, [id]);

    function calculateTotalCost(services) {
        return services.reduce((total, service) => total + parseFloat(service.cost || 0), 0);
    }

    function createService(){
        setProjectMessage('')

        const lastService = project.services[project.services.length -1]

        lastService.id =  uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)){
            setProjectMessage('Orçamento ultrapassado, verifique o calor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        apiUrl.patch(`/projects/${project.id}`, project)
        .then(() => {
            setProject({ ...project });
            setShowProjectForm(false);
        })
        .catch((error) => {
            console.error("Erro ao adicionar serviço:", error);
            setProjectMessage('Falha ao adicionar o serviço.');
            setType('error');
        });
}

    function removeService(id,cost){
        const servicesUpdated = project.services.filter(
        (service) => service.id !== id
        )

        // Cria um novo objeto de projeto atualizado
        const updatedCost = calculateTotalCost(servicesUpdated);
        const projectUpdated = { ...project, services: servicesUpdated, cost: updatedCost };


        apiUrl.patch(`/projects/${projectUpdated.id}`, projectUpdated)
        .then(() => {
            // Atualiza o estado com o novo objeto após a resposta da API
            setProject(projectUpdated);
            setService(servicesUpdated);
            setProjectMessage('Serviço removido com sucesso!');
            setType('success'); // Exibe uma mensagem de sucesso
        })
        .catch((error) => {
            console.error("Erro ao deletar projeto", error);
            setProjectMessage('Falha ao remover o serviço.');
            setType('error');
        });
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm() {
        setServiceForm(!showServiceForm);
    }

    function EditPost(project) {
        setProjectMessage('')
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
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço: </h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                             {showServiceForm && (<ServiceForm 
                             handleSubmit={createService}
                             btnText='Adicionar serviço'
                             projectData={project}
                             />) }
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass = "start">
                        {services.length > 0 && 
                        services.map((service) => (
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                            />
                        ))}
                        
                        {services.length===0 && <p>Não há serviços cadastrados.</p> }
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
        </>
    );
}

export default Project;
