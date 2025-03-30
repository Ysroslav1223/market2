import './App.css'
import { MainPage } from './pages/main-page/main-page'
import { Route,Routes,Link } from 'react-router-dom'
import { AuthorizeFrom } from './pages/authorize/authorize-from'
import { RegisterForm } from './pages/registered/register-form'
import { PersonalAccount } from './pages/personal account/personal-account'

function App() {



 
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/auth' element={<AuthorizeFrom/>}/>
        <Route path='/regist' element={<RegisterForm/>}/>
        <Route path='/personAcc' element={<PersonalAccount/>}/>
      </Routes>
    </div>
  )
}

export default App
