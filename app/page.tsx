// @ts-nocheck
'use client'; 

import { useState, useRef } from 'react';

export default function KnowledgeSharing() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
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
    setTags('');
    descriptionRef.current.innerHTML = ''; // Clear the contentEditable div
    setIsTyping(false); // Reset typing state

    // Save post to the database
    handleSavePost(newPost);
  };

  const handleInput = (e) => {
    //setIsTyping(e.currentTarget.textContent.length > 0);
    //setContent(descriptionRef.current.innerHTML);
    const hasContent = e.currentTarget.textContent.trim().length > 0;
    setIsTyping(hasContent);
  };

  const handleSavePost = async (post) => {
    const response = await fetch('/api/savePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title: post.title, 
        description: post.description, 
        tags: post.tags.split(',').map(tag => tag.trim()) // Split and trim tags
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert('Post saved!');
    } else {
      alert('Failed to save post: ' + data.error);
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="w-screen h-screen overflow-auto relative" style={{ background: 'url(/Serene_Forest_Scene.jpeg) no-repeat center center fixed', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="fixed inset-0 bg-black bg-opacity-40 min-h-screen"></div>
      
      <div className="bg-white w-full p-4 fixed top-0 left-0 right-0 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm font-medium cursor-pointer" style={{ color: '#00E000' }}>GreenE</div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 mr-4 cursor-pointer">{username}</span>
            <button className="text-sm font-medium">Log ud</button>
          </div>
        </div>
      </div>

      <div className="fixed top-12 left-0 bottom-0 bg-white p-4 w-48 shadow-md">
        <ul className="space-y-4">
          <div className='sidebar-item'><li style={{ cursor: 'pointer'}}>Forum</li></div>
          <div className='sidebar-item'><li onClick={toggleForm} style={{ cursor: 'pointer'}}> + Nyt handlingsplan</li></div>
          <div className='sidebar-item'><li style={{ cursor: 'pointer' }}>Gemte</li></div>
          <div className='sidebar-item'><li style={{ cursor: 'pointer' }}>Mine</li></div>
          <div className='sidebar-item'><li style={{ cursor: 'pointer' }}>Profil</li></div>
        </ul>
      </div>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 p-4 w-full text-center z-10">
        <h1 className="text-4xl font-bold text-white">Handlingsplaner</h1>
      </div>

      <div className="absolute top-20 left-40 right-0 p-4 flex" style={{ height: 'calc(100vh - 5px)' }}>
        {showForm && (
          <div className=" flex flex-col items-start justify-center p-10" style={{ width: "400px", flexShrink: '0', maxHeight: 'calc(100vh - 100px)', position: 'relative'}}>
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
              <button onClick={toggleForm} type="button" className="absolute top-0 right-12 text-lg font-bold p-2 cursor-pointer">
                &times;
              </button>
              <div className="mb-4">
                <label htmlFor="text" className="flex block mb-2 text-sm font-bold text-gray-900 justify-center">Ny handlingsplan</label>
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Titel</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm" placeholder="Tilføj en titel til din viden" required />
              </div>
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
              <div className="mb-4">
                <label htmlFor="imageUpload" className="block mb-2 text-sm font-medium text-gray-900">Upload billede</label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*, video/*, application/pdf"
               
                  className="hidden"
                />
                <label htmlFor="imageUpload" className="cursor-pointer inline-flex items-center justify-center w-full p-4 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="ml-2">Vedhæft fil</span>
                </label>
              </div>
              <div className="mb-6">
                <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
                <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-4 text-sm border-gray-300 rounded-md shadow-sm" placeholder="Tilføj tags til din viden" />
              </div>
              <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Del din viden</button>
            </form>
          </div>
        )}
        <div className="flex flex-wrap justify-center align-center mt-4 ml-8">
          {posts.map((post, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md shadow-sm bg-white" style={{ width: '250px', height: '250px', marginTop: "10px", marginRight: '20px'}}>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="font-bold">Delt af: {post.username}</p>
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
              {post.tags && <p className="text-gray-600">Tags: {post.tags}</p>}
              <div className="mt-2 flex justify-between">
                <button onClick={() => handleSavePost(post)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
                <button onClick={() => handleSharePost(post.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
