import { lazy, Suspense, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import { LoginContext } from "./contexts/loginContext";
import FloatingActionButton from './FloatingActionButton'
const BlogpostPage = lazy(()=> import("./pagecomponents/BlogpostPage"))
const MainPageList = lazy(()=> import("./pagecomponents/MainPageList"))
const UserPage = lazy(()=> import("./pagecomponents/UserPage"))
const LoginPage = lazy(()=> import("./pagecomponents/LoginPage"))
const SignupPage = lazy(()=> import("./pagecomponents/SignupPage"))
const NewBlogPost = lazy(()=>import('./pagecomponents/NewBlogPost'))
const Welcome = lazy(()=>import('./pagecomponents/Welcome'))
import Loading from './Loading';


const backgroundStyle = {
  backgroundImage: 'url("/background.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
function App() {

  const { auth } = useContext(LoginContext)
  console.log(auth)

  return (
    <div style={backgroundStyle}>
      <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<MainPageList />} />
              <Route path="/post/:postId" element={<BlogpostPage />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/newpost" element={<NewBlogPost />} />
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
          </Suspense>
      { auth.login && (auth.userRoles.includes("admin") || auth.userRoles.includes("editor")) ? <FloatingActionButton /> : null}
    </div>
  )
}

export default App
