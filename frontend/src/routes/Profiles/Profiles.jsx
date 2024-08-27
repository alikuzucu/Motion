import {useDispatch, useSelector} from 'react-redux'
import FetchUserDetails from '../../components/FetchUserDetails/FetchUserDetails'
import {useEffect, useState} from 'react'
import {get_posts} from '../../store/slices/PostSlice'
import avatar from '../../assets/svgs/avatar.svg'
import {
    PostFeedProfile,
    ProfileContainer,
} from '../../components/UserProfile/UserProfile.styled'
import {
    PostAvatar,
    PostButton,
    PostDescr,
    PostDescrGrey,
    PostImage,
    PostImageContainer,
    PostItem,
    PostWrapAvNameTime,
    PostWrapNameTime,
    PostWrapTop,
} from '../../components/PostFeed/PostFeed.styled'
import {PostButtons} from '../../components/Button/Button'
import menu from '../../assets/svgs/menu.svg'
import EditDeleteModal from '../../components/EditDeleteModal/EditDeleteModal'
import useApiRequest from "../../hooks/useApiRequest.jsx";

export const Profiles = () => {
    const posts = useSelector((state) => state.post.posts)
    const token = useSelector((state) => state.user.accessToken)

    const dispatch = useDispatch()

    const [selectedPost, setSelectedPost] = useState(null)
    const [editDeleteModalIsOpen, setEditDeleteModalIsOpen] = useState(false)

    const {sendRequest, data, loading} = useApiRequest();

    useEffect(() => {
            if (token) {
                sendRequest('GET', 'social/Post/', null, false)
            }
        },
        [token]
    );

    useEffect(() => {
        dispatch(get_posts(data))
        console.log('data', data)
    }, [data, dispatch]);

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
        <ProfileContainer>
            <div>
                <FetchUserDetails/>
            </div>
            <PostFeedProfile>
                {loading && <p>Loading posts...</p>}
                {Array.isArray(posts) && posts?.length > 0 &&
                    posts
                        .filter((element) => element.is_from_logged_in_user === true)
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
                                    <PostButton onClick={() => handleMenuClick(post)}>
                                        <img src={menu} alt="Menu button"/>
                                    </PostButton>
                                </PostWrapTop>
                                <p>{post.content}</p>
                                {post.images && post.images.length > 0 && (
                                    <PostImageContainer
                                        single={post.images.length === 1 ? 'true' : 'false'}
                                    >
                                        {post.images.map((imageUrl, index) => (
                                            <PostImage
                                                key={index}
                                                src={`http://localhost:8000${imageUrl}`}
                                                alt={`Post image ${index + 1}`}
                                                single={post.images.length === 1}
                                            />
                                        ))}
                                    </PostImageContainer>
                                )}
                                <PostButtons post={post}/>
                            </PostItem>
                        ))}
            </PostFeedProfile>
            {selectedPost && (
                <EditDeleteModal
                    isOpen={editDeleteModalIsOpen}
                    onRequestClose={() => setEditDeleteModalIsOpen(false)}
                    post={selectedPost}
                />
            )}
        </ProfileContainer>
    )
}

export default Profiles
