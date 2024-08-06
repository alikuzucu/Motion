import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosMotion } from '../../axios/Axios'
import { update_post, delete_post } from '../../store/slices/PostSlice'
import avatar from '../../assets/svgs/avatar.svg'
import { getUserProfileSuccess } from '../../store/slices/UserProfileSlice'
import {
  PostAvatar,
  PostDescr,
  PostDescrGrey,
  PostWrapAvNameTime,
  PostWrapNameTime,
} from '../PostFeed/PostFeed.styled'
import {
  ButtonWrap,
  EditDeleteBtn,
  EditModalWrapper,
  EditModalWrapperLeft,
  EditModalWrapperRight,
  EditPostImage,
  EditPostInput,
} from './EditDeleteModal.styled'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '900px',
    height: '560px',
    padding: '0',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}

Modal.setAppElement('#root')

const EditDeleteModal = ({ isOpen, onRequestClose, post }) => {
  const [editedContent, setEditedContent] = useState(post.content)
  const token = useSelector((state) => state.user.accessToken)
  const userProfile = useSelector((state) => state.userProfile.user)

  const dispatch = useDispatch()

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

  const handleUpdatePost = async (e) => {
    e.preventDefault()
    try {
      const response = await AxiosMotion.patch(
        `/social/posts/${post.id}/`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      dispatch(update_post(response.data))
      onRequestClose()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await AxiosMotion.delete(`/social/posts/${post.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch(delete_post(post.id))
        onRequestClose()
      } catch (error) {
        console.error(error)
      }
    }
  }

  function getTimeDifference(createdAt) {
    const now = new Date()
    const then = new Date(createdAt)

    const difference = now - then

    const seconds = Math.floor(difference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return days === 1 ? 'Yesterday' : `${days} days ago`
    } else if (hours > 0) {
      return `${hours} hours ago`
    } else if (minutes > 0) {
      return `${minutes} minutes ago`
    } else {
      return `${seconds} seconds ago`
    }
  }
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <EditModalWrapper>
        <EditModalWrapperLeft>
          {post.images && post.images.length > 0 && (
            <EditPostImage src={post.images[0].image} alt="Post Image" />
          )}
        </EditModalWrapperLeft>
        <EditModalWrapperRight>
          {userProfile && (
            <PostWrapAvNameTime>
              <PostAvatar
                src={userProfile.avatar || avatar}
                alt={userProfile.first_name}
              />
              <PostWrapNameTime>
                <PostDescr>
                  {userProfile.first_name} {userProfile.last_name}
                </PostDescr>
                <PostDescrGrey>{getTimeDifference(post.created)}</PostDescrGrey>
              </PostWrapNameTime>
            </PostWrapAvNameTime>
          )}
          {!userProfile && (
            <PostWrapAvNameTime>
              <PostAvatar src={avatar} alt="Default Avatar" />
              <PostWrapNameTime>
                <PostDescr>User name</PostDescr>
                <PostDescrGrey>{getTimeDifference(post.created)}</PostDescrGrey>
              </PostWrapNameTime>
            </PostWrapAvNameTime>
          )}
          <form id="editpost" onSubmit={handleUpdatePost}>
            <EditPostInput
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </form>
          <ButtonWrap>
            <EditDeleteBtn form="editpost" type="submit">
              Save Changes
            </EditDeleteBtn>
            <EditDeleteBtn onClick={handleDeletePost}>
              Delete Post
            </EditDeleteBtn>
          </ButtonWrap>
        </EditModalWrapperRight>
      </EditModalWrapper>
    </Modal>
  )
}

export default EditDeleteModal
