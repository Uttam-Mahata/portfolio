import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootAccess = () => {
  const [identity, setIdentity] = useState({
    role: 'guest',
    status: 'Restricted Mode',
    flag: null
  });
  const navigate = useNavigate();

  // The Encrypted Flag (Base64 of 'root{1_4m_Wh0_1_4m_2025}')
  const SECRET = 'cm9vdHsxXzRtX1doMF8xXzRtXzIwMjV9';

  useEffect(() => {
    // Check Local Storage for the identity token
    const checkIdentity = () => {
      let token = localStorage.getItem('identity_token');

      // Set default if missing
      if (!token) {
        token = 'guest';
        localStorage.setItem('identity_token', 'guest');
      }
      
      if (token === 'daemon') {
        setIdentity({
          role: 'daemon',
          status: 'ROOT ACCESS ENABLED',
          flag: atob(SECRET)
        });
      } else {
        // Hint for the challenge solver
        console.warn('⚠ ACCESS DENIED: User identity is "guest". Expected "daemon".');
        console.log('Hint: "I am who I am" - Check your Storage.');
      }
    };

    checkIdentity();
    
    // Listen for storage changes in other tabs or devtools
    window.addEventListener('storage', checkIdentity);
    return () => window.removeEventListener('storage', checkIdentity);
  }, []);

  return (
    <div className="min-h-screen bg-black text-red-600 font-mono flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full border-2 border-red-800 p-8 rounded bg-gray-900 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-red-900 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest uppercase">
            System Override
          </h1>
          <div className="text-xs text-red-400">
            v2.0.25
          </div>
        </div>

        {/* Status Display */}
        <div className="mb-8 space-y-2">
          <p className="text-lg">
            USER IDENTITY: <span className={identity.role === 'daemon' ? "text-green-500 font-bold glow-text" : "text-white"}>{identity.role.toUpperCase()}</span>
          </p>
          <p className="text-lg">
            ACCESS STATUS: <span className={identity.role === 'daemon' ? "text-green-500 font-bold" : "text-red-500 font-bold blink"}>{identity.status}</span>
          </p>
        </div>

        {/* Challenge/Flag Area */}
        {identity.flag ? (
          <div className="bg-red-900/20 border border-red-500 p-6 rounded-lg text-center animate-pulse">
            <h2 className="text-2xl font-bold text-red-500 mb-4">⚠ DAEMON ACCESS GRANTED ⚠</h2>
            <div className="bg-black p-4 rounded border border-red-900 inline-block">
              <code className="text-xl text-green-400 font-bold tracking-wide">
                {identity.flag}
              </code>
            </div>
            <p className="mt-4 text-sm text-red-400">
              Session decrypted. Welcome back, Administrator.
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔒</div>
            <p className="text-xl mb-4">
              Secure Terminal Locked.
            </p>
            <p className="text-sm text-gray-500">
              "I am who I am."
            </p>
          </div>
        )}

        {/* Footer / Back Button */}
        <div className="mt-12 text-center border-t border-red-900 pt-6">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded border border-red-800 transition-colors duration-300 text-sm uppercase tracking-wide"
          >
            Terminate Session & Return
          </button>
        </div>

      </div>
      
      {/* CSS for blink/glow effects if needed, though Tailwind utilities are mostly used */}
      <style>{`
        .blink { animation: blinker 1s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
        .glow-text { text-shadow: 0 0 10px #22c55e; }
      `}</style>
    </div>
  );
};

export default RootAccess;
