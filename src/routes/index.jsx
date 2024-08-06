import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './LoginPage/LoginPage'
import SignUpEmail from './Signup/Signup'
import { ProtectedPages } from './ProtectedPages/ProtectedPages'
import Layout from './Layout/Layout'
import { PostFeed } from './PostFeed/PostFeed'
import { Profiles } from './Profiles/Profiles'
import { FindFriends } from './FindFriends/FindFriends'
import { LoginLayout } from './LoginLayout/LoginLayout'
import EditProfile from './Profiles/EditProfile'
import SignUpSuccess from './Signup/SignUpSuccess'
import SignUpForm from './Signup/SignUpForm'
import UserProfile from './Profiles/UserProfile'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpEmail />} />
          <Route path="/signup/success" element={<SignUpSuccess />} />
          <Route path="/signup/final" element={<SignUpForm />} />
        </Route>
        <Route element={<ProtectedPages />}>
          <Route element={<Layout />}>
            <Route path="/" element={<PostFeed />} />
            <Route path="/profiles/me" element={<Profiles />} />
            <Route path="/profiles/:userId" element={<UserProfile />} />
            <Route path="/profiles/edit" element={<EditProfile />} />
            <Route path="/findfriends" element={<FindFriends />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
