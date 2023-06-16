import { useState } from "react"
import { useNavigate } from "react-router-dom"

function New() {
    const navigate = useNavigate()
    const [breadInput, setBreadInput] = useState({
        name: '',
        hasGluten: true,
        image:''
    })
    // const [glutenCheck, setGlutenCheck] = useState(true)
    
    //function for the change in name and image inputs
    const handleChange= (e) => {
        const value = e.target.value;
        setBreadInput({
            ...breadInput,
            [e.target.name]: value
        });
    }

    // function for the gluten checkbox
    const handleGlutenCheck = (e) => {
        const checked = e.target.checked
        setBreadInput({
            ...breadInput,
            [e.target.name]: checked
        })
    }

    //function for the submision on the form to add to the database
    const handleSubmit = async (e) => {
        e.preventDefault()
        const URL = `${process.env.REACT_APP_BACKEND_URI}/breads`
        console.log('bread input', breadInput)
        const response = await fetch(URL,{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(breadInput)
        })
        if (response.status !== 201) console.log('error') // add error handling later
        navigate('/')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={breadInput.name} name='name' placeholder="name" />
            <input onChange={handleGlutenCheck} defaultChecked={breadInput.hasGluten} name="hasGluten" value={breadInput.hasGluten} type='checkbox' />
            <input onChange={handleChange} value={breadInput.image} name='image' placeholder="image" />
            <input type='submit' />
        </form>

    )
}

export default New