import { useForm } from 'react-hook-form'
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

const ReactHookForm = () => {
    const { register, watch,handleSubmit } = useForm()
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
        </label>
        <label>
            Email:
            <input type='text' {...register('email')}/>
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
        {watch('uf')}
        </form>
        </>
    )
}
export default ReactHookForm