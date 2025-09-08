'use client';
import { User } from '@/app/types';
import { useState } from 'react';

interface UserFormProps {
  onSubmit: (user: User) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [user, setUser] = useState<User>({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(user);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 rounded-xl shadow-lg" style={{backgroundColor: '#FF6B6B'}}>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-00">Let it be… The right answer. Ready to play?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-bold text-gray-800">
          Your name, mate
          </label>
          <input 
            type="text" 
            id="name"
            placeholder="Name: so we can say hello, goodbye"
            value={user.name} 
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-gray-800">
          Email: So we remember you!
          </label>
          <input 
            type="email" 
            id="email"
            placeholder="heyjude@abbeyroad.co.uk"
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <button type="submit" className="w-full text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mt-6 cta-button">
        Here Comes the Fun!
        </button>
      </form>
    </div>
  );
}