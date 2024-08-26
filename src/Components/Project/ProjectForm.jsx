import Input from '../../Components/form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/Submit'

function ProjectForm({btnText}){
    return(
        <form>
            <Input type="text" text = "Nome do projeto" name="name" placeholder= "Insira o nome do projeto"/>
            <Input type="number" text = "Orçamento do projeto" name="budget" placeholder= "Insira o orçamento total"/>
            <Select  name="category_id" text="Selecione a catergoria"/>
            <SubmitButton btnText="Criar projeto"/>
        </form>
    )
}

export default ProjectForm