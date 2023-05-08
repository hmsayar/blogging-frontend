import {useState, useContext} from "react"
import { useMutation } from 'react-query';
import {useNavigate} from "react-router-dom"

async function signUpUser ({ user, password, email }: { user: string; password: string, email:string }){
    const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/users/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password, email }),
    });
  
    if (!response.ok) {
      throw new Error('SignUp failed');
    }
  
    return response.json();
  };



export default function SignupPage(){
    const [user, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const signUpMutation = useMutation(signUpUser, {
        onSuccess: (data) => {
            console.log(data)
          navigate("/welcome")
        },
        onError: (error) => {
          console.error('Error:', error);
        },
      });
    

    function handleSubmit(e:any){
        e.preventDefault();
        signUpMutation.mutate({ user, password, email });
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-70  p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl text-orange-700 font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-orange-700">
                Email
              </label>
              <input
                id="emailadrr"
                type="email"
                className="mt-1 block w-full border rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-orange-700">
                Username
              </label>
              <input
                id="user"
                type="text"
                className="mt-1 block w-full border rounded-md p-2"
                value={user}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-orange-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full border rounded-md p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold bg-orange bg-opacity-70 py-2 px-4 rounded hover:bg-orange-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };