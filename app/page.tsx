

// Har bare udkommenteret denne del fra før

/*
// @ts-nocheck
'use client'; 

import Image from 'next/image';
import { useState } from 'react';

export default function KnowledgeSharing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    //extra
    //const descriptionHTML = descriptionRef.current.innerHTML;
    e.preventDefault();
    // Her kan vi sende data til en API for eksempel
    console.log({ title, description, tags });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image src="/Serene_Forest_Scene.jpeg" layout="fill" objectFit="cover" objectPosition="center" alt="Background" priority />
      
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-4xl font-bold text-white">Del din viden med dine kolleger </h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm"
              placeholder="Tilføj en titel til din viden"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Beskrivelse</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm"
              rows="4"
              placeholder="Beskriv din viden her"
              required
            ></textarea> 
          </div>

          <div className="mb-6">
            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm"
              placeholder=""
            />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Del din viden
          </button>
        </form>
      </div>
    </div>
  );
}

*/

// Og lavet en ny del her

// @ts-nocheck
'use client'; 

import Image from 'next/image';
import { useState, useRef } from 'react'; // Make sure useRef is imported here
//import imgIconPath from '../public/img_picture.png';

export default function KnowledgeSharing() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  //const [showPlaceholder, setShowPlaceholder] = useState(true);
  //const [content, setContent] = useState('');
  //const [description, setDescription] = useState('');
  const descriptionRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const descriptionHTML = descriptionRef.current.innerHTML;
    console.log({ title, description: descriptionHTML, tags });
    // Placeholder for API call

    // For posts

    // Create a new post object
  const newPost = { title, description: descriptionHTML, tags };
  // Add the new post to the beginning of the posts array
  setPosts([newPost, ...posts]);
  // Reset the form fields
  setTitle('');
  //setDescription(''); // If you were using a state for description
  setTags('');
  descriptionRef.current.innerHTML = ''; // Clear the contentEditable div
  setIsTyping(false); // Reset typing state
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgHtml = `<img src="${reader.result}" style="max-width: 100%;" />`;
        descriptionRef.current.innerHTML += imgHtml;
        //setShowPlaceholder(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (e) => {
    setIsTyping(e.currentTarget.textContent.length > 0);
    //setContent(descriptionRef.current.innerHTML);
  }; 

  return (
    <div className=" w-screen overflow-auto">
      <Image src="/Serene_Forest_Scene.jpeg" layout="fill" objectFit="cover" objectPosition="center" alt="Background" priority />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 min-h-screen" ></div>

      {/* Page Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-4xl font-bold text-white">Del din viden med dine kolleger</h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm" placeholder="Tilføj en titel til din viden" required />
          </div>
          
          {/* Description Input with Image Upload */}
          <div className="mb-4 relative">
  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Beskrivelse</label>
  <div
    ref={descriptionRef}
    contentEditable
    onInput={handleInput}
    className="w-full text-sm border border-gray-300 rounded-md shadow-sm bg-white"
    style={{ minHeight: '100px', padding: '1rem', boxSizing: 'border-box' }}
    data-placeholder="Beskriv din viden her"
  >
    {!isTyping && (
      <div
        className="absolute top-0 left-0 right-0 bottom-0 flex items-center"
        style={{ padding: '1rem', pointerEvents: 'none', userSelect: 'none', color: '#a1a1a1' }}
      >
        Beskriv din viden her
      </div>
    )}
  </div>
</div>

          {/* Image Upload */}
          <div className="mb-4">
        <label htmlFor="imageUpload" className="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden" // Hide the default input
        />
        <label htmlFor="imageUpload" className="cursor-pointer inline-flex items-center justify-center w-full p-4 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          
          <span className="ml-2">Choose an image</span>
        </label>
      </div>

          {/* Tags Input */}
          <div className="mb-6">
            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm" placeholder="Tilføj tags til din viden" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Del din viden</button>
  
        </form>
         {/* Posts List */}
         <div className="w-full max-w-lg">
          {posts.map((post, index) => (
            <div key={index} className="mb-8 p-4 border border-gray-300 rounded-md shadow-sm bg-white">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
              {post.tags && <p className="text-gray-600">Tags: {post.tags}</p>}
            </div>
          ))}
        </div>
      </div>
      </div>
  );
}





