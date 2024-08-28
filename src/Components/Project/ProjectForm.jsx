import { useEffect, useState } from 'react'
import axios from 'axios'

import Input from '../../Components/form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/Submit'

function ProjectForm({btnText}){
    
    const [categories, setCategories] = useState([])

    const getCategories = async() =>{

        try {
            
            const response = await axios.get(
                "http://localhost:5000/categories"
            );
            
            const data = response.data;

            setCategories(data)

        } catch (error) {
            console.log(error)
            
        }

    }
    useEffect(()=>{

        getCategories()

    },[])
    
    
    
    return(
        <form>
            <Input type="text" text = "Nome do projeto" name="name" placeholder= "Insira o nome do projeto"/>
            <Input type="number" text = "Orçamento do projeto" name="budget" placeholder= "Insira o orçamento total"/>
            <Select  name="category_id" text="Selecione a catergoria" options={categories}/>
            <SubmitButton btnText="Criar projeto"/>
        </form>
    )
}

export default ProjectForm