import {Formik, Form, Field} from 'formik'
import * as yup from 'yup'

const ufs = ['BA','MG', 'SP','SC','RJ']

//yup requirements objects
const schema = yup.object().shape({
    name: yup.string().required('O campo nom,e é obrigatorio'),
    email:yup.string().required('O campo email é obrigatorio').email('Insira um email válido')
})

const FormFormik = () => {
    return (
        <>
        <h1>Formik Render Prop</h1>
        <Formik
        initialValues={{
           name:'',
           email:'',
           uf:'',
           subscribe: false 
        }}
        onSubmit={async(values)=> {
            console.log(values)
        }}
        validationSchema={schema}
        >
            {
                ({values, errors,touched}) => (
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
                )
            }
        </Formik>
        </>
    )
}
export default FormFormik