import { useDispatch } from 'react-redux'
import { logout_user } from '../../store/slices/UserSlice'
import MotionLogo from '../../assets/images/logo.png'
import PostsLogo from '../../assets/images/posts_logo.png'
import FindFriends from '../../assets/svgs/icon-friends.svg'
import {
  HeaderContainer,
  HeaderContainerLeft,
  HeaderContainerRight,
  HeaderLayoutDescr,
  HeaderLayoutLink,
  LogoTitle,
  LogoWrap,
} from './Header.styled'
import HeaderDropdown from '../HeaderDropDown/HeaderDropDown'
import { UserMenuDropdown } from '../UserMenuDropdown/UserMenuDropdown'
import { useEffect, useState } from 'react'
import { AxiosMotion } from '../../axios/Axios'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notifications, setNotifications] = useState([])
  console.log('🚀 ~ Header ~ notifications:', notifications)
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await AxiosMotion.get('/social/friends/requests/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setNotifications(response.data.results)
      } catch (error) {
        console.error('Failed to fetch notifications', error)
      }
    }

    fetchNotifications()
  }, [token])

  // const isAuthenticated = useSelector((state) => state.User.accessToken)

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(logout_user())
    navigate('/login')
  }

  return (
    <HeaderContainer>
      <HeaderContainerLeft>
        <LogoWrap to="/">
          <img src={MotionLogo} alt="Motion-Logo" />
          <LogoTitle>Motion</LogoTitle>
        </LogoWrap>
        <HeaderLayoutLink to="/">
          <img src={PostsLogo} alt="post-logo" />
          <HeaderLayoutDescr>Posts</HeaderLayoutDescr>
        </HeaderLayoutLink>
        <HeaderLayoutLink to="/findfriends">
          <img src={FindFriends} alt="find-friends-logo" />
          <HeaderLayoutDescr>Find Friends</HeaderLayoutDescr>
        </HeaderLayoutLink>
      </HeaderContainerLeft>
      <HeaderContainerRight>
        <HeaderDropdown notifications={notifications} />

        <UserMenuDropdown handleLogout={handleLogout} />
      </HeaderContainerRight>
    </HeaderContainer>
  )
}

export default Header
