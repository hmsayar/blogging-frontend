import { useState, useContext } from "react"
import ReactQuill from "react-quill";
import { LoginContext } from "../contexts/loginContext";
import { useMutation, useQueryClient  } from "react-query";


import "react-quill/dist/quill.snow.css";

async function createBlogPost(postData:any) {
    const response = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/blogposts`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${postData.token}`
    },
      body: JSON.stringify(postData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create blog post');
    }
  
    return response.json();
  }

const myModules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image"],
        ["clean"],
    ],
}


const myFormats = [
    'font',
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'blockquote', 'code-block', 
    'align', 
  ];

export default function NewBlogPost() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const { auth } = useContext(LoginContext)

    const queryClient = useQueryClient();

    const mutation = useMutation(createBlogPost, {
        onSuccess: () => {
          queryClient.invalidateQueries('blogposts');
        },
      });

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await mutation.mutateAsync({title: title, post:content, token:auth.accessToken });
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Failed to create blog post:', error);
        }
    };


    return (
        <div className="min-h-screen flex justify-center">
            <div className="bg-white p-20 pb-40 rounded-lg shadow-md m-28 w-full max-w-3xl">
                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        className="w-full p-2 mb-4 border-2 border-gray-300 rounded"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <ReactQuill
                        className="w-full h-full"
                        theme="snow"
                        placeholder="Start writing..."
                        modules={myModules}
                        formats={myFormats}
                        value={content}
                        onChange={setContent}
                    />

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-1/4 mt-6 py-2 bg-red-600 text-white rounded-md"
                        >
                            Send
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}