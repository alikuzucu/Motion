import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const PostFeedSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 144px 0 144px;
  border-bottom: 0.5px solid lightgrey;
`

export const SearchPostFeedWrap = styled.div`
  display: flex;
`

export const PostFeedSearchIcon = styled.img`
  height: 20px;
  width: 20px;
  padding-bottom: 30px;
  margin-right: 16px;
`

export const PostFeedSearchDescr = styled.p`
  margin: 0;
  color: grey;
  padding-bottom: 30px;
`

export const PostFeedSearchList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const PostFeedSearchItem = styled(NavLink)`
  color: lightgrey;
  text-decoration: none;
  padding-bottom: 30px;
  &:not(:last-child) {
    margin-right: 40px;
  }
  &:first-child {
    color: black;
    border-bottom: solid 1px black;
  }

  /* commented out while no functionality */
  /* &.active {
    color: black;
    border-bottom: solid 1px black;
  } */
`

export const PostFeedContainer = styled.div`
  column-count: 2;
  column-gap: 32px;
  padding: 32px 144px;
`

export const PostItem = styled.div`
  break-inside: avoid;
  margin-bottom: 40px;
  border: 0.5px solid #e6e6e6;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.05),
    0px 0px 1px rgba(0, 0, 0, 0.25);
`

export const CreatePostForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const PostButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`

export const PostProfileImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`

export const PostPlaceholder = styled.p`
  font-size: 16;
  color: #000000;
  opacity: 50%;
`

export const PostWrapTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PostWrapAvNameTime = styled.div`
  display: flex;
  align-items: center;
`

export const PostWrapNameTime = styled.div`
  display: flex;
  flex-direction: column;
`

export const PostAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
`

export const PostDescr = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-size: 14px;
  color: black;
`
export const PostDescrGrey = styled(PostDescr)`
  color: lightgray;
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
export const PostImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  ${({ single }) =>
    single &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `}
`

export const PostImage = styled.img`
  width: ${({ single }) => (single ? 'calc(50% - 10px)' : 'calc(50% - 10px)')};
  object-fit: cover;
  max-height: ${({ single }) => (single ? '500px' : '400px')};
`
