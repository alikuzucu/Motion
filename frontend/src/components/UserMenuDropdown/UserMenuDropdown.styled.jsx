import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const DropdownToggle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-bottom: 22px;
`

export const DropdownMenu = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  right: 0;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 180px;
  height: 76px;

  &.open {
    display: flex;
  }
`

export const DropdownItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-align: left;
  text-decoration: none;
  color: black;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  text-align: left;
  text-decoration: none;
  color: black;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`

export const UserPhoto = styled.img`
  border-radius: 50%;
  margin-right: 8px;
  height: 40px;
  width: 40px;
`

export const MenuIcon = styled.img`
  width: 24px;
  height: 24px;
`

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`
