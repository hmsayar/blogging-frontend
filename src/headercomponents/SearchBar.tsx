import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import useDebounce from '../hooks/useDebounce';
import useClickOutside from '../hooks/useClickOutside';

const fetchBlogPosts = async (searchParam: string) => {
    const res = await fetch(`${import.meta.env.VITE_APP_BACK_URI}/blogposts/search?searchParam=${searchParam}`);
    return res.json();
};

export default function SearchBar() {
    const [searchParam, setSearchParam] = useState('');
    const debouncedSearchParam = useDebounce(searchParam, 500);
    const searchResultsRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const { data, isLoading, error } = useQuery(['searchBlogPosts', debouncedSearchParam], () => fetchBlogPosts(debouncedSearchParam), {
        enabled: debouncedSearchParam.length > 0,
        refetchOnWindowFocus: false,
    });

    const handleChange = (e: any) => {
        setSearchParam(e.target.value);
    };

    const handleOutsideClick = () => {
        setSearchParam('');
    };

    useClickOutside(searchResultsRef, handleOutsideClick);

    return (
        <div className="relative">
            <form>
                <input
                    type="text"
                    value={searchParam}
                    onChange={handleChange}
                    placeholder="Search blog posts..."
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
            </form>
            {searchParam.length > 0 && (
                <div ref={searchResultsRef} className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-2">Loading...</div>
                    ) : error ? (
                        <div className="p-2">Error: {JSON.stringify(error)}</div>
                    ) : (
                        <ul className="divide-y divide-gray-300">
                            {data?.map((post: any) => (
                                <li key={post._id} className="p-2">
                                    <Link to={`/post/${post._id}`} className="text-red-500 hover:text-red-700">
                                        {post.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>

    );
};