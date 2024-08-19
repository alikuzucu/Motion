import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  get_allUsers,
  follow_user,
  add_friend,
  remove_friend,
} from '../../store/slices/AllUserSlice'
import { AxiosMotion } from '../../axios/Axios'
import avatar from '../../assets/svgs/avatar.svg'
import {
  ButtonBase,
  ButtonContainer,
  FollowButton,
  FriendDescr,
  FriendLikesContainer,
  FriendLikesItem,
  FriendsCard,
  FriendsContainer,
  UserLocation,
  UserName,
  UserPicture,
} from '../../components/FindFriends/FindFriends.styled'
import { Link } from 'react-router-dom'

export const FindFriends = () => {
  const token = useSelector((state) => state.user.accessToken)
  const allUsers = useSelector((state) => state.allUser.allUsers)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (token) {
        try {
          const offset = Math.floor(Math.random() * 100)
          const response = await AxiosMotion.get(`/users/?offset=${offset}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const shuffledUsers = shuffleArray(response.data)
          dispatch(get_allUsers(shuffledUsers))
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [token, dispatch])

  const followUser = async (token, userId) => {
    try {
      await AxiosMotion.post(
        `/social/toggle-follow/${userId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      dispatch(follow_user({ id: userId }))
    } catch (error) {
      console.error('Error following/unfollowing User:', error)
    }
  }

  const addOrRemoveFriend = async (token, userId, isFriend) => {
    try {
      if (isFriend) {
        const response = await AxiosMotion.delete(
          `/friends/requests/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        console.log('Remove friend response:', response.data)
        dispatch(remove_friend({ id: userId }))
      } else {
        const response = await AxiosMotion.post(
          `/friends/${userId}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        console.log('Add friend response:', response.data)
        dispatch(add_friend({ id: userId }))
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          'Forbidden: You do not have permission to add/remove this friend.',
        )
      } else {
        console.error('Error adding/removing friend:', error)
      }
    }
  }

  const handleFollow = async (userId) => {
    if (token) {
      await followUser(token, userId)
    }
  }

  const handleAddFriend = async (userId, isFriend) => {
    if (token) {
      await addOrRemoveFriend(token, userId, isFriend)
    }
  }

  return (
    <FriendsContainer>
      {isLoading && <p>Loading users...</p>}
      {allUsers &&
        allUsers.map((allUser) => (
          <FriendsCard key={allUser.id}>
            <Link to={`/profiles/${allUser.id}`}>
              <UserPicture
                style={{ height: '80px' }}
                className="allUserImage"
                src={allUser.avatar === null ? avatar : allUser.avatar} // Default avatar if no avatar URL
                alt={`${allUser.first_name} ${allUser.last_name} avatar`}
              />
            </Link>
            <UserName>
              {allUser.first_name} {allUser.last_name}
            </UserName>
            <UserLocation>{allUser.location}</UserLocation>
            <ButtonContainer>
              <FollowButton
                onClick={() => handleFollow(allUser.id)}
                className={allUser.logged_in_user_is_following ? 'active' : ''}
              >
                {allUser.logged_in_user_is_following ? 'Following' : 'Follow'}
              </FollowButton>
              <ButtonBase
                onClick={() =>
                  handleAddFriend(allUser.id, allUser.logged_in_user_is_friends)
                }
              >
                {allUser.logged_in_user_is_friends
                  ? 'Remove Friend'
                  : 'Add Friend'}
              </ButtonBase>
            </ButtonContainer>
            <FriendDescr>{allUser.about_me}</FriendDescr>
            {allUser.things_user_likes &&
              allUser.things_user_likes.length > 0 && (
                <FriendLikesContainer className="things-user-likes">
                  {allUser.things_user_likes.map((thing, index) => (
                    <FriendLikesItem key={index}>{thing}</FriendLikesItem>
                  ))}
                </FriendLikesContainer>
              )}
          </FriendsCard>
        ))}
      {allUsers?.length === 0 && !isLoading && <p>No users found.</p>}
    </FriendsContainer>
  )
}
