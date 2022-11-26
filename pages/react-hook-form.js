import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

const ReactHookForm = () => {
    const { register, watch,handleSubmit, setValue, formState:{errors} } = useForm({
        mode:'onChange',
        resolver: yupResolver(schema)
    })
    useEffect(()=> {
        const loadData = async() => {
            const data = await fetch('/api/users/3')
            const json = await data.json()
            setValue('name', json.name)
            setValue('email', json.email)
            setValue('uf', json.uf)
            setValue('subscribe', json.subscribe)
             
           
        }
        loadData()
    },[]) 
    const onSubmit = async(values) => {
        const data = await fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const json = await data.json()
    }
    console.log(watch('name'))
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>React-hook-form</h1>
        <label>
            Name:
            <input type='text' {...register('name')}/>
            {errors?.name && <p>{errors.name.message}</p>}
        </label>
        <label>
            Email:
            <input type='text' {...register('email')}/>
            {errors?.email && <p>{errors.email.message}</p>}
        </label>
        <label>
            
            <input type='checkbox' {...register('subscribe')}/>
        </label>
        <label>
            UF:
            <select name='uf' {...register('uf')}>
                {ufs.map(uf => <option value={uf} key={uf} >{uf}</option>)}
             </select>
        </label>
        <button type="submit">SEND</button>
       <pre>{console.log(errors)}</pre>
        </form>
        </>
    )
}
export default ReactHookForm