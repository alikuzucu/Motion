import styled from 'styled-components'

export const LikeShareBtn = styled.button`
  padding: 0;
  border: none;

  display: flex;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 32px;
  }
`

export const LikeShareIcon = styled.img`
    margin-right: 16px;
    max-width: 20px;
    max-height: 20px;
`

export const LikedDescr = styled.p`
color: lightgray;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const LikesContainer = styled.div`
  flex-grow: 1;
  text-align: right;
`
