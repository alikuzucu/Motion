import { useNavigate } from 'react-router-dom'
import {
  CenteredFlexColumn,
  LoginRight,
  SignInButton,
  SignInTitle,
  SignUpDescr,
  SignUpLink,
  SignUpWrapper,
} from '../../components/LoginLayout/LoginLayout.styled'
import confirmicon from '../../assets/svgs/confirm_icon.svg'

const SignUpSuccess = () => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate('../signup/final')
  }
  return (
    <LoginRight>
      <SignUpWrapper>
        <SignUpDescr>Already have an&nbsp;account?</SignUpDescr>
        <SignUpLink to={'/login'}>Login</SignUpLink>
      </SignUpWrapper>

      <CenteredFlexColumn>
        <SignInTitle>Congratulations!</SignInTitle>

        <img
          src={confirmicon}
          alt="Confirm Icon"
          style={{ height: '150px', width: '150px', marginBottom: '50px' }}
        />

        <div>We&apos;ve sent a confirmation code to your email</div>

        <SignInButton type="button" onClick={(e) => clickHandler(e)}>
          Continue
        </SignInButton>
      </CenteredFlexColumn>
    </LoginRight>
  )
}

export default SignUpSuccess
