import styled from 'styled-components'

export const EditProfileContainerTop = styled.div`
  position: relative;
  background-color: white;
  height: 730px;
  width: 1152px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  box-shadow:
    0px 10px 20px rgba(0, 0, 0, 0.05),
    0px 0px 1px rgba(0, 0, 0, 0.25);
`

export const EditUserCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const EditCardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid lightgrey;
  padding: 80px 40px 90px 40px;
  width: 290px;
`

export const EditCardLeftTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const EditImgBtn = styled.button`
  outline: none;
  background-color: transparent;
  text-transform: uppercase;
  border: 1px solid black;
  padding: 16px 33px;
  cursor: pointer;
  border-radius: 35px;
  margin-top: 20px;
`

export const EditProfileImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
`

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SaveBrofileBtn = styled.button`
  outline: none;
  color: white;
  border: none;
  background: linear-gradient(
    146deg,
    rgba(132, 30, 198, 0.5984768907563025) 28%,
    rgba(31, 78, 212, 0.6) 100%
  );
  text-transform: uppercase;
  padding: 16px 33px;
  cursor: pointer;
  border-radius: 35px;
  margin-top: 20px;
  min-width: 215px;
`

export const EditCardRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 60px 60px 70px 60px;
`

export const EditCardRightTop = styled.div`
  column-count: 2;
  column-gap: 60px;
  height: 60%;
`
export const EditCardLeftBottom = styled.div`
  display: flex;
`

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 90%;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgray;
`

export const InputLabel = styled.p`
  margin: 0;
  font-size: 12px;
  color: grey;
  margin-bottom: 7px;
`

export const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
`

export const ThingsILikeForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ThingsILikeFormTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ThingsILikeDescr = styled.p`
  margin: 0;
  margin-bottom: 14px;
`

export const LikedThingsWrap = styled.div`
  display: flex;
  margin-bottom: 100px;
`

export const LikedThing = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 7px 15px;
  border-radius: 20px;
  background-color: lightgrey;
  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const LikedThingBtn = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`

export const LikedThingsInputWrap = styled.div`
  width: 100%;
`
export const LikedThingsInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  margin-right: 15px;
  padding-bottom: 14px;
  border-bottom: 1px solid lightgrey;
`

export const LikedThingsBtn = styled.button`
  outline: none;
  background-color: transparent;
  text-transform: uppercase;
  border: 1px solid lightgrey;
  padding: 16px 33px;
  cursor: pointer;
  border-radius: 35px;
  margin-top: 20px;
  font-size: 12px;
`
