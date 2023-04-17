import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
const BlogpostPage = lazy(()=> import("./pagecomponents/BlogpostPage"))
const MainPageList = lazy(()=> import("./pagecomponents/MainPageList"))
const UserPage = lazy(()=> import("./pagecomponents/UserPage"))
const LoginPage = lazy(()=> import("./pagecomponents/LoginPage"))
const SignupPage = lazy(()=> import("./pagecomponents/SignupPage"))

const backgroundStyle = {
  backgroundImage: 'url("/background.svg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
function App() {


  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
          <Suspense fallback={<div>...</div>}>
            <Routes>
              <Route path="/" element={<MainPageList />} />
              <Route path="/post/:postId" element={<BlogpostPage />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </Suspense>

      </div>
    </div>
  )
}

export default App
