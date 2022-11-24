import { useState } from "react"

const ufs = ['BA','SP','MG','RJ']

const FormControlled = () => {
    
    const [form, setFormValues] = useState({
        name:'',
        email:'',
        uf:'',
        subscribe:false,
    })
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
    const erros = {
        name:false,
        email:false
    }
    if(form.name === ''){
        erros.name = true
    }
    if(form.email === '' || form.email.indexOf('@') < 0){
        erros.email = true
    }
    //pegar as keys do objeto erros e unir ambas com reduce começando com o valor inicialfalse
    const hasError = Object.keys(erros).reduce((prev, curr) => prev || erros[curr], false)
    return(
        <>
        <h1>Controlled {JSON.stringify(hasError)}</h1>
        Name:
         <input type='text' name='name' value={form.name} onChange={onChange} /><br/>
         {erros.name && <p>Por favor informe o nome</p>}
         Email:
         <input type='text'name='email' value={form.email} onChange={onChange} /><br/>
         {erros.email && <p>Por favor informe o email</p>}
         Desejo receber novidade por email:
         <input type='checkbox'name='subscribe' value={form.subscribe} onChange={onChange} /><br/>
         {form.subscribe && (<p>Obrigado por permitir que enviemos emailas pra vc!</p>)}
        
         <button type="button" onClick={getValue} disabled={hasError} >
            get value
         </button>
         <select name='uf' onChange={onChange} value={form.uf}>
            <option>Selecione UF</option>
            {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
         </select>
         {/* use(curr ) => (!curr) pra variar de true ou false a cada click */}
        
         <pre>{JSON.stringify(form,null,2)}</pre>
        </>

    )
}

export default FormControlled