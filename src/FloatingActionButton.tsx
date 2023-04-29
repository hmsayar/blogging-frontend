import React, { useState } from "react";
import { Link } from "react-router-dom"

const FloatingActionButton = () => {


    return (
        <>
            <Link to={"/newpost"} className="fixed bottom-6 right-6 w-16 h-16 text-center bg-orange-200 text-red-600 rounded-full shadow-md p-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                +
            </Link>

        </>
    );
};

export default FloatingActionButton;