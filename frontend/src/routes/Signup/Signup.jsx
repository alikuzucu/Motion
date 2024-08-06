import { useState } from 'react'
import { AxiosMotion } from '../../axios/Axios'

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

const SignUpEmail = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState('')

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // On submit with the email value we post to motion backend for registiration
      const response = await AxiosMotion.post('/auth/registration/', {
        email: email,
      })
      setResponse(response) //If the response is positive we set it in useState so that page renders again
    } catch (error) {
      setError('Email Failed')
    }
  }
  console.log(response)

  if (response) {
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
