import { useState } from "react"

const FormControlled = () => {
    const[show,setShow] = useState(true)
    const [value, setValue] = useState('')
    const getValue = () => {
        //add '?' pra deixar a leitura da ação condicionada 
         // console.log(inputRef?.current?.value)
         console.log(value)
    }
    const onChange = (event) => {
        console.log(event)
        setValue(event.target.value)
    }
    return(
        <>
        <h1>Controlled</h1>
        {show && <input type='text' value={value} onChange={onChange} />}
         
         <button type="button" onClick={getValue} >
            get value
         </button>
         {/* use(curr ) => (!curr) pra variar de true ou false a cada click */}
         <button type="button" onClick={() => setShow((curr) => !curr)} >
            show/hide
         </button>
        </>

    )
}

export default FormControlled