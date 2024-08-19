import {useState} from 'react'
import {
    Badge,
    BellIcon,
    DropdownButton,
    DropdownContent,
    Notification,
} from './HeaderDropDown.styled'
import bellSVG from '../../assets/svgs/notification_bell.svg'
import {DropdownTitle} from './HeaderDropDown.styled'
import {DropDownFriendPicture} from './HeaderDropDown.styled'
import avatar from '../../assets/svgs/avatar.svg'
import confirm from '../../assets/images/ConfirmFR.png'
import reject from '../../assets/images/RejectFR.png'


const HeaderDropdown = ({notifications}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <DropdownButton onClick={toggleDropdown}>
                <BellIcon src={bellSVG} alt="Bell Icon"/>
                {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
            </DropdownButton>
            <DropdownContent className={isOpen ? 'open' : ''}>
                <DropdownTitle>Sent requests: </DropdownTitle>
                {notifications && notifications.map((notification) => (
                    <Notification key={notification.id}>
                        {notification.avatar ? (
                            <DropDownFriendPicture src={notification.avatar}/>
                        ) : (
                            <DropDownFriendPicture src={avatar}/>
                        )}
                        {notification.first_name} {notification.last_name}
                        <DropDownFriendPicture src={confirm}/>
                        <DropDownFriendPicture src={reject}/>
                    </Notification>
                ))}
            </DropdownContent>
        </div>
    )
}

export default HeaderDropdown
