import {Formik, Form, Field} from 'formik'

const ufs = ['BA','MG', 'SP','SC','RJ']

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
        >
            {
                ({values}) => (
                    <Form>
                        <label>
                            Name:
                          <Field type='text' name='name'/>
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
                    </Form>
                )
            }
        </Formik>
        </>
    )
}
export default FormFormik