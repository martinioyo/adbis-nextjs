// @ts-nocheck
'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function KnowledgeSharing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
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


