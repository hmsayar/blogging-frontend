import { useContext } from "react"
import { Link } from "react-router-dom"
import PostIcon from './icons/PostIcon';
import { LoginContext } from "./contexts/loginContext";
import UserDropdown from "./headercomponents/UserDropdown";
import SearchBar from "./headercomponents/SearchBar";

export default function Header() {
    const { auth } = useContext(LoginContext)
    return (
        <header className="fixed top-0 left-0 w-full bg-white bg-opacity-70 z-10">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    <PostIcon />
                </Link>
                <SearchBar />
                {
                    auth.login ?
                    <UserDropdown username={auth.username} /> :
                        <div>
                            <Link
                                to="/login"
                                className="bg-red-500 text-white rounded px-4 py-2 mr-2 hover:bg-orange-600 transition duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-white text-red-500 border border-red-500 rounded px-4 py-2 hover:bg-orange-100 transition duration-200"
                            >
                                Signup
                            </Link>
                        </div>

                }
            </div>
        </header>
    )
}