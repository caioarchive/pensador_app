import {Routes, Route} from 'react-router-dom' //importa routesss!!
import PageCadastro from '../pages/cadastro/index'
import Login from '../pages/login'
import Pensamentos from '../pages/pensamentos'
import { ProtectedRoute } from '../components/ProtectedRoute'

const App = () => {
  return (
    <>
    <div className='App'>
    <Routes> {/* faça como fosse um ul/li do html, primeiro vem Routes e depois Route! */}
        <Route path='/cadastro' element={<PageCadastro/>}/>
        <Route path='/' element={<Login/>}/>
      <Route                                          
        path="/pensamentos" element={<ProtectedRoute> <Pensamentos /></ProtectedRoute>}
      />
    </Routes>
    </div>
    </>
  )
}

export default App
