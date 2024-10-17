import styles from './Project.module.css'
import apiUrl from '../axios/config'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Components/Router/layout/Loading.tsx'
import Container from '../Components/Router/layout/Container'

function Project(){
    const [project,setProject] = useState([]) 
    const [removeLoading,setRemoveLoading] =useState(false) 
    const {id} = useParams()
    const [showProjectForm,setShowProjectForm] = useState(false)


    useEffect (()=>{
        setTimeout (()=>{
            apiUrl.get(`/projects/${id}`)
            .then((response)=>{
                console.log('Projeto:', response.data)
                const data = response.data
                setProject(data)
                setRemoveLoading(true)
            })
            .catch((error) => {
                console.error("Erro ao dar get em projetos:", error);
                // Exibir uma mensagem de erro ou tratar o erro de forma apropriada
                
            }, [id]);
        
    },750)
     },[id])

    function toggleProjectForm (){
        setShowProjectForm(!showProjectForm)

    }

    return(
        <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass= 'column'>
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}

                        </button>
                        {!showProjectForm ? ( 
                            <div className={styles.project_info}>
                                <p><span>Categoria: </span>{project.category.name}   </p>
                                <p>
                                    <span>Total do Orçamento: </span>R${project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado: </span>R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <p>Detalhes do Projeto</p>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            ):(
                <Loading />
            )}
            
        </>
    )
}

export default Project