import React, { useState } from 'react';
import { sendChatMessage } from '../../../api/gemini';
import { textToSpeech } from '../../../api/tts';
import WordGuessGame from './WordGuessGame';
import ScoreHistory from './ScoreHistory';  

const AIDemo = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const username = loggedInUser?.username;

  // Top-level tool selector: chatbot, tts, wordgame
  const [activeTool, setActiveTool] = useState('chatbot');

  // Word Guess Game mode: play or history
  const [showHistory, setShowHistory] = useState(false);

  // Chatbot state
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Text-to-Speech state
  const [ttsInput, setTtsInput] = useState('');
  const [ttsAudioUrl, setTtsAudioUrl] = useState('');
  const [ttsLoading, setTtsLoading] = useState(false);

  // Chatbot handler
  const handleChat = async () => {
    setChatLoading(true);
    try {
      const res = await sendChatMessage(chatInput);
      setChatResponse(res);
    } catch (e) {
      setChatResponse('Error: ' + e.message);
    }
    setChatLoading(false);
  };

  // Text-to-Speech handler
  const handleTTS = async () => {
    setTtsLoading(true);
    setTtsAudioUrl('');
    try {
      const audioBlob = await textToSpeech(ttsInput);
      const url = URL.createObjectURL(audioBlob);
      setTtsAudioUrl(url);
    } catch (e) {
      setTtsAudioUrl('');
      alert('TTS Error: ' + e.message);
    }
    setTtsLoading(false);
  };

  return (
    <section className="content-section w-full px-0">
      <div className="section-inner w-full px-0">
        <h2 className="section-title">AI Tutor</h2>

        {/* Tool selector */}
        <div className="tool-selector mb-8" style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button
            onClick={() => setActiveTool('chatbot')}
            className={activeTool === 'chatbot' ? 'active' : ''}
          >
            Chatbot
          </button>
          <button
            onClick={() => setActiveTool('tts')}
            className={activeTool === 'tts' ? 'active' : ''}
          >
            Text-to-Speech
          </button>
          <button
            onClick={() => setActiveTool('wordgame')}
            className={activeTool === 'wordgame' ? 'active' : ''}
          >
            Word Guess Game
          </button>
        </div>

        {/* Tool content */}
        <div className="section-content grid grid-cols-1 md:grid-cols-2 gap-16 w-full px-0">

          {activeTool === 'chatbot' && (
            <div className="about-card w-full max-w-none text-2xl p-12 min-h-[200px] md:col-span-2" style={{ minWidth: 0 }}>
              <h3>Chatbot</h3>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask anything..."
                style={{ width: '100%', marginBottom: 8 }}
              />
              <button onClick={handleChat} disabled={chatLoading} style={{ marginBottom: 8 }}>
                {chatLoading ? 'Loading...' : 'Send'}
              </button>
              <div style={{ minHeight: 40 }}>{chatResponse}</div>
            </div>
          )}

          {activeTool === 'tts' && (
            <div className="about-card w-full max-w-none text-2xl p-12 min-h-[200px] md:col-span-2" style={{ minWidth: 0 }}>
              <h3>Text-to-Speech</h3>
              <input
                type="text"
                value={ttsInput}
                onChange={e => setTtsInput(e.target.value)}
                placeholder="Enter text to speak..."
                style={{ width: '100%', marginBottom: 8 }}
              />
              <button onClick={handleTTS} disabled={ttsLoading} style={{ marginBottom: 8 }}>
                {ttsLoading ? 'Creating audio...' : 'Convert Text to Speech'}
              </button>
              {ttsAudioUrl && (
                <audio controls src={ttsAudioUrl} style={{ width: '100%' }} />
              )}
            </div>
          )}

          {activeTool === 'wordgame' && (
            <div className="about-card w-full max-w-none text-2xl p-12 min-h-[100px] md:col-span-2" style={{ minWidth: 0 }}>
              <h3>Word Guess Game</h3>
              <div
            style={{
              marginBottom: '12px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'nowrap',
            }}
          >
            <button
              onClick={() => setShowHistory(false)}
              disabled={!showHistory}
              style={{
                fontSize: '1.5rem',
                padding: '6px 12px',
                minWidth: '80px',
                cursor: !showHistory ? 'not-allowed' : 'pointer',
              }}
            >
              Play Game
            </button>
            <button
              onClick={() => setShowHistory(true)}
              disabled={showHistory}
              style={{
                fontSize: '1.5rem',
                padding: '6px 12px',
                minWidth: '110px',
                cursor: showHistory ? 'not-allowed' : 'pointer',
              }}
            >
              View Score History
            </button>
          </div>



              {showHistory ? (
                <ScoreHistory username={username} />
              ) : (
                <WordGuessGame username={username} />
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default AIDemo;
