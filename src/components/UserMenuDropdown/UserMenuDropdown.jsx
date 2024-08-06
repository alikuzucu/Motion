import {
  DropdownButton,
  DropdownContainer,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Icon,
  MenuIcon,
  UserPhoto,
} from './UserMenuDropdown.styled'
import menuIcon from '../../assets/svgs/menu.svg'
import { useEffect, useState } from 'react'
import profileIcon from '../../assets/svgs/profile-user.svg'
import logoutIcon from '../../assets/svgs/logout-user.svg'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosMotion } from '../../axios/Axios'
import { getUserProfileSuccess } from '../../store/slices/UserProfileSlice'
import avatar from '../../assets/svgs/avatar.svg'

export const UserMenuDropdown = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const token = useSelector((state) => state.user.accessToken)
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.userProfile.user)

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          // fetching user profile
          const userProfileResponse = await AxiosMotion.get('/users/me/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          // dispatching action to store user profile
          dispatch(getUserProfileSuccess(userProfileResponse.data))
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchData()
  }, [token, dispatch])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContainer>
      <DropdownToggle onClick={toggleDropdown}>
        {userProfile && (
          <UserPhoto
            src={userProfile.avatar || avatar}
            alt={userProfile.first_name}
          />
        )}
        {!userProfile && <UserPhoto src={avatar} alt="Default Avatar" />}

        <MenuIcon src={menuIcon} alt="Menu Icon" />
      </DropdownToggle>
      <DropdownMenu className={isOpen ? 'open' : ''}>
        <DropdownItem to="/profiles/me">
          <Icon src={profileIcon} alt="Profile Icon" />
          Profile
        </DropdownItem>
        <DropdownButton onClick={handleLogout}>
          <Icon src={logoutIcon} alt="Logout Icon" />
          Logout
        </DropdownButton>
      </DropdownMenu>
    </DropdownContainer>
  )
}
