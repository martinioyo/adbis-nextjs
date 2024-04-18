

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

import { BLOCKED_PAGES } from '@/node_modules/next/dist/shared/lib/constants';
import Image from 'next/image';
import { useState, useRef } from 'react'; // Make sure useRef is imported here
//import imgIconPath from '../public/img_picture.png';

export default function KnowledgeSharing() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  //const [showPlaceholder, setShowPlaceholder] = useState(true);
  //const [content, setContent] = useState('');
  //const [description, setDescription] = useState('');
  //const [name, setName] = useState(''); // State for storing the user's name
  const descriptionRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const username = "Alex"; // Username displayed in the navbar, used for posts

  const handleSubmit = (e) => {
    e.preventDefault();
    const descriptionHTML = descriptionRef.current.innerHTML;
    console.log({ title, description: descriptionHTML, tags, username });
    
  // For posts
  const newPost = { title, description: descriptionHTML, tags, username };
  
  setPosts([newPost, ...posts]);

  setTitle('');
  //setDescription(''); // If you were using a state for description
  setTags('');
  // Name
  //setName(''); 
  descriptionRef.current.innerHTML = ''; // Clear the contentEditable div
  setIsTyping(false); // Reset typing state
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgHtml = `<img src="${reader.result}" style="max-width: 100%;" alt="Uploaded Image"/>`;
        descriptionRef.current.innerHTML += imgHtml;
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      const pdfHtml = `<a href="${URL.createObjectURL(file)}" target="_blank" style="color: #007BFF; text-decoration: underline; display: inline-block; margin-top: 5px;"> ${file.name}</a>`;
      descriptionRef.current.innerHTML += pdfHtml;
    } else if (file.type.startsWith('video/')) {
      const videoHtml = `<video controls style="max-width: 100%;"><source src="${URL.createObjectURL(file)}" type="${file.type}">Your browser does not support the video tag.</video>`;
      descriptionRef.current.innerHTML += videoHtml;
    }
  }; 

  const handleInput = (e) => {
    //setIsTyping(e.currentTarget.textContent.length > 0);
    //setContent(descriptionRef.current.innerHTML);
    const hasContent = e.currentTarget.textContent.trim().length > 0;
    setIsTyping(hasContent);
  }; 

  const toggleForm = () => setShowForm(!showForm);


  return (

  

    <div className="w-screen h-screen overflow-auto relative" style={{ background: 'url(/Serene_Forest_Scene.jpeg) no-repeat center center fixed', backgroundSize: 'cover', minHeight: '100vh' }}>
    
    {/* Overlay */}
    <div className="fixed inset-0 bg-black bg-opacity-40 min-h-screen" ></div>
      
      {/* Navbar */}
      <div className="bg-white w-full p-4 fixed top-0 left-0 right-0 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm font-medium cursor-pointer" style={{ color: '#00E000' }}>GreenE</div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 mr-4 cursor-pointer">{username}</span>
            <button className="text-sm font-medium">Log ud</button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
    <div className="fixed top-12 left-0 bottom-0 bg-white p-4 w-48 shadow-md">
      <ul className="space-y-4">
        <div className='sidebar-item'><li style={{ cursor: 'pointer'}}>Forum</li></div>
        <div className='sidebar-item'><li onClick={toggleForm} style={{ cursor: 'pointer'}}> + Nyt handlingsplan</li></div>
        <div className='sidebar-item'><li style={{ cursor: 'pointer' }}>Gemte</li></div>
        <div className='sidebar-item'><li style={{ cursor: 'pointer' }}>Mine</li></div>
        <div className='sidebar-item'><li style={{ cursor: 'pointer' }}>Profil</li></div>
      </ul>
    </div>

       {/* Title in the top middle */}
       <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 w-full text-center z-10">
        <h1 className="text-4xl font-bold text-white">Handlingsplaner</h1>
      </div>

  
      {/* Flex container for content */}
      <div className="absolute top-20 left-40 right-0 p-4 flex" style={{ height: 'calc(100vh - 5px)' }}>
        {/* Form section on the left */}
        {showForm && (
        <div className=" flex flex-col items-start justify-center p-10" style={{ width: "400px", flexShrink: '0', maxHeight: 'calc(100vh - 100px)', position: 'relative'}}>
          
          
          <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
            {/* Close button */}
            <button onClick={toggleForm} type="button" className="absolute top-0 right-12 text-lg font-bold p-2 cursor-pointer">
          &times;  {/* Styling to appear as 'x' */}
        </button>
          <div className="mb-4">
          
              <label htmlFor="text" className="flex block mb-2 text-sm font-bold text-gray-900 justify-center">Ny handlingsplan</label>
             
            </div>
            {/* Title Input */}
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Titel</label>
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
              >
              
              </div>
            </div>
  
            {/* Image Upload */}
            <div className="mb-4">
              <label htmlFor="imageUpload" className="block mb-2 text-sm font-medium text-gray-900">Upload billede</label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*, video/*, application/pdf"
                onChange={handleImageUpload}
                className="hidden" // Hide the default input
              />
              <label htmlFor="imageUpload" className="cursor-pointer inline-flex items-center justify-center w-full p-4 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="ml-2">Vedhæft fil</span>
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
        </div>
        )} 

        
        {/* Right side boxes */}
  
        
       
    
        {/* Posts List on the right */}
        <div className="flex flex-wrap justify-center align-center mt-4 ml-8" >

          {posts.map((post, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white" style={{ width: '250px', height: '250px',  marginTop: "10px", marginRight: '20px'}}>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="font-bold">Delt af: {post.username}</p>
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
              {post.tags && <p className="text-gray-600">Tags: {post.tags}</p>}
              <div className="mt-2 flex justify-between">
          <button onClick={() => handleSavePost(post.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
          <button onClick={() => handleSharePost(post.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Share</button>
        </div>
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
  
          }






