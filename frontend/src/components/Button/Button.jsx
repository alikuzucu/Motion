import { useState } from 'react'
import likeIcon from '../../assets/svgs/heart.svg'
import shareIcon from '../../assets/svgs/share.svg'
import { useDispatch, useSelector } from 'react-redux'
import { update_likes, set_error } from '../../store/slices/PostSlice'
import { AxiosMotion } from '../../axios/Axios'
import {
  LikeShareBtn,
  LikedDescr,
  LikeShareIcon,
  ButtonContainer,
  ButtonsContainer,
  LikesContainer,
} from './Button.styled'

const LikeButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.accessToken)

  const handleLikes = async () => {
    try {
      const newLikes = liked ? likes - 1 : likes + 1
      setLikes(newLikes)
      setLiked(!liked)

      await AxiosMotion.post(
        `/social/posts/toggle-like/${postId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      dispatch(update_likes({ postId, likes: newLikes }))
    } catch (error) {
      dispatch(set_error(error.response?.data || 'Error liking post'))
    }
  }

  return (
    <LikeShareBtn onClick={handleLikes}>
      <LikeShareIcon src={likeIcon} alt="likes-btn" /> Like
    </LikeShareBtn>
  )
}

const ShareButton = ({ initialShares }) => {
  const [share, setShare] = useState(initialShares)

  const handleShare = () => {
    setShare(share)
  }

  return (
    <LikeShareBtn onClick={handleShare}>
      <LikeShareIcon src={shareIcon} alt="share-btn" /> Share
    </LikeShareBtn>
  )
}

const PostButtons = ({ post }) => {
  return (
    <ButtonContainer>
      <ButtonsContainer>
        <LikeButton postId={post.id} initialLikes={post.amount_of_likes} />
        <ShareButton initialShares={post.shared} />
      </ButtonsContainer>

      <LikesContainer>
        <LikedDescr>
          {post.amount_of_likes}
          {post.amount_of_likes === 1 ? ' like' : ' likes'}
        </LikedDescr>
      </LikesContainer>
    </ButtonContainer>
  )
}

export { LikeButton, ShareButton, PostButtons }
