import { AxiosMotion } from '../../axios/Axios'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import ThingsUserLike from '../../components/ThingsUserLike/ThingsUserLike'
import defaultavatar from '../../assets/svgs/avatar.svg'
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader'
import {
  ProfileContainer,
  UserProfileBtn,
} from '../../components/UserProfile/UserProfile.styled'
import {
  ButtonWrap,
  EditCardLeft,
  EditCardLeftBottom,
  EditCardLeftTop,
  EditCardRight,
  EditCardRightTop,
  EditProfileContainerTop,
  EditProfileImage,
  EditUserCard,
  Input,
  InputLabel,
  InputWrap,
  LikedThingsBtn,
  LikedThingsInput,
  LikedThingsInputWrap,
  LikedThingsWrap,
  SaveBrofileBtn,
  ThingsILikeDescr,
  ThingsILikeForm,
  ThingsILikeFormTop,
} from './EditProfile.styled'

export const EditProfile = () => {
  const token = useSelector((state) => state.user.accessToken)

  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [password, setPassword] = useState('')

  const [thingsILike, setThingsILike] = useState([])
  const [somethingILike, setSomethingILike] = useState('')

  //***Avatar

  const [avatarSource, setAvatarSource] = useState('')

  const updateAvatar = (x) => {
    setAvatarSource(x)
  }

  //***Avatar

  useEffect(() => {
    const fetchUser = async () => {
      AxiosMotion.get('/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data)
          setFirstName(res.data.first_name)
          setEmail(res.data.email)
          setUserName(res.data.username)
          setLastName(res.data.last_name)
          setLocation(res.data.location)
          setPhoneNumber(res.data.phone_number)
          setAboutMe(res.data.about_me)
          setId(res.data.id)
          setThingsILike(res.data.things_user_likes || [])
          setAvatarSource(res.data.avatar || defaultavatar)
        })

        .catch((error) => console.log(error))
    }
    fetchUser()
  }, [token])

  const submitHandler = async (e) => {
    e.preventDefault()

    const body = {
      email: email,
      username: userName,
      things_user_likes: {thingsILike},
      id: id,
      title: '',
      first_name: firstname,
      last_name: lastname,
      job: '',
      location: location,
      phone_number: phoneNumber,
      about_me: aboutMe,
    }

    console.log('Submitting with the following data:', body)
    const formData = new FormData()
    formData.append('content', body)
    if(avatarSource instanceof File) {
      formData.append('avatar', avatarSource)
    }

    console.log('Submitting with the following data:', formData)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      },
    }
    AxiosMotion.patch('/users/me/', formData, config)
      .then((res) => {
        console.log(res)
      })

      .catch((error) => console.log(error.message))
  }

  function updateThingsILike(element) {
    setThingsILike(thingsILike.filter((a) => a !== element))
  }

  const submitHandlerLike = async (e) => {
    e.preventDefault()
    setThingsILike([...thingsILike, somethingILike])
    setSomethingILike('')
  }
  return (
    <ProfileContainer>
      <EditProfileContainerTop>
        <EditUserCard>
          <EditCardLeft>
            <EditCardLeftTop>
              <EditProfileImage src={avatarSource} />
              <AvatarUploader updateAvatar={updateAvatar} />
            </EditCardLeftTop>
            <ButtonWrap>
              <UserProfileBtn className="login-button" type="submit">
                DELETE ACCOUNT
              </UserProfileBtn>
              <SaveBrofileBtn
                form="editprofileform"
                className="login-button"
                type="submit"
              >
                SAVE
              </SaveBrofileBtn>
            </ButtonWrap>
          </EditCardLeft>
          <EditCardRight>
            <EditCardRightTop>
              <form id="editprofileform" onSubmit={submitHandler}>
                <InputWrap>
                  <InputLabel htmlFor="firstname">First name</InputLabel>
                  <Input
                    id="firstname"
                    type="text"
                    required
                    placeholder="first name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="location">Location</InputLabel>
                  <Input
                    id="location"
                    type="text"
                    placeholder="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="aboutme">About</InputLabel>
                  <Input
                    type="text"
                    placeholder="About"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="lastname">Last name</InputLabel>
                  <Input
                    id="lastname"
                    type="text"
                    required
                    placeholder="last name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type="text"
                    required
                    placeholder="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="phonenumber">Phone </InputLabel>
                  <Input
                    id="phonenumber"
                    type="text"
                    placeholder="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </InputWrap>
                <InputWrap>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={12345}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputWrap>
              </form>
            </EditCardRightTop>
            <EditCardLeftBottom>
              <ThingsILikeForm onSubmit={submitHandlerLike}>
                <ThingsILikeFormTop>
                  <ThingsILikeDescr>Things I like</ThingsILikeDescr>

                  <LikedThingsWrap>
                    {thingsILike.length
                      ? thingsILike.map((element, index) => (
                          <ThingsUserLike
                            key={index}
                            element={element}
                            updateThingsILike={updateThingsILike}
                          />
                        ))
                      : null}
                  </LikedThingsWrap>
                </ThingsILikeFormTop>
                <LikedThingsInputWrap>
                  <LikedThingsInput
                    type="text"
                    placeholder="Type Something..."
                    value={somethingILike}
                    onChange={(e) => setSomethingILike(e.target.value)}
                  />
                  <LikedThingsBtn type="submit">ADD</LikedThingsBtn>
                </LikedThingsInputWrap>
              </ThingsILikeForm>
            </EditCardLeftBottom>
          </EditCardRight>
        </EditUserCard>
      </EditProfileContainerTop>
    </ProfileContainer>
  )
}

export default EditProfile
