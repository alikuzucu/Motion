import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding-top: 120px;
  justify-content: center;
  background-image: url('../../src/assets/images/profilebackgroud.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  margin-bottom: 30px;
`

export const PostFeedProfile = styled.div`
  column-count: 2;
  column-gap: 32px;
  padding: 30px 144px;
`

export const ProfileContainerTop = styled.div`
  position: relative;
  background-color: white;
  height: 402px;
  width: 1152px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.05),
    0px 0px 1px rgba(0, 0, 0, 0.25);
`

export const UserCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`

export const UserCardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid lightgrey;
  padding: 80px 70px 90px 80px;
  width: 320px;
`

export const UserAvatar = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: 15px;
  border-radius: 50%;
`

export const UserName = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
`

export const UserLocation = styled.p`
  margin: 0;
  font-size: 14px;
  margin-bottom: 30px;
`

export const UserProfileBtn = styled.button`
  outline: none;
  background-color: transparent;
  text-transform: uppercase;
  border: 1px solid black;
  padding: 16px 38px;
  cursor: pointer;
  border-radius: 35px;
`

export const UserCardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 60px;
`

export const UserCardRightTop = styled.div`
  display: flex;
  width: 100%;
  height: 60%;
`

export const UserCardRightTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  width: 100%;
`

export const AboutInfo = styled.div`
  margin-bottom: 37px;
`

export const UserDescrTitle = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 16.5px;
  margin-bottom: 16px;
`

export const UserDescr = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 16.5px;
  margin-bottom: 16px;
`

export const LikedThingsContainer = styled.div`
  width: 100%;
`

export const ContactsContainer = styled.div`
  display: flex;
`

export const EmailContainer = styled.div`
  margin-right: 60px;
`

export const UserLikedThingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const LikedThings = styled.p`
  margin: 0;
  padding: 9px 16px;
  width: fit-content;
  margin-bottom: 16px;
  background-color: #f2f2f2;
  border-radius: 20px;
  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const UserCardRightBottom = styled.div`
  display: flex;
  align-items: center;
  padding-top: 40px;
  justify-content: space-around;
  width: 100%;
  border-top: 1px solid lightgrey;
`

export const UserStatWrap = styled(NavLink)`
  text-decoration: none;
  padding-bottom: 38px;
  color: lightgrey;

  &:first-child {
    color: black;
    border-bottom: 3px solid #ad73fd;
  }

  /* &.active {
    border-bottom: 3px solid #AD73FD;
  } */
`

export const UserStatCount = styled.p`
  margin: 0;
  margin-bottom: 7px;
  font-size: 24px;
`

export const UserStatCountDescr = styled.p`
  margin: 0;
  margin-bottom: 7px;
  font-size: 16px;
`
