import styled from 'styled-components'

export const FriendsContainer = styled.div`
  padding: 40px 120px 0 120px;
  background-color: #f8f8f9;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const FriendsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 450px;
  margin-bottom: 32px;
  padding: 26px 40px;
  border-radius: 5px;
  background-color: white;
  &:nth-child(3n) {
    margin-right: 10px;
  }
`
export const UserPicture = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-bottom: 17px;
`

export const UserName = styled.h4`
  margin: 0;
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 10px;
`

export const UserLocation = styled.p`
  margin: 0;
  font-size: 14px;
  margin-bottom: 29px;
`

export const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 31px;
`

export const ButtonBase = styled.button`
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
  background-color: white;
  width: 130px;
  height: 40px;
  font-size: 12px;
  &:not(:last-child) {
    margin-right: 14px;
  }
`

export const FollowButton = styled(ButtonBase)`
  &.active {
    color: white;
    background: linear-gradient(
      146deg,
      rgba(132, 30, 198, 0.5984768907563025) 28%,
      rgba(31, 78, 212, 0.6) 100%
    );
  }
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

export const FriendDescr = styled.p`
  margin: 0;
  margin-bottom: 30px;
  line-height: 24px;
`

export const FriendLikesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

export const FriendLikesItem = styled.p`
  margin: 0;
  padding: 9px 16px;
  background-color: #f2f2f2;
  border-radius: 20px;
  margin-bottom: 15px;
  &:not(:last-child){
    margin-right: 8px;
  }
`
