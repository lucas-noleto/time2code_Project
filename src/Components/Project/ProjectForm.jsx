import { useEffect, useState } from 'react';
 

import Input from '../../Components/form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import apiUrl from '../../axios/config';

function ProjectForm({ btnText, handleSubmit, projectData }) {
    const [categories, setCategories] = useState([]); 
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await apiUrl.get("/categories");
                const data = response.data;
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'category_id') {
            const selectedCategory = categories.find(category => category.id === e.target.value);
            setProject({ ...project, category: selectedCategory });
        } else {
            setProject({ ...project, [e.target.name]: e.target.value });
        }
    };
    

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    return (
        <form onSubmit={submit}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto" 
                handleOnChange={handleChange} 
                value={project.name || ''} 
            />
            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget" 
                placeholder="Insira o orçamento total" 
                handleOnChange={handleChange} 
                value={project.budget || ''} 
            />
            <Select 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories} 
                handleOnChange={handleChange} 
                value={project.category || {}} 
            />

            <SubmitButton btnText={btnText} />
        </form>
    );
}

export default ProjectForm;
