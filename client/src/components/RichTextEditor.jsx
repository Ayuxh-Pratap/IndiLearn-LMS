import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ input, setInput }) {
    const handleChange = (content) => {
        setInput(
            { ...input, description: content }
        );
    };

    return <ReactQuill className=' text-gray-400' theme="snow" value={input.description} onChange={handleChange} />;
}