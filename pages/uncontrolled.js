import { useRef, useState } from "react"

const FormUncontrolled = () => {
    const[show,setShow] = useState()
    const inputRef = useRef()
    const getValue = () => {
        //add '?' pra deixar a leitura da ação condicionada 
          console.log(inputRef?.current?.value)
    }
  
    return (
        <>
         <h1>Uncontrolled</h1>
         {show && <input type='text' ref={inputRef}/>}
         
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

export default FormUncontrolled