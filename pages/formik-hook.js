import {Formik, Form, Field, useFormik} from 'formik'
import { useEffect } from 'react'
import * as yup from 'yup'

const ufs = ['AC - Acre',
'AL - Alagoas',
'AP - Amapá',
'AM - Amazonas',
'BA - Bahia',
'CE - Ceará',
'DF - Distrito Federal',
'ES - Espírito Santo',
'GO - Goías',
'MA - Maranhão',
'MT - Mato Grosso',
'MS - Mato Grosso do Sul',
'MG - Minas Gerais',
'PA - Pará',
'PB - Paraíba',
'PR - Paraná',
'PE - Pernambuco',
'PI - Piauí',
'RJ - Rio de Janeiro',
'RN - Rio Grande do Norte',
'RS - Rio Grande do Sul',
'RO - Rondônia',
'RR - Roraíma',
'SC - Santa Catarina',
'SP - São Paulo',
'SE - Sergipe',
'TO - Tocantins'
]

//yup requirements objects
const schema = yup.object().shape({
    name: yup.string().required('O campo nom,e é obrigatorio'),
    email:yup.string().required('O campo email é obrigatorio').email('Insira um email válido')
})

const FormFormik = () => {
    const form = useFormik({
        initialValues:{
            name:'',
            email:'',
            uf:'',
            subscribe: false 
         },
         onSubmit: async(values)=> {
             const data = await fetch('/api/users', {
                 method: 'POST',
                 headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(values)
             })
             const json = await data.json()
         },
         validationSchema:schema
        })
        useEffect(()=> {
            const loadData = async() => {
                const data = await fetch('/api/users/1')
                const json = await  data.json()
                form.setFieldValue('name', json.name)
                form.setFieldValue('email', json.email)
                form.setFieldValue('uf', json.uf)
                form.setFieldValue('subscribe', json.subscribe)
            }
            loadData()
            
        },[])
    return (
        <form onSubmit={form.handleSubmit}>
        <h1>Formik Render Prop</h1>
        
            
                
                    
                        <label>
                            Name:
                          <input type='text' name='name' value={form.values.name} onChange={form.handleChange} onBlur={form.handleBlur}/>
                          {
                            form.errors.name && form.touched.name ? form.errors.name : ''
                          }
                        </label>
                        <label>
                            Email:
                           <input type='text' name='email'value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur}/>
                        </label>
                        <label>
                            UF:
                            <select component='select' name='uf' value={form.values.uf} onChange={form.handleChange} onBlur={form.handleBlur}>
                                {ufs.map(uf => <option value={uf} key={uf} >{uf}</option>)}
                            </select>
                        </label>
                        <label>
                         <input type='checkbox' name='subscribe' checked={form.values.subscribe} onChange={form.handleChange} onBlur={form.handleBlur}/>
                        </label>
                        <button type='submit'>Submit</button>
                        <pre>{JSON.stringify(form.values, null, 2)}</pre>
                        <pre>{JSON.stringify(form.touched, null, 2)}</pre>
                    
                
            
        
        </form>
    )
}
export default FormFormik