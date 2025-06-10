import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const imageCaptchaDataOptions = [
  {
    question: 'Select all images containing cats',
    images: [
      { url: 'https://placecats.com/80/80?id=1', isCorrect: true },
      { url: 'https://placedog.net/80/80?id=1', isCorrect: false },
      { url: 'https://placecats.com/80/80?id=2', isCorrect: true },
      { url: 'https://placedog.net/80/80?id=2', isCorrect: false },
      { url: 'https://placecats.com/80/80?id=3', isCorrect: true },
      { url: 'https://loremflickr.com/80/80/bird?lock=1', isCorrect: false },
    ],
    correctIndices: [0, 2, 4],
  },
  {
    question: 'Select all images Not containing Dogs',
    images: [
      { url: 'https://loremflickr.com/80/80?random=3', isCorrect: true },
      { url: 'https://placedog.net/80/80/4', isCorrect: false },
      { url: 'https://loremflickr.com/80/80?random=2', isCorrect: true },
      { url: 'https://placedog.net/80/80/5', isCorrect: false },
      { url: 'https://loremflickr.com/80/80/tree?lock=3', isCorrect: true },
      { url: 'https://placedog.net/80/80/4', isCorrect: false },
    ],
    correctIndices: [0, 2, 4],
  },
];

const Captcha = forwardRef((props, ref) => {
  const { onValidate } = props;

  const [captchaType, setCaptchaType] = useState('arithmetic');
  const [arithmetic, setArithmetic] = useState({ question: '', answer: 0, input: '' });
  const [imageChallenge, setImageChallenge] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const maxAttempts = 3;

  useEffect(() => {
    if (captchaType === 'arithmetic') generateArithmetic();
    else generateImage();
    setError('');
    setAttempts(0);
  }, [captchaType]);

  const generateArithmetic = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const op = Math.random() < 0.5 ? '+' : '-';
    const ans = op === '+' ? num1 + num2 : num1 - num2;
    setArithmetic({ question: `${num1} ${op} ${num2} = ?`, answer: ans, input: '' });
  };

  const generateImage = () => {
    const challenge = imageCaptchaDataOptions[Math.floor(Math.random() * imageCaptchaDataOptions.length)];
    setImageChallenge(challenge);
    setSelectedIndices([]);
  };

  const toggleImage = (index) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const validate = () => {
    if (attempts >= maxAttempts) {
      setError('Too many failed attempts.');
      return false;
    }

    if (captchaType === 'arithmetic') {
      const isCorrect = parseInt(arithmetic.input) === arithmetic.answer;
      if (!isCorrect) {
        setError('Incorrect arithmetic answer.');
        setAttempts(attempts + 1);
        generateArithmetic();
        return false;
      }
    } else if (captchaType === 'image') {
      const sortedSel = [...selectedIndices].sort((a, b) => a - b);
      const correct = [...imageChallenge.correctIndices].sort((a, b) => a - b);
      const isCorrect = JSON.stringify(sortedSel) === JSON.stringify(correct);
      if (!isCorrect) {
        setError('Incorrect image selection.');
        setAttempts(attempts + 1);
        generateImage();
        return false;
      }
    }
    onValidate();
    setError('');
    setAttempts(0);
    return true;
  };

  // 👇 Expose `validate()` method to parent using ref
  useImperativeHandle(ref, () => ({
    validate
  }));

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-xl space-y-4">
      <select
        className="border border-blue-300 p-2 rounded-lg w-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={captchaType}
        onChange={(e) => setCaptchaType(e.target.value)}
      >
        <option value="arithmetic">Arithmetic</option>
        <option value="image">Image</option>
      </select>

      {captchaType === 'arithmetic' ? (
        <div className="space-y-2">
          <div className="font-semibold text-lg">{arithmetic.question}</div>
          <input
            type="number"
            value={arithmetic.input}
            onChange={(e) => setArithmetic({ ...arithmetic, input: e.target.value })}
            className="border p-2 w-full rounded"
          />
        </div>
      ) : (
        imageChallenge && (
          <div className="space-y-2">
            <div className="font-semibold text-lg">{imageChallenge.question}</div>
            <div className="grid grid-cols-3 gap-2">
              {imageChallenge.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`Captcha ${i}`}
                  className={`cursor-pointer border rounded ${
                    selectedIndices.includes(i) ? 'ring-4 ring-blue-400' : ''
                  }`}
                  onClick={() => toggleImage(i)}
                />
              ))}
            </div>
          </div>
        )
      )}

      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded w-full"
        onClick={validate}
      >
        Verify Captcha
      </button>
    </div>
  );
});

export default Captcha;
