import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosMotion } from '../../axios/Axios'
import { get_posts } from '../../store/slices/PostSlice'
import avatar from '../../assets/svgs/avatar.svg'
import menu from '../../assets/svgs/menu.svg'

import buttonpost from '../../assets/svgs/button-post.svg'
import { PostButtons } from '../../components/Button/Button'
import {
  CreatePostForm,
  PostAvatar,
  PostButton,
  PostDescr,
  PostDescrGrey,
  PostFeedContainer,
  PostFeedSearch,
  PostFeedSearchDescr,
  PostFeedSearchIcon,
  PostFeedSearchItem,
  PostFeedSearchList,
  PostImage,
  PostImageContainer,
  PostItem,
  PostPlaceholder,
  PostProfileImage,
  PostWrapAvNameTime,
  PostWrapNameTime,
  PostWrapTop,
  SearchPostFeedWrap,
} from '../../components/PostFeed/PostFeed.styled'
import searchIcon from '../../assets/svgs/search.svg'

import { ModalWindow } from '../../components/ModalWindow/ModalWindow'

import EditDeleteModal from '../../components/EditDeleteModal/EditDeleteModal'

import { getUserProfileSuccess } from '../../store/slices/UserProfileSlice'
import { Link } from 'react-router-dom'

export const PostFeed = () => {
  const token = useSelector((state) => state.user.accessToken)
  const posts = useSelector((state) => state.post.posts)
  console.log('🚀 ~ PostFeed ~ posts:', posts)

  // accessing user profile from the redux store

  const userProfile = useSelector((state) => state.userProfile.user)

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [selectedPost, setSelectedPost] = useState(null)
  const [editDeleteModalIsOpen, setEditDeleteModalIsOpen] = useState(false)

  // fetching posts, saving them in the post slice & rendering straigtaway on the page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
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
          // fetching posts
          const postsResponse = await AxiosMotion.get('/social/posts/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          dispatch(get_posts(postsResponse.data.results))
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [token, dispatch])

  // function to convert post creation time (originally looks like this: "2024-05-30T16:57:29.049326+02:00" )

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

  const handleMenuClick = (post) => {
    setSelectedPost(post)
    setEditDeleteModalIsOpen(true)
  }

  return (
    <>
      <PostFeedSearch>
        <SearchPostFeedWrap>
          <PostFeedSearchIcon src={searchIcon} />
          <PostFeedSearchDescr>Search posts...</PostFeedSearchDescr>
        </SearchPostFeedWrap>

        <Fragment>
          <PostFeedSearchList>
            <PostFeedSearchItem>All</PostFeedSearchItem>
            <PostFeedSearchItem>Liked</PostFeedSearchItem>
            <PostFeedSearchItem>Friends</PostFeedSearchItem>
            <PostFeedSearchItem>Follow</PostFeedSearchItem>
          </PostFeedSearchList>
        </Fragment>
      </PostFeedSearch>
      <PostFeedContainer>
        <PostItem>
          <CreatePostForm onClick={() => setModalIsOpen(true)}>
            {/* if the userProfile isnt dowloaded yet, it will render default text and avatar */}

            {userProfile && (
              <>
                <PostProfileImage
                  src={userProfile.avatar || avatar}
                  alt={userProfile.first_name}
                />
                <PostPlaceholder>
                  What&rsquo;s on&nbsp;your mind, {userProfile.first_name}?
                </PostPlaceholder>
              </>
            )}
            {!userProfile && (
              <>
                <PostProfileImage src={avatar} alt="Default Avatar" />
                <PostPlaceholder>
                  What&rsquo;s on&nbsp;your mind?
                </PostPlaceholder>
              </>
            )}
            <PostButton type="button">
              <img src={buttonpost} alt="Post button" />
            </PostButton>
          </CreatePostForm>
        </PostItem>
        {isLoading && <p>Loading posts...</p>}
        {posts?.length > 0 &&
          posts.map((post) => (
            <PostItem key={post.id}>
              <PostWrapTop>
                <Link
                  to={`/profiles/${post.user.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
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
                </Link>

                <PostButton onClick={() => handleMenuClick(post)}>
                  <img src={menu} alt="Menu button" />
                </PostButton>
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
      </PostFeedContainer>
      <ModalWindow
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />

      {selectedPost && (
        <EditDeleteModal
          isOpen={editDeleteModalIsOpen}
          onRequestClose={() => setEditDeleteModalIsOpen(false)}
          post={selectedPost}
        />
      )}
    </>
  )
}
