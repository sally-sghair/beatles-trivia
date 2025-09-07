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
    <div className="max-w-md mx-auto mt-8 p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Hi! Ready to play?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input 
            type="text" 
            id="name"
            placeholder="Name"
            value={user.name} 
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input 
            type="email" 
            id="email"
            placeholder="Email"
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mt-6">
          Start Beatles Trivia
        </button>
      </form>
    </div>
  );
}