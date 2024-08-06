import { Outlet } from 'react-router-dom'
import {
  CenteredFlex,
  LoginLayoutLeft,
  LoginLeftBottom,
  LogoDescr,
  LogoTitle,
  LogoWrapper,
  SocialsLink,
  SocialsWrapper,
  StoreLink,
  LoginLayoutContainer,
  Copy,
} from '../../components/LoginLayout/LoginLayout.styled'
import MotionLogo from '../../assets/images/logo_white.png'
import AppStore from '../../assets/svgs/apple.svg'
import GooglePlay from '../../assets/svgs/google.svg'
import TwitterLogo from '../../assets/svgs/twitter_icon.svg'
import FacebookLogo from '../../assets/svgs/facebook_icon.svg'
import InstagramLogo from '../../assets/svgs/instagram_icon.svg'

export const LoginLayout = () => {
  return (
    <LoginLayoutContainer>
      <LoginLayoutLeft>
        <LogoWrapper>
          <img src={MotionLogo} alt="Motion Logo" />
          <LogoTitle>Motion</LogoTitle>
          <LogoDescr>
            Connect with friends and the world around you with Motion.
          </LogoDescr>
          <CenteredFlex>
            <StoreLink href="#">
              <img src={AppStore} alt="Apple store Logo" />
            </StoreLink>
            <StoreLink href="#">
              <img src={GooglePlay} alt="Google Play Logo" />
            </StoreLink>
          </CenteredFlex>
        </LogoWrapper>

        <LoginLeftBottom>
          <SocialsWrapper>
            <SocialsLink href="#">
              <img src={TwitterLogo} alt="Twitter Logo" />
            </SocialsLink>
            <SocialsLink href="#">
              <img src={FacebookLogo} alt="Facebook Logo" />
            </SocialsLink>
            <SocialsLink href="#">
              <img src={InstagramLogo} alt="Instagram Logo" />
            </SocialsLink>
          </SocialsWrapper>
          <Copy>© Motion 2018. All rights reserved.</Copy>
        </LoginLeftBottom>
      </LoginLayoutLeft>
      <Outlet />
    </LoginLayoutContainer>
  )
}
