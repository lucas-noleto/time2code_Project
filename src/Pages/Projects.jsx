import Message from '../Components/Router/layout/Message'
import { useLocation } from 'react-router-dom'
import apiUrl from '../axios/config'


function Projects(){

    const location = useLocation()
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
        <div>
            <h1>
                Meus Projetos
            </h1>
            {message && <Message msg={message} type="success" />}
            {getProject()}
        </div>
    )
}

export default Projects 