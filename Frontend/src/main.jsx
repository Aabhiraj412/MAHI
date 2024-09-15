import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NavBar from './Components/NavBar.jsx'
import DoctorLogin from './Components/DoctorLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <NavBar/> */}
    <DoctorLogin/>
  </StrictMode>,
)
