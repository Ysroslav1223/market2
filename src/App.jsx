import './App.css'
import { MainPage } from './pages/main-page/main-page'
import { Route,Routes,Link } from 'react-router-dom'
import { AuthorizeFrom } from './pages/authorize/authorize-from'
import { RegisterForm } from './pages/registered/register-form'
import { PersonalAccount } from './pages/personal account/personal-account'
import { SmartphoneCatalog } from './pages/catalog/smartphone-catalog/smartphoneCatalog'
import { ProductPage } from './pages/poductPage/product-page'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../action/set-user'
import { Admin } from './pages/admin/admin'
import ProtectedRoute from './protect-link/protect-link-admin'



function App() {
  const dispatch = useDispatch()


  useEffect(()=>{
    const fetchUser=async()=>{
      const userData=sessionStorage.getItem("userData")
      if(userData){
        dispatch(setUser(JSON.parse(userData)))
      }
    }

    fetchUser()
  },[dispatch])

 
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/auth' element={<AuthorizeFrom/>}/>
        <Route path='/regist' element={<RegisterForm/>}/>
        <Route path='/personAcc' element={<PersonalAccount/>}/>
        <Route path='/posts/:type' element={<SmartphoneCatalog/>}/>
        <Route path='/posts/:type/:id' element={<ProductPage/>}/>
        <Route path='/admin' element={
          <ProtectedRoute>
            <Admin/>
            </ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
