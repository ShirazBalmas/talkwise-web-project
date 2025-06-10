import React, { useState, useEffect } from 'react';

// Word list
const wordBank = [
  { question: "חתול באנגלית", answer: "cat" },
  { question: "A vehicle with two wheels", answer: "bike" },
  { question: "I drink a cup of _____ every morning", answer: "coffee" },
  { question: "מלך החיות באנגלית", answer: "lion" },
  { question: "Opposite of 'cold'", answer: "hot" },
  { question: "A yellow fruit monkeys like", answer: "banana" },
  { question: "The largest planet in our solar system", answer: "jupiter" },
  { question: "The color of the sky on a clear day", answer: "blue" },
  { question: "The season after winter", answer: "spring" },
  { question: "I use this to write on paper", answer: "pen" },
  { question: "What bees produce", answer: "honey" },
  { question: "מספר 3 באנגלית", answer: "three" },
  { question: "The capital of France", answer: "paris" },
  { question: "Opposite of 'up'", answer: "down" },
  { question: "An animal that barks", answer: "dog" },
  { question: "The planet we live on", answer: "earth" },
  { question: "A place with lots of books", answer: "library" },
  { question: "I sleep on this", answer: "bed" },
  { question: "Opposite of 'day'", answer: "night" },
  { question: "A cold frozen treat", answer: "icecream" },
  { question: "A small insect that makes silk", answer: "silkworm" },
  { question: "The color of grass", answer: "green" },
  { question: "A tool to cut paper", answer: "scissors" },
  { question: "I wear this on my feet", answer: "shoes" },
  { question: "The number after nine", answer: "ten" },
  { question: "Opposite of 'fast'", answer: "slow" },
  { question: "The sport with a bat and ball", answer: "baseball" },
  { question: "I use this to talk on the phone", answer: "ear" },
  { question: "A bird that cannot fly", answer: "ostrich" },
  { question: "A sweet fruit, often red or green", answer: "apple" },
  { question: "The month after December", answer: "january" },
  { question: "Opposite of 'light'", answer: "dark" },
  { question: "The animal that has a trunk", answer: "elephant" },
  { question: "I drink water from this", answer: "glass" },
  { question: "A number between 5 and 7", answer: "six" },
  { question: "A place where you buy medicine", answer: "pharmacy" },
  { question: "Opposite of 'happy'", answer: "sad" },
  { question: "A fruit with lots of seeds inside", answer: "pomegranate" },
  { question: "I wear this on my head", answer: "hat" },
  { question: "A planet known as the Red Planet", answer: "mars" },
  { question: "Opposite of 'full'", answer: "empty" },
  { question: "A big cat with stripes", answer: "tiger" },
  { question: "A vehicle that flies", answer: "plane" },
  { question: "The color of snow", answer: "white" },
  { question: "A popular Italian dish made with dough and cheese", answer: "pizza" },
  { question: "The first day of the week", answer: "sunday" },
  { question: "A number greater than zero", answer: "one" },
  { question: "The sound a cow makes", answer: "moo" },
  { question: "Opposite of 'yes'", answer: "no" },
];

// Helper to send score to backend
const saveScoreToServer = async ({ username, score, correctAnswers, attempts }) => {
  try {
    const res = await fetch('http://localhost:3000/save-score', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        score,
        correctAnswers,
        attempts,
        timestamp: new Date().toISOString()
      })
    });
    const data = await res.json();
    console.log("✅ Score saved:", data);
  } catch (err) {
    console.error("❌ Error saving score:", err);
  }
};

export default function WordGuessGame({ username }) {
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [round, setRound] = useState(1);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isAnswered, setIsAnswered] = useState(false);

  const maxRounds = 5;

  useEffect(() => {
    loadNewWord(false); // don't increment round on first load
  }, []);

  const loadNewWord = (incrementRound = true) => {
    if (round > maxRounds) {
      // Game over, no more words
      setFeedback(`🎉 Game Over! Final score: ${score}`);
      return;
    }

    if (usedIndexes.length >= wordBank.length) {
      setFeedback(`🎉 Game Over! Final score: ${score}`);
      if (username) {
        saveScoreToServer({
          username,
          score,
          correctAnswers,
          attempts: round - 1
        });
      }
      return;
    }

    let index;
    do {
      index = Math.floor(Math.random() * wordBank.length);
    } while (usedIndexes.includes(index));

    setUsedIndexes(prev => [...prev, index]);
    setCurrentWord(wordBank[index]);
    setGuess("");
    setFeedback("");
    setAttemptsLeft(3);
    setIsAnswered(false);

    if (incrementRound) {
      setRound(prev => {
        const nextRound = prev + 1;

        if (nextRound > maxRounds && username) {
          saveScoreToServer({
            username,
            score,
            correctAnswers,
            attempts: maxRounds
          });
        }

        return nextRound;
      });
    }
  };

  const handleSubmit = () => {
    if (isAnswered || attemptsLeft === 0 || round > maxRounds) return;

    const isCorrect = guess.trim().toLowerCase() === currentWord.answer.toLowerCase();
    if (isCorrect) {
      setFeedback("✅ Correct!");
      setScore(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
      setIsAnswered(true);
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      if (newAttempts === 0) {
        setFeedback(`❌ Out of attempts! Answer: ${currentWord.answer}`);
        setIsAnswered(true);
      } else {
        setFeedback(`❌ Try again (${newAttempts} left)`);
      }
    }
  };

  const handleGiveUp = () => {
    if (round > maxRounds) return;

    setFeedback(`😞 The correct answer was: ${currentWord.answer}`);
    setIsAnswered(true);
    setAttemptsLeft(0);
  };

  const canPlayMore = round <= maxRounds;

  return (
    <div className="word-guess-game dark" style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h2>🎯 Word Guess Game</h2>
      {canPlayMore ? (
        <>
          <p className="hint"><strong>Question:</strong> {currentWord.question}</p>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Type your guess..."
            disabled={isAnswered}
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          <div className="buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={handleSubmit} disabled={isAnswered || attemptsLeft === 0}>Submit</button>
            <button onClick={() => loadNewWord(true)} disabled={!isAnswered}>Next</button>
            <button onClick={handleGiveUp} disabled={isAnswered}>I Give Up</button>
          </div>
          <p className="feedback" style={{ marginTop: '10px' }}>{feedback}</p>
          <p className="score-round">Score: {score} | Round: {round} / {maxRounds}</p>
        </>
      ) : (
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>
          🎉 Game Over! Final score: {score} / {maxRounds}
        </p>
      )}
    </div>
  );
}
