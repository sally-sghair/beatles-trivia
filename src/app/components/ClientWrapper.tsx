'use client';

import { AlbumResponse, User } from '@/app/types';
import { useEffect, useState } from 'react';
import UserForm from './UserForm';
import Trivia from './Trivia';

export default function ClientWrapper({ data }: { data: AlbumResponse }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  if (!user) return <UserForm onSubmit={setUser} />;

  return <Trivia data={data} user={user} onReset={() => setUser(null)} />;
}