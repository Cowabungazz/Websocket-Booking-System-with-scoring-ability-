import React from 'react'
import style from './Login.module.scss'
import LoginForm from '../../components/loginform/LoginForm'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const [serverUp,setServerUp] = React.useState(false)
  React.useEffect(() => {
    const host = process.env.REACT_APP_BACKEND
    const checkServer = async () => {
      try {
        const response = await axios.get(host + '/')
        if (response.status === 200) {
          setServerUp(true)
          
        }
      } catch (error) {
        setServerUp(false)
        setTimeout(checkServer, 1000) 
      }
    }

    checkServer()
  }, [])
  return (
    <div className={style.Holder}>
      {serverUp===false && <div className={style.Loader}>
        <div className={style.LoadGroup}>
          <div className={style.Backdrop}/>
          <div className={style.DotGroup}>
          <div className={style.Dot}/>
          <div className={style.Dot}/>
          <div className={style.Dot}/>
          </div>
          <h3>Hang tight, waking up backend server</h3>
          <h3>(~2 minutes)</h3>
        </div>
      </div>}
        <LoginForm />
        <img className={style.Backdrop} src="https://images.unsplash.com/photo-1529154166925-574a0236a4f4?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  )
}

export default Login