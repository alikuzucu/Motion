import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { get_posts } from '../../store/slices/PostSlice'
import { AxiosMotion } from '../../axios/Axios'
import {
  PostFeedProfile,
  ProfileContainer,
} from '../../components/UserProfile/UserProfile.styled'

import {
  PostAvatar,
  PostDescr,
  PostDescrGrey,
  PostImage,
  PostImageContainer,
  PostItem,
  PostWrapAvNameTime,
  PostWrapNameTime,
  PostWrapTop,
} from '../../components/PostFeed/PostFeed.styled'
import { PostButtons } from '../../components/Button/Button'
import avatar from '../../assets/svgs/avatar.svg'
import FetchOtherUserDetails from '../../components/FetchUserDetails/FetchOtherUserDetails'

const UserProfile = () => {
  const { userId } = useParams()
  const posts = useSelector((state) => state.post.posts)
  console.log('🚀 ~ UserProfile ~ posts:', posts)
  const token = useSelector((state) => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (token) {
        try {
          const response = await AxiosMotion.get('/social/posts/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          dispatch(get_posts(response.data.results))
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [token, dispatch])

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
    <ProfileContainer>
      <div>
        <FetchOtherUserDetails userId={userId} />
      </div>
      <PostFeedProfile>
        {isLoading && <p>Loading posts...</p>}
        {posts?.length > 0 &&
          posts
            .filter((element) => {
              return element.user.id === Number(userId)
            })
            .map((post) => (
              <PostItem key={post.id}>
                <PostWrapTop>
                  <PostWrapAvNameTime>
                    <PostAvatar
                      src={post.user.avatar || avatar} // Default avatar if no avatar URL
                      alt={`${post.user.first_name} ${post.user.last_name} avatar`}
                    />
                    <PostWrapNameTime>
                      <PostDescr>
                        {post.user.first_name} {post.user.last_name}
                      </PostDescr>
                      {/* Post creation time */}
                      <PostDescrGrey>
                        {getTimeDifference(post.created)}
                      </PostDescrGrey>
                    </PostWrapNameTime>
                  </PostWrapAvNameTime>
                </PostWrapTop>
                <p>{post.content}</p>
                {/* Images (conditional rendering). not sure it works */}
                {post.images && post.images.length > 0 && (
                  <PostImageContainer
                    single={post.images.length === 1 ? 'true' : 'false'}
                  >
                    {post.images.map((image) => (
                      <PostImage
                        key={image.id || image.url}
                        src={image.image}
                        alt={post.title}
                        single={post.images.length === 1 ? 'true' : 'false'}
                      />
                    ))}
                  </PostImageContainer>
                )}
                <PostButtons post={post} />
              </PostItem>
            ))}
      </PostFeedProfile>
    </ProfileContainer>
  )
}

export default UserProfile
