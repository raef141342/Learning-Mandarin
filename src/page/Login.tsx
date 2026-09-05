  import React, { useState } from 'react';

const theme = {
  bg: '#0f172a',
  cardBg: '#1e293b',
  innerCardBg: '#0f172a',
  accent: '#f59e0b', // Gold / Amber
  accentHover: '#d97706',
  accentRed: '#ef4444',
  accentGreen: '#10b981',
  accentBlue: '#3b82f6',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#334155',
  borderFocus: '#6366f1',
};

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const EyeIcon = ({ visible }: EyeProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export default function Login({ onAuthSuccess }: LoginProps) {
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
  e.preventDefault();

  // Mengambil nama dari input `name` atau potongan email
  const userName = name.trim() !== '' 
    ? name 
    : (email ? email.split('@')[0] : 'Angel');

  // Mengirim data ke App.tsx untuk pindah ke Home
  if (onAuthSuccess) {
    onAuthSuccess({
      name: userName,
      email: email || 'user@example.com',
    });
  }
};
  const handleSubmit = () => {
    // e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Silakan isi email dan kata sandi kamu.');
      return;
    }

    if (tab === 'signup') {
      if (!name) {
        setErrorMessage('Silakan isi nama lengkap kamu.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Konfirmasi kata sandi tidak cocok.');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Kamu harus menyetujui Syarat & Ketentuan.');
        return;
      }
    }

    setIsLoading(true);

    // Simulasi proses API
    setTimeout(() => {
      setIsLoading(false);
      if (tab === 'signin') {
        setSuccessMessage(`Berhasil masuk! Selamat datang kembali, ${email.split('@')[0]}.`);
      } else {
        setSuccessMessage(`Pendaftaran akun "${name}" berhasil! Silakan Sign In.`);
        setTab('signin');
      }
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Berhasil masuk menggunakan akun Google (user.mandarin@gmail.com)!');
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.08), transparent 70%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: theme.textPrimary,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: theme.cardBg,
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          border: `1px solid ${theme.border}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header Section */}
        {}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: theme.accentRed,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '14px',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
              border: '2px solid rgba(255,255,255,0.2)',
            }}
          >
            漢
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Live Chinese Platform
          </h2>
          <p style={{ fontSize: '13px', color: theme.textSecondary, margin: 0, lineHeight: '1.4' }}>
            {tab === 'signin'
              ? 'Masuk ke akun kamu untuk melanjutkan pembelajaran Pinyin'
              : 'Buat akun baru dan mulailah belajar Mandarin interaktif'}
          </p>
        </div>

        {/* Tab Selection Switcher */}
        {}
        <div
          style={{
            display: 'flex',
            backgroundColor: theme.innerCardBg,
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '24px',
            border: `1px solid ${theme.border}`,
          }}
        >
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: tab === 'signin' ? theme.cardBg : 'transparent',
              color: tab === 'signin' ? theme.accent : theme.textSecondary,
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: tab === 'signin' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Sign In (Masuk)
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setErrorMessage('');
              setSuccessMessage('');
            }}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: tab === 'signup' ? theme.cardBg : 'transparent',
              color: tab === 'signup' ? theme.accent : theme.textSecondary,
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: tab === 'signup' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Sign Up (Daftar)
          </button>
        </div>

        {/* Google OAuth Button */}
        {}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            backgroundColor: '#ffffff',
            color: '#1f2937',
            padding: '12px 16px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.2s, transform 0.1s',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          <GoogleIcon />
          <span>{isLoading ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}</span>
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '22px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: theme.border }}></div>
          <span style={{ padding: '0 12px', fontSize: '12px', color: theme.textSecondary, textTransform: 'lowercase' }}>
            atau email
          </span>
          <div style={{ flex: 1, height: '1px', backgroundColor: theme.border }}></div>
        </div>

        {/* Feedback Messages */}
        {}
        {errorMessage && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${theme.accentRed}`,
              color: '#fca5a5',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '18px',
              lineHeight: '1.4',
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: `1px solid ${theme.accentGreen}`,
              color: '#6ee7b7',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '18px',
              lineHeight: '1.4',
            }}
          >
            🎉 {successMessage}
          </div>
        )}

        {/* Form Controls */}
        {}
        <form onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textSecondary, marginBottom: '6px' }}>
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: theme.innerCardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.textPrimary,
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textSecondary, marginBottom: '6px' }}>
              Alamat Email
            </label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: theme.innerCardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.textPrimary,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ marginBottom: tab === 'signup' ? '16px' : '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textSecondary, marginBottom: '6px' }}>
              Kata Sandi
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 14px',
                  backgroundColor: theme.innerCardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.textPrimary,
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: theme.textSecondary,
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          {tab === 'signup' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textSecondary, marginBottom: '6px' }}>
                Konfirmasi Kata Sandi
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: theme.innerCardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.textPrimary,
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {/* Options: Remember Me or Terms */}
          {}
          {tab === 'signin' ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: theme.textSecondary }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: theme.accent, borderRadius: '4px' }}
                />
                <span>Ingat Saya</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Instruksi reset password akan dikirim ke email kamu.');
                }}
                style={{ fontSize: '13px', color: theme.accent, textDecoration: 'none', fontWeight: '600' }}
              >
                Lupa password?
              </a>
            </div>
          ) : (
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '12px', color: theme.textSecondary, lineHeight: '1.4' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ accentColor: theme.accent, marginTop: '2px' }}
                />
                <span>
                  Saya menyetujui <a href="#terms" style={{ color: theme.accent }}>Syarat & Ketentuan</a> serta <a href="#privacy" style={{ color: theme.accent }}>Kebijakan Privasi</a> Live Chinese.
                </span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          {}
         <button
  type="submit"
  disabled={isLoading}
  onClick={handleSignIn} // <-- Tambahkan baris ini di sini
  style={{
    width: '100%',
    backgroundColor: theme.accent,
    color: '#0f172a',
    padding: '13px 16px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '15px',
    fontWeight: '800',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
    transition: 'all 0.2s ease',
    opacity: isLoading ? 0.7 : 1,
  }}
>
  {isLoading ? 'Memproses...' : (tab === 'signin' ? 'Sign In ke Akun' : 'Daftar Akun Baru')}
</button>
        </form>
      </div>
    </div>
  );
}

interface LoginProps {
  onAuthSuccess: (userData: { name: string; email: string }) => void;

}
interface EyeProps { 
  visible: boolean;
 }

