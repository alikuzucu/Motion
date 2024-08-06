import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosMotion } from '../../axios/Axios'
import { login_user } from '../../store/slices/UserSlice'
import {
  CenteredFlexColumn,
  LoginRight,
  SignInButton,
  SignInForm,
  SignInInput,
  SignInTitle,
  SignUpDescr,
  SignUpLink,
  SignUpWrapper,
  SignInError,
} from '../../components/LoginLayout/LoginLayout.styled'

const Login = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('sigor39948@avastu.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    setError('')
    try {
      const response = await AxiosMotion.post('/auth/token/', {
        email: email,
        password: password,
      })
      const accessToken = response.data.access

      localStorage.setItem('accessToken', accessToken)
      dispatch(login_user(accessToken))

      const from = location.state?.from || { pathname: '/' }
      navigate(from)
    } catch (error) {
      console.error(error)
      setError('Login failed')
    }
  }
  return (
    <LoginRight>
      <SignUpWrapper>
        <SignUpDescr>Don&rsquo;t have an&nbsp;account?</SignUpDescr>
        <SignUpLink to={'/signup'}>Sign up</SignUpLink>
      </SignUpWrapper>
      <CenteredFlexColumn>
        <SignInTitle>Sign In</SignInTitle>
        <SignInForm onSubmit={submitHandler}>
          <SignInInput
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="avatar"
          />
          <SignInInput
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="password"
          />
          <SignInButton type="submit">Sign In</SignInButton>
        </SignInForm>
        {error && <SignInError>{error}</SignInError>}
      </CenteredFlexColumn>
    </LoginRight>
  )
}

export default Login
