import styled from 'styled-components'

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const ModalContainerTop = styled.div`
  display: flex;
  width: 100%;
  height: 75%;
  padding-top: 20px;
  padding-left: 5px;
  border-bottom: 1px solid lightgray;
`

export const ModalContainerTopLeft = styled.div`
  width: 15%;
`

export const ModalContainerTopRight = styled.div`
  width: 85%;
`

export const ModalTextInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 26px;
  align-self: center;
  overflow: clip;
  overflow-wrap: break-word;
  word-wrap: break-word;
  width: 90%;
`
export const ModalContainerBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  padding-top: 20px;
  width: 96%;
`

export const ModalImgBtn = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
