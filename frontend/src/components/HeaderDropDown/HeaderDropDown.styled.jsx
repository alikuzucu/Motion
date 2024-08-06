import styled from 'styled-components'

export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  position: relative;
  padding-bottom: 15px;
  margin-right: 59px;
`

export const BellIcon = styled.img`
  width: 24px;
  height: auto;
`

export const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -16px;
  background: linear-gradient(
    146deg,
    rgba(132, 30, 198, 0.5984768907563025) 28%,
    rgba(31, 78, 212, 0.6) 100%
  );
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
`

export const DropdownTitle = styled.h4`
  margin: 0;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 12px 16px;
  color: #000000;
`

export const DropdownContent = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  right: 150px;
  top: 85px;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  z-index: 1;
  &.open {
    display: flex;
  }
`

export const Notification = styled.a`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: #000000;

  &:hover {
    background-color: #f1f1f1;
  }
`
export const DropDownFriendPicture = styled.img`
  border-radius: 50%;
  max-height: 50px;
  min-height: 50px;
  max-width: auto;
  margin-right: 15px;
`
