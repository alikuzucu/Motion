import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosMotion } from '../../axios/Axios'
import '../FetchUserDetails/FetchUserDetails.css'
import defaultavatar from '../../assets/svgs/avatar.svg'
import {
  getUserProfileStart,
  getUserProfileSuccess,
  getUserProfileFailure,
} from '../../store/slices/UserProfileSlice'
import {
  AboutInfo,
  ContactsContainer,
  EmailContainer,
  LikedThings,
  LikedThingsContainer,
  ProfileContainerTop,
  UserAvatar,
  UserCard,
  UserCardLeft,
  UserCardRight,
  UserCardRightBottom,
  UserCardRightTop,
  UserCardRightTopLeft,
  UserDescr,
  UserDescrTitle,
  UserLikedThingsContainer,
  UserLocation,
  UserName,
  UserProfileBtn,
  UserStatCount,
  UserStatCountDescr,
  UserStatWrap,
} from '../UserProfile/UserProfile.styled'

const FetchOtherUserDetails = ({ userId }) => {
  console.log('🚀 ~ FetchOtherUserDetails ~ userId:', userId)
  const token = useSelector((state) => state.user.accessToken)
  const [user, setUser] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUserProfileStart())
      try {
        const res = await AxiosMotion.get(`/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // dispatching User profile info to the redux store to be able to access it everywhere in the app

        dispatch(getUserProfileSuccess(res.data))
        setUser(res.data)
        console.log(res.data)
      } catch (error) {
        dispatch(getUserProfileFailure(error.message))
      }
    }

    if (token) {
      fetchUser()
    }
  }, [token, dispatch, userId])

  return (
    <ProfileContainerTop>
      <UserCard>
        <UserCardLeft>
          <UserAvatar src={user.avatar || defaultavatar} alt="User avatar" />
          <UserName>
            {user.first_name} {user.last_name}
          </UserName>
          <UserLocation>{user.location}</UserLocation>
          <UserProfileBtn type="button" style={{ width: '170px' }}>
            FOLLOW
          </UserProfileBtn>
          <UserProfileBtn
            type="button"
            style={{ marginTop: '1vh', width: '170px' }}
          >
            ADD FRIEND
          </UserProfileBtn>
        </UserCardLeft>

        <UserCardRight>
          <UserCardRightTop>
            <UserCardRightTopLeft>
              <AboutInfo>
                <UserDescrTitle>About</UserDescrTitle>
                <UserDescr>{user.about_me}</UserDescr>
              </AboutInfo>
              <ContactsContainer>
                <EmailContainer>
                  <UserDescrTitle>Email</UserDescrTitle>
                  <UserDescr>{user.email}</UserDescr>
                </EmailContainer>
                <div>
                  <UserDescrTitle>Phone</UserDescrTitle>
                  <UserDescr>{user.phone_number}</UserDescr>
                </div>
              </ContactsContainer>
            </UserCardRightTopLeft>
            <LikedThingsContainer>
              <UserDescrTitle>Things I like</UserDescrTitle>
              <UserLikedThingsContainer>
                {user &&
                  user.things_user_likes.map((element, index) => (
                    <LikedThings key={index}>{element}</LikedThings>
                  ))}
              </UserLikedThingsContainer>
            </LikedThingsContainer>
          </UserCardRightTop>
          <UserCardRightBottom>
            <UserStatWrap>
              <UserStatCount>{user.amount_of_posts}</UserStatCount>
              <UserStatCountDescr>Posts</UserStatCountDescr>
            </UserStatWrap>
            <UserStatWrap>
              <UserStatCount>{user.amount_of_likes}</UserStatCount>
              <UserStatCountDescr>Likes</UserStatCountDescr>
            </UserStatWrap>
            <UserStatWrap>
              <UserStatCount>{user.amount_of_friends}</UserStatCount>
              <UserStatCountDescr>Friends</UserStatCountDescr>
            </UserStatWrap>
            <UserStatWrap>
              <UserStatCount>{user.amount_of_followers}</UserStatCount>
              <UserStatCountDescr>Followers</UserStatCountDescr>
            </UserStatWrap>
            <UserStatWrap>
              <UserStatCount>{user.amount_following}</UserStatCount>
              <UserStatCountDescr>Following</UserStatCountDescr>
            </UserStatWrap>
          </UserCardRightBottom>
        </UserCardRight>
      </UserCard>
    </ProfileContainerTop>
  )
}
export default FetchOtherUserDetails
