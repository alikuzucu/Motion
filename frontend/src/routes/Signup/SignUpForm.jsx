import { useState } from 'react'
import { AxiosMotion } from '../../axios/Axios'
import {
  LoginRight,
  SignInButton,
  SignInForm,
  SignInInput,
  SignInTitle,
  SignUpCodeInput,
  SignUpFormContainer,
  SignUpFormWrap,
  SignUpInput,
} from '../../components/LoginLayout/LoginLayout.styled'
import {useNavigate} from "react-router-dom";

const SignUpForm = () => {
  //We use a lot of useStates as there is a lot of info to send to api

  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    if (password === password2) {
      // This part is just to chek if the password and password repeat is the same
      //if it is not same we dont need to send a request to motion backend
      try {
        const response = await AxiosMotion.patch(
          //With all the stored values we send a request to validate our registiration
          '/auth/registration/validation/',
          {
            email: email,
            username: userName,
            code: code,
            password: password,
            password_repeat: password,
            first_name: firstname,
            last_name: lastname,
          },
        )

        setSuccess('User Created!!! redirecting to login...') // Success message just for test purposes
        setTimeout(()=>{
          navigate('/login')
        },5000)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    } else {
      alert('Please make sure your passwords match') // Error if passwords dont match
    }
  }
  return (
    //Take the values from form set them in useStates
    <LoginRight>
      <SignUpFormContainer>
        <SignInTitle>Verification</SignInTitle>
        <SignInForm id="signupform" onSubmit={submitHandler}>
          <SignUpCodeInput
            type="password"
            required
            placeholder="Validation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <SignUpFormWrap>
            <SignUpInput
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SignUpInput
              type="text"
              required
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <SignUpInput
              type="text"
              required
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <SignUpInput
              type="text"
              required
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <SignUpInput
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SignUpInput
              type="password"
              required
              placeholder="Password repeat"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </SignUpFormWrap>
        </SignInForm>

        <SignInButton form="signupform" className="login-button" type="submit">
          Complete
        </SignInButton>
        {error && <small>{error}</small>}
        {success && <small>{success}</small>}
      </SignUpFormContainer>
    </LoginRight>
  )
}

export default SignUpForm
