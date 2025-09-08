'use client';

import type { AlbumResponse, User, Album } from '@/app/types';
import AlbumCard from './AlbumCard';
import { useState, useEffect } from 'react';

interface TriviaProps {
  data: AlbumResponse;
  user: User;
  onReset: () => void;
}

export default function Trivia({ data, user, onReset }: TriviaProps) {
  const [randomAlbum, setRandomAlbum] = useState(data.albums[0]);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);

  const generateChoices = (correctAlbum: Album) => {
    
    const otherAlbums = data.albums.filter(album => album.name !== correctAlbum.name);
    
    const getRandomItem = (arr: Album[]) => arr[Math.floor(Math.random() * arr.length)];
    
    const first = getRandomItem(otherAlbums);
    const remaining = otherAlbums.filter(album => album !== first);
    const second = getRandomItem(remaining);
    const randomAlbums = [first, second];
    
    const allChoices = [correctAlbum.name, ...randomAlbums.map(album => album.name)];
    return allChoices.sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    if (data.albums.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.albums.length);
      const newAlbum = data.albums[randomIndex];
      setRandomAlbum(newAlbum);
      setChoices(generateChoices(newAlbum));
      setSelectedAnswer(null);
      setShowResult(false);
      setWrongAttempts([]);
    }
  }, [data.albums]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setTotalGuesses(totalGuesses + 1);
    if (answer === randomAlbum.name) {
      setShowResult(true);
    } else {
      setWrongAttempts([...wrongAttempts, answer]);
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const getNextQuestion = () => {
    setRoundsPlayed(roundsPlayed + 1);
    const randomIndex = Math.floor(Math.random() * data.albums.length);
    const newAlbum = data.albums[randomIndex];
    setRandomAlbum(newAlbum);
    setChoices(generateChoices(newAlbum));
    setSelectedAnswer(null);
    setShowResult(false);
    setWrongAttempts([]);
  };

  const handleReset = () => {
    setRoundsPlayed(0);
    setTotalGuesses(0);
    onReset();
  };

  return (
    <>
      <header className="header">
        <h1 className="main-title">Beatles Trivia: Yellow Submarine Edition</h1>
        <p className="artist-info"><b>Artist:</b> {data.artist}</p>
        <p className="text-xl font-bold">
        Sgt. Pepper salutes {user.name} | Rounds: {roundsPlayed} | Total Guesses: {totalGuesses}
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <p>I really don&apos;t want to stop the show, but I thought you might like to</p>
          <button 
            className="bg-transparent border-none cursor-pointer p-0 underline text-gray-600 hover:text-gray-800 transition-colors duration-200" 
            onClick={handleReset}
          >
            Change player
          </button>
        </div>
      </header>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Help! What’s the album?</h2>
          <div className="flex justify-center mb-8">
            <AlbumCard album={randomAlbum} />
          </div>
          
          <div className="flex gap-4 mb-8">
            {choices.map((choice, index) => {
              const isWrongAttempt = wrongAttempts.includes(choice);
              const isSelected = selectedAnswer === choice;
              const isCorrect = choice === randomAlbum.name;
              const isDisabled = showResult || isWrongAttempt;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(choice)}
                  disabled={isDisabled}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    showResult && isCorrect
                      ? 'guess-button-correct'
                      : isSelected && !isCorrect
                      ? 'guess-button-incorrect'
                      : isWrongAttempt
                      ? 'guess-button-disabled'
                      : 'guess-button'
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {selectedAnswer && !showResult && (
            <div className="mb-6">
              <p className="text-xl font-bold mb-4 text-red-600">
                Wrong, Try again!
              </p>
            </div>
          )}

          {showResult && (
            <div className="mb-6 bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-xl font-bold mb-4 text-green-600">
                Correct! 🎉
              </p>
              <div className="text-left space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Album Details:</h3>
                <p><strong>Album:</strong> {randomAlbum.name}</p>
                <p><strong>Year Released:</strong> {randomAlbum.year_released}</p>
                <p><strong>Tracks:</strong> {randomAlbum.tracks}</p>
                <p><strong>Length:</strong> {randomAlbum.length}</p>
              </div>
              <button 
                onClick={getNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
    </>
  );
}
