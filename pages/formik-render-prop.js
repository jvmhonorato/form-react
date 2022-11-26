import {Formik, Form, Field} from 'formik'
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
    return (
        <>
        <h1>Formik hooks</h1>
        <Formik
        initialValues={{
           name:'',
           email:'',
           uf:'',
           subscribe: false 
        }}
        onSubmit={async(values)=> {
            const data = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const json = await data.json()
        }}
        validationSchema={schema}
        >
            {
                //render prop
                ({values, errors,touched, setFieldValue}) => {
                    useEffect(()=> {
                        const loadData = async() => {
                            const data = await fetch('/api/users/1')
                            const json = await  data.json()
                            setFieldValue('name', json.name)
                            setFieldValue('email', json.email)
                            setFieldValue('uf', json.uf)
                            setFieldValue('subscribe', json.subscribe)
                        }
                        loadData()
                        
                    },[])
                    return(
                    <Form>
                        <label>
                            Name:
                          <Field type='text' name='name'/>
                          {
                            errors.name && touched.name ? errors.name : ''
                          }
                        </label>
                        <label>
                            Email:
                           <Field type='text' name='email'/>
                        </label>
                        <label>
                            UF:
                            <Field component='select' name='uf'>
                                {ufs.map(uf => <option value={uf} key={uf} >{uf}</option>)}
                            </Field>
                        </label>
                        <label>
                         <Field type='checkbox' name='subscribe'/>
                        </label>
                        <button type='submit'>Submit</button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Form>
                )}}
            
        </Formik>
        </>
    )
}
export default FormFormik