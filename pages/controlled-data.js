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
    return(
        <>
        <h1>Controlled</h1>
        Name:
         <input type='text' name='name' value={form.name} onChange={onChange} /><br/>
         Email:
         <input type='text'name='email' value={form.email} onChange={onChange} /><br/>
         Desejo receber novidade por email:
         <input type='checkbox'name='subscribe' value={form.subscribe} onChange={onChange} /><br/>
         {form.subscribe && (<p>Obrigado por permitir que enviemos emailas pra vc!</p>)}
        
         <button type="button" onClick={getValue} >
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