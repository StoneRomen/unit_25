import React, { useState, useEffect } from 'react';

const Emoji = () => {
  const initialVotes = JSON.parse(localStorage.getItem('votes')) || {
    '😺': 0,
    '👽': 0,
    '💩': 0,
    '😎': 0,
  };

  const [votes, setVotes] = useState(initialVotes);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  const handleVote = (emoji) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [emoji]: prevVotes[emoji] + 1,
    }));
  };

  const showResults = () => {
    const winner = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));
    setWinner(winner);
  };

  const clearResults = () => {
    const resetVotes = {
      '😺': 0,
      '👽': 0,
      '💩': 0,
      '😎': 0,
    };
    setVotes(resetVotes);
    setWinner(null);
    localStorage.removeItem('votes');
  };

  return (
    <div>
      <h1>Голосування за найкращий смайлик</h1>
      <div>
        {Object.keys(votes).map((emoji) => (
          <button key={emoji} onClick={() => handleVote(emoji)}>
            {emoji} - {votes[emoji]}
          </button>
        ))}
      </div>
      <div>
        <button onClick={showResults}>Show Results</button>
        <button onClick={clearResults}>Очистити результати</button>
      </div>
      {winner && (
        <div>
          <h1>Результати Голосування</h1>
          <h2>Переможець: {winner}</h2>
        </div>
      )}
    </div>
  );
};

export default Emoji;
