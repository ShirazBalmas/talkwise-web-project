import React from 'react';

const testimonials = [
  {
    name: 'אלון ברק',
    role: 'מהנדס תוכנה',
    text: 'TalkWise עוזר לי לנסח מאמרים בצורה מדויקת וללטש את הכתיבה שלי. פשוט כלי מעולה!',
    stars: 5,
  },
  {
    name: 'מיכל לוי',
    role: 'מנהלת שיווק',
    text: 'השימוש בכלי ההמרה מטקסט לדיבור עוזר לי לשפר את הדיבור שלי באנגלית. זה שדרוג אמיתי למצגות שאני מעבירה באנגלית!',
    stars: 5,
  },
  {
    name: 'דני כהן',
    role: 'סטודנט',
    text: ' בעזרת TalkWise הצלחתי להגיע לרמת שיחה בחודשים ספורים ממליץ בחום',
    stars: 5,
  },
];

const Home = ({ onNavigate }) => (
  <section id="home" className="min-h-screen w-full text-center py-0 bg-gray-900 rounded-none shadow-none flex flex-col items-center justify-start">
    <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Smart Tutor</h1>
    <p className="text-lg text-gray-300 mb-6 max-w-xl">
      Discover a smarter way to improve your English! Smart Tutor uses advanced AI to help you practice, translate, and speak English with confidence. Whether you're a student, professional, or just want to get better, our platform is here for you.
    </p>
    <img
      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
      alt="AI Learning Illustration"
      className="w-64 h-64 object-contain mb-6 rounded-lg shadow-lg"
    />
    <button
      onClick={() => onNavigate('ai')}
      className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-lg text-lg transition mt-2 shadow-md"
    >
      Try AI Tools Now
    </button>

    {/* Testimonials Section */}
    <div className="mt-4 w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-2 text-white" dir="rtl">מה הלומדים שלנו אומרים</h2>
      <p className="text-gray-300 mb-8" dir="rtl">אלפי אנשים כבר משפרים את האנגלית שלהם בעזרת הפלטפורמה שלנו.</p>
      <div className="flex flex-col md:flex-row gap-6 w-full px-4 justify-center items-stretch">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gray-800 bg-opacity-80 rounded-xl shadow-md p-6 flex-1 min-w-[260px] flex flex-col justify-between" dir="rtl">
            <div className="flex items-center mb-2">
              {Array.from({ length: t.stars }).map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <p className="text-white mb-4">"{t.text}"</p>
            <div className="mt-auto">
              <div className="font-bold text-white">{t.name}</div>
              <div className="text-gray-300 text-sm">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Home;
