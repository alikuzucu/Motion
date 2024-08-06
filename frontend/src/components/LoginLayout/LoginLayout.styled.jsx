import styled from 'styled-components'
import backgroundImage from '../../assets/images/background_image.png'
import { Link } from 'react-router-dom'
import avatar from '../../assets/svgs/avatar.svg'
import password from '../../assets/svgs/password.svg'
import mail from '../../assets/svgs/mail.svg'

// $whiteColor: #ffffff;
// $textLighter: #fcf9ff;
// $textLight: #c2b8e1;
// $textDark: #000000;
// $accentColor: #9f84f7;
// $accentColorLighter: #b5b7e0;
// linear-gradient(
//   146deg,
//   rgba(132, 30, 198, 0.5984768907563025) 28%,
//   rgba(31, 78, 212, 0.6) 100%
// )

export const CenteredFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginLayoutContainer = styled(CenteredFlex)`
  height: 100vh;
`

export const CenteredFlexColumn = styled(CenteredFlex)`
  display: flex;
  flex-direction: column;
`

const LinkBase = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #b5b7e0;
  width: 95px;
  height: 30px;
  border-radius: 30px;
  cursor: pointer;
  padding: 4px;
`

export const LoginLayoutLeft = styled(CenteredFlexColumn)`
  position: relative;
  height: 100%;
  width: 43.5%;
  background: linear-gradient(
      146deg,
      rgba(132, 30, 198, 0.5984768907563025) 28%,
      rgba(31, 78, 212, 0.6) 100%
    ),
    url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: space-between;
`

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

export const LogoTitle = styled.h1`
  color: #ffffff;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 30px;
`

export const LogoDescr = styled.p`
  color: #ffffff;
  width: 70%;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 300;
`

export const StoreLink = styled(LinkBase)`
  &:not(:last-child) {
    margin-right: 13px;
  }
`

export const LoginLeftBottom = styled(CenteredFlexColumn)`
  justify-content: flex-end;
  margin-bottom: 35px;
`

export const SocialsWrapper = styled.div`
  margin-bottom: 35px;
`

export const SocialsLink = styled.a`
  &:not(:last-child) {
    margin-right: 13px;
  }
`

export const Copy = styled.small`
  font-size: 12px;
  color: #ffffff;
`

export const LoginRight = styled(CenteredFlexColumn)`
  position: relative;
  height: 100%;
  color: black;
  width: 65%;
`
export const LoginTitle = styled.h1`
  margin: 0;
  font-size: 40px;
  margin-bottom: 50px;
`

export const SignUpWrapper = styled(CenteredFlex)`
  position: absolute;
  top: 38px;
  align-self: end;
  font-size: 15px;
`

export const SignUpDescr = styled.p`
  margin-right: 15px;
`

export const SignUpLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  cursor: pointer;
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  margin-right: 30px;
  width: 120px;
  height: 40px;
  font-size: 12px;
`

export const SignInTitle = styled.h2`
  font-size: 40px;
  margin-bottom: 50px;
`

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const SignInInput = styled.input`
  width: 288px;
  height: 60px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  font-size: 18px;
  padding-left: 50px;
  outline: none;
  background-image: ${(props) => {
    if (props.icon === 'avatar') {
      return `url(${avatar})`
    } else if (props.icon === 'password') {
      return `url(${password})`
    } else if (props.icon === 'mail') {
      return `url(${mail})`
    }
  }};
  background-size: 24px;
  background-position: 12px center;
  background-repeat: no-repeat;
`

export const SignInButton = styled.button`
  border-radius: 30px;
  cursor: pointer;
  padding: 2px;
  border: none;
  background: linear-gradient(
    146deg,
    rgba(132, 30, 198, 0.5984768907563025) 28%,
    rgba(31, 78, 212, 0.6) 100%
  );
  text-transform: uppercase;
  color: #ffffff;
  width: 288px;
  height: 61px;
  margin-top: 170px;
  font-size: 18px;
`

export const SignInError = styled.small`
  color: red;
`

export const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
`

export const SignUpFormWrap = styled.div`
  column-count: 2;
  column-gap: 60px;
`

export const SignUpCodeInput = styled.input`
  width: 96%;
  height: 60px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  font-size: 18px;
  outline: none;
`

export const SignUpInput = styled.input`
  width: 288px;
  height: 60px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  font-size: 18px;
  outline: none;
`
