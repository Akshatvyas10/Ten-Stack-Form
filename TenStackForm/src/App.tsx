import React from 'react'
import Form from './Components/Form'
import ArrayForm from './Components/ArrayForm'

const App:React.FC = () => {
  return (
    <div className='bg-red-400 text-center m-auto'><h1>App</h1>
    <ArrayForm/>
     <Form/>
    </div>
  )
}

export default App