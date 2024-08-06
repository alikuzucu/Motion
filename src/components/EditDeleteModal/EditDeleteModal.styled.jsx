import styled from 'styled-components'

export const EditModalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const EditModalWrapperLeft = styled.div`
  height: 100%;
  width: 60%;
`

export const EditModalWrapperRight = styled.div`
  height: -webkit-fill-available;
  width: 40%;
  padding: 30px;
`

export const EditPostImage = styled.img`
  max-width: -webkit-fill-available;
  height: -webkit-fill-available;
  object-fit: cover;
`

export const EditPostInput = styled.input`
  margin-bottom: 33px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  width: 100%;
  height: 150px;
`

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const EditDeleteBtn = styled.button`
  background-color: transparent;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 9px 16px;
  cursor: pointer;
`
