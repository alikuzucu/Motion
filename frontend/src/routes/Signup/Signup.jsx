import { useState } from 'react'

import {
  LoginRight,
  SignUpWrapper,
  SignUpDescr,
  SignUpLink,
  CenteredFlexColumn,
  SignInTitle,
  SignInForm,
  SignInInput,
  SignInButton,
  SignInError,
} from '../../components/LoginLayout/LoginLayout.styled'
import { useNavigate } from 'react-router-dom'
import useApiRequest from "../../hooks/useApiRequest.jsx";

const SignUpEmail = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {sendRequest, data} = useApiRequest();

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    sendRequest('POST', 'auth/registration/', {email:email}, true)
  }
  console.log(data)

  if (data) {
    //If the response is positive i called signup component for now this process should be changed
    navigate('/signup/success')
  } else {
    return (
      //First we have only email input with a controlled form it is stored in a use state

      <LoginRight>
        <SignUpWrapper>
          <SignUpDescr>Already have an&nbsp;account?</SignUpDescr>
          <SignUpLink to={'/login'}>Login</SignUpLink>
        </SignUpWrapper>

        <CenteredFlexColumn>
          <SignInTitle>Sign up</SignInTitle>
          <SignInForm onSubmit={submitHandler}>
            <SignInInput
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="mail"
            />
            <SignInButton type="submit">Sign up</SignInButton>
            {error && <SignInError>{error}</SignInError>}
          </SignInForm>
        </CenteredFlexColumn>
      </LoginRight>
    )
  }
}

export default SignUpEmail
