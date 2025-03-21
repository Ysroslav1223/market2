import './App.css'
import { Header } from './components/header/header'
import { MainPage } from './pages/main-page/main-page'
import { Route,Routes,Link } from 'react-router-dom'
import { AuthorizeFrom } from './pages/authoraze/authoraze-from'

function App() {
 
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/auth' element={<AuthorizeFrom/>}/>
      </Routes>
    </div>
  )
}

export default App
