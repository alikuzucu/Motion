import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {get_posts} from '../../store/slices/PostSlice'
import avatar from '../../assets/svgs/avatar.svg'
import menu from '../../assets/svgs/menu.svg'

import buttonpost from '../../assets/svgs/button-post.svg'
import {PostButtons} from '../../components/Button/Button'
import {
    CreatePostForm,
    PostAvatar,
    PostButton,
    PostDescr,
    PostDescrGrey,
    PostFeedContainer,
    PostFeedSearch,
    PostFeedSearchIcon, PostFeedSearchInput,
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

import {ModalWindow} from '../../components/ModalWindow/ModalWindow'

import EditDeleteModal from '../../components/EditDeleteModal/EditDeleteModal'

import {getUserProfileSuccess} from '../../store/slices/UserProfileSlice'
import {Link} from 'react-router-dom'
import useApiRequest from "../../hooks/useApiRequest.jsx";

export const PostFeed = () => {
    const token = useSelector((state) => state.user.accessToken)
    const posts = useSelector((state) => state.post.posts)
    console.log('🚀 ~ PostFeed ~ Post:', posts)

    // accessing User profile from the redux store

    const userProfile = useSelector((state) => state.userProfile.user)
    const filters = ['All', 'Liked', 'Friends', 'Follow']
    const dispatch = useDispatch()
    const [selectedFilter, setSelectedFilter] = useState('All')

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [search, setSearch] = useState('')

    const [selectedPost, setSelectedPost] = useState(null)
    const [editDeleteModalIsOpen, setEditDeleteModalIsOpen] = useState(false)

    //Hook integration

    const {sendRequest, data: userProfileData, loading: loadingUserProfile} = useApiRequest();
    const {sendRequest: fetchPosts, data: postsData, error: postError, loading: loadingPosts} = useApiRequest();
    const {sendRequest: filterPosts, data: filteredPosts, loading: loadingFilteredPosts} = useApiRequest();
    const {sendRequest: searchPosts, data: searchedPosts, loading: loadingSearch} = useApiRequest();

    // fetching Post, saving them in the post slice & rendering straigtaway on the page


    useEffect(() => {
        if (token) {
            sendRequest('GET', 'users/me/', null, false);
        }
    }, [token]);

    useEffect(() => {
        if (userProfileData) {
            dispatch(getUserProfileSuccess(userProfileData));
        }
    }, [userProfileData, dispatch]);

    useEffect(() => {
        if (token) {
            fetchPosts('GET', 'social/Post/', null, false);
        }
    }, [token]);

    useEffect(() => {
        if (postsData) {
            dispatch(get_posts(postsData));
        }
    }, [postsData, dispatch]);

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

    const filterHandler = async (filter) => {
        setSelectedFilter(filter)
        let url = `social/Post/${filter}/`
        if (filter === 'All') {
            url = `social/Post/`
        }
        filterPosts('GET', url, null, false)
    }

    useEffect(() => {
        console.log('filter', filteredPosts)
        if (filteredPosts) {
            dispatch(get_posts(filteredPosts));
        }
    }, [filteredPosts, postError, dispatch]);

    const searchHandler = async (search) => {
        searchPosts('GET', `/social/Post/?search=${search}`, null, false)

    }
    useEffect(() => {
        if (searchedPosts) {
            dispatch(get_posts(searchedPosts));
        }
    }, [searchedPosts, postError, dispatch]);

    return (
        <>
            <PostFeedSearch>
                <SearchPostFeedWrap>
                    <PostFeedSearchIcon onClick={() => {
                        searchHandler(search)
                    }} src={searchIcon}/>
                    <PostFeedSearchInput
                        id="search"
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}/>
                </SearchPostFeedWrap>

                <Fragment>
                    <PostFeedSearchList>
                        {filters.map(
                            filter => <PostFeedSearchItem filterActive={selectedFilter === filter} key={filter}
                                                          onClick={() => {
                                                              filterHandler(filter)
                                                          }}>
                                {filter}
                            </PostFeedSearchItem>)}
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
                                    What&rsquo;s on&nbsp;your mind {userProfile.first_name}?
                                </PostPlaceholder>
                            </>
                        )}
                        {!userProfile && (
                            <>
                                <PostProfileImage src={avatar} alt="Default Avatar"/>
                                <PostPlaceholder>
                                    What&rsquo;s on&nbsp;your mind?
                                </PostPlaceholder>
                            </>
                        )}
                        <PostButton type="button">
                            <img src={buttonpost} alt="Post button"/>
                        </PostButton>
                    </CreatePostForm>
                </PostItem>
                {loadingFilteredPosts && loadingSearch && loadingPosts && loadingUserProfile && <p>Loading posts...</p>}
                {Array.isArray(posts) && posts?.length > 0 &&
                    posts.map((post) => (
                        <PostItem key={post.id}>
                            <PostWrapTop>
                                <Link
                                    to={`/profiles/${post.user.id}`}
                                    style={{textDecoration: 'none', color: 'inherit'}}
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
                                    <img src={menu} alt="Menu button"/>
                                </PostButton>
                            </PostWrapTop>
                            <p>{post.content}</p>
                            {post.images && post.images.length > 0 && (
                                <PostImageContainer
                                    single={post.images.length === 1 ? 'true' : ''}
                                >
                                    {post.images.map((imageUrl, index) => (
                                        <PostImage
                                            key={index}
                                            src={`http://localhost:8000${imageUrl}`}
                                            alt={`Post image ${index + 1}`}
                                            single={post.images.length === 1 ? 'true' : ''}
                                        />
                                    ))}
                                </PostImageContainer>
                            )}
                            <PostButtons post={post}/>
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
