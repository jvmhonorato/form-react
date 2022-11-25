import { useState, useEffect } from "react"
import * as yup from 'yup'

const ufs = ['BA','SP','MG','RJ']

//yup requirements objects
const schema = yup.object().shape({
    name: yup.string().required('O campo nom,e é obrigatorio'),
    email:yup.string().required('O campo email é obrigatorio').email('Insira um email válido')
})

const FormControlled = () => {
    
    const [form, setFormValues] = useState({
        name:'',
        email:'',
        uf:'',
        subscribe:false,
    })
    const [hasError, setHasError] = useState(false)
    const [errors, setErrors] = useState({})
    const [loaded,setLoaded] = useState(false)
    const [sending, setSending] = useState(false)
    useEffect(()=> {
        const loadData = async() => {
            const data = await fetch('/api/users/3')
            const json = await data.json()
            setFormValues({
                name:json.name,
                email:json.email,
                uf:json.uf,
                subscribe:json.subscribe
            })
            setLoaded(true)
        }
        loadData()
    },[]) 
    useEffect(()=> {
        const validation = async() => {
        const hasError = await schema.isValid(form)
        setHasError(hasError)
        try{
            await schema.validate(form, { abortEarly: false})
            setErrors({})
        }catch(err){
            console.log(JSON.stringify(err.inner, null,2))
            const errors = err.inner.reduce(
                (prev,curr)=>({...prev, [curr.path]: curr.message}),{}
            )
            setErrors(errors)
            console.log(errors)
        }
        console.log(hasError)
        }
        validation()
    },[form])

    const getValue = () => {
        //add '?' pra deixar a leitura da ação condicionada 
         // console.log(inputRef?.current?.value)
         console.log(form)
    }
    const onChange = (event) => {
        
        const formField = event.target.name
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setFormValues(curr => {
            return {
                ...curr,
                [formField]: value
            }
        }
      )
    }
    const submit = async() => {
        setSending(true)
        const data = await fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const json = await data.json()
        console.log(json)
        setSending(false)
    }

    return(
        <>
        
        <h1>Controlled with YUP {JSON.stringify(loaded)}</h1>
        {loaded && <>
        Name:
         <input type='text' name='name' value={form.name} onChange={onChange} /><br/>
         {errors.name && <p>{errors.name}</p>}
         Email:
         <input type='text'name='email' value={form.email} onChange={onChange} /><br/>
         {errors.email && <p>{errors.email}</p>}
         Desejo receber novidade por email:
         <input type='checkbox'name='subscribe' value={form.subscribe} checked={form.subscribe} onChange={onChange} /><br/>
         {form.subscribe && (<p>Obrigado por permitir que enviemos emailas pra vc!</p>)}
        
         <button type="button" onClick={getValue} >
            get value
         </button>
         <button type="button" onClick={submit} >
            submit form
         </button>
         <select name='uf' onChange={onChange} value={form.uf}>
            <option>Selecione UF</option>
            {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
         </select>
         {/* use(curr ) => (!curr) pra variar de true ou false a cada click */}
        
         <pre>{JSON.stringify(form,null,2)}</pre>
         </>}
        </>

    )
}

export default FormControlled