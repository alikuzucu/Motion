import styled from 'styled-components'
// import MotionLogo from '../../assets/images/logo.png'
// import PostsLogo from '../../assets/images/posts_logo.png'
// import FindFriends from '../../assets/svgs/icon-friends.svg'
// import notificationIcon from '../../assets/svgs/notification_bell.svg'
// import userProfile from '../../assets/images/users/jennifer.png'
// import menuIcon from '../../assets/svgs/menu.svg'
import { NavLink } from 'react-router-dom'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 23px 30px 0 30px;
  box-shadow:
    0px 10px 20px 0px rgba(0, 0, 0, 0.05),
    0px 0px 1px 0px rgba(0, 0, 0, 0.2);
`

export const HeaderContainerLeft = styled.div`
  display: flex;
  align-items: center;
`

export const LogoWrap = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  width: fit-content;
  margin-right: 110px;
  padding-bottom: 26px;
`
export const LogoTitle = styled.h3`
  margin: 0;
  margin-left: 12px;
  font-size: 22px;
  font-weight: normal;
`

export const HeaderLayoutLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  width: fit-content;
  padding-bottom: 23px;

  &:not(:last-child) {
    margin-right: 72px;
  }
  &.active {
    border-bottom: 2px solid #ad73fd;
  }
`

export const HeaderLayoutDescr = styled.h4`
  margin: 0;
  margin-left: 16px;
  font-weight: normal;
  font-size: 16px;
`

export const HeaderContainerRight = styled.div`
  display: flex;
  align-items: center;
`

