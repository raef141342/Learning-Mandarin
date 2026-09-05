import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Trophy,
  BookOpen,
  Gamepad2,
  HelpCircle,
  Compass,
  CheckCircle2,
  Edit3,
  Camera,
  Sparkles,
  Zap,
  Lock,

  Coins,
  Award,
  X,
  Play,
  Check,

  Volume2,

  Swords,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
];

const INITIAL_WEEKLY_CHECKIN = [
  { day: 'Mon', checked: true },
  { day: 'Tue', checked: true },
  { day: 'Wed', checked: true },
  { day: 'Thu', checked: true },
  { day: 'Fri', checked: true },
  { day: 'Sat', checked: true },
  { day: 'Sun', checked: false, isToday: true },
];

const ACHIEVEMENTS = [
  { id: 1, title: 'Pinyin Pioneer', hanzi: '拼音先锋', desc: 'Master all 21 initials and 35 finals', icon: '🗣️', unlocked: true, progress: '100%' },
  { id: 2, title: '7-Day Scholar', hanzi: '七日学者', desc: 'Maintain a 7-day learning streak', icon: '🔥', unlocked: true, progress: '7/7' },
  { id: 3, title: 'Vocab Warrior', hanzi: '词汇战士', desc: 'Learn 100 essential HSK 1 words', icon: '⚔️', unlocked: false, progress: '64/100' },
  { id: 4, title: 'Multiplayer Ace', hanzi: '对决高手', desc: 'Win 5 speed pinyin battles', icon: '🏆', unlocked: false, progress: '3/5' },
];

export default function Home() {
  // User Profile State
  const [userName, setUserName] = useState('Angelica');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('Angelica');
  const [userAvatar, setUserAvatar] = useState(AVATAR_OPTIONS[0]);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Gamification & Progress State
  const level = 12;
  const [xp, setXp] = useState(1280);
  const nextLevelXp = 1500;
  const [streak, setStreak] = useState(7);
  const [gems, setGems] = useState(340);

  // Daily Check-In State
  const [weeklyProgress, setWeeklyProgress] = useState(INITIAL_WEEKLY_CHECKIN);
  const [isCheckedInToday, setIsCheckedInToday] = useState(false);

  // Interactive Modal / Active Feature Preview State
  const [activeFeatureModal, setActiveFeatureModal] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditingName(false);
      showToast('Name updated successfully!');
    }
  };

  const handleDailyCheckIn = () => {
    if (isCheckedInToday) return;

    setIsCheckedInToday(true);
    setStreak((prev) => prev + 1);
    setXp((prev) => prev + 50);
    setGems((prev) => prev + 15);

    setWeeklyProgress((prev) =>
      prev.map((item) => (item.isToday ? { ...item, checked: true } : item))
    );

    showToast('🎉 Check-in complete! +50 XP & +15 Gems');
  };

  const handleSelectAvatar = (imgUrl: string) => {
    setUserAvatar(imgUrl);
    setIsAvatarModalOpen(false);
    showToast('Avatar updated!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      {/* Top Banner / Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center font-extrabold text-xl text-white shadow-lg shadow-red-600/30 border border-red-400/30">
              漢
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-red-400 bg-clip-text text-transparent">
                Live Chinese
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest text-red-400 bg-red-950/60 border border-red-800/50 px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>
          </div>

          {/* Navigation Links (Home & Belajar) */}
          <nav className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 shadow-inner">
            <Link
              to="/"
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 shadow-md shadow-red-600/30"
            >
              Home
            </Link>
            <Link
              to="/belajar"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              Belajar
            </Link>
          </nav>

          {/* Quick Stats & User Profile */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Gems counter */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 shadow-sm">
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{gems}</span>
            </div>

            {/* Streak counter */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full text-xs font-bold text-orange-400 shadow-sm">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
              <span>{streak} Days</span>
            </div>

            {/* User Profile Card */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 pl-3 rounded-full hover:border-slate-700 transition">
              <div className="text-right hidden sm:block">
                <div className="flex items-center justify-end gap-1.5">
                  {isEditingName ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-slate-800 text-xs px-2 py-0.5 rounded border border-red-500 text-white outline-none w-24"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="p-1 text-emerald-400 hover:text-emerald-300"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-bold text-slate-100">
                        {userName}
                      </span>
                      <button
                        onClick={() => {
                          setTempName(userName);
                          setIsEditingName(true);
                        }}
                        className="text-slate-400 hover:text-red-400 transition"
                        title="Edit Display Name"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
                <div className="text-[11px] font-medium text-red-400">
                  Level {level} Student
                </div>
              </div>

              {/* Avatar with Overlay Button */}
              <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-red-500/80 shadow-md group-hover:brightness-90 transition"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-red-600 to-amber-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-950">
                  {level}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* SECTION 1: HERO & LEVEL PROGRESS & STREAK */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-red-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Subtle Chinese Pattern Background Accent */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 pointer-events-none text-red-500 font-serif text-[220px] select-none leading-none">
            龍
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Welcome & Level Progress */}
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Welcome back, {userName}! 欢迎回来</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ready to conquer your <span className="bg-gradient-to-r from-red-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">Daily Mandarin</span> challenge?
              </h1>

              {/* Progress Bar Container */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    Level {level} Scholar
                  </span>
                  <span className="text-slate-400">
                    <strong className="text-white font-bold">{xp}</strong> / {nextLevelXp} XP
                  </span>
                </div>

                <div className="w-full h-4 bg-slate-950 rounded-full p-0.5 border border-slate-800 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 rounded-full transition-all duration-700 shadow-lg shadow-red-500/20 relative"
                    style={{ width: `${(xp / nextLevelXp) * 100}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Earn <span className="text-amber-400 font-bold">{nextLevelXp - xp} more XP</span> to unlock Level {level + 1} and advanced conversation modules!
                </p>
              </div>
            </div>

            {/* Daily Check-In Mini Card */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4 relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20">
                    <Flame className="w-5 h-5 fill-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Daily Check-In</h3>
                    <p className="text-[11px] text-slate-400">Maintain your daily momentum</p>
                  </div>
                </div>
                <span className="text-xs font-black text-orange-400 bg-orange-950/60 border border-orange-800/40 px-2.5 py-1 rounded-full">
                  🔥 {streak} Days
                </span>
              </div>

              {/* Day Indicators */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {weeklyProgress.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center py-2 rounded-xl text-xs font-bold transition-all ${
                      item.checked
                        ? 'bg-gradient-to-b from-orange-500/20 to-red-500/10 border border-orange-500/40 text-orange-300'
                        : item.isToday
                        ? 'bg-slate-800 border border-slate-600 text-white animate-pulse'
                        : 'bg-slate-900 border border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
                    <span className="mt-1">
                      {item.checked ? (
                        <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      ) : (
                        '○'
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* Check-In Button */}
              <button
                onClick={handleDailyCheckIn}
                disabled={isCheckedInToday}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isCheckedInToday
                    ? 'bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 cursor-default'
                    : 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isCheckedInToday ? (
                  <>
                    <Check className="w-4 h-4" /> Today's Check-In Complete!
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Check In Today (+50 XP)
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: LEARNING MODES GRID (4 MAIN PILLARS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Learning Modes</span>
                <span className="text-xs font-medium text-red-400 bg-red-950/60 border border-red-800/40 px-2 py-0.5 rounded-md">
                  学习模式
                </span>
              </h2>
              <p className="text-xs text-slate-400">Select how you want to train your Mandarin skills today</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 01 - LEARN CARD */}
            <div
              onClick={() => setActiveFeatureModal('learn')}
              className="group relative bg-slate-900/90 border border-slate-800 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/50 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-600/10 rounded-full blur-xl group-hover:bg-red-600/20 transition"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-red-500 tracking-wider">01 — LEARN</span>
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition flex items-center gap-2">
                    Learn <span className="text-xs font-serif text-slate-400">(学习)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Master Mandarin vocabulary, grammar rules, pinyin pronunciation, and character stroke orders.
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button className="w-full py-2.5 px-4 rounded-xl bg-slate-800 group-hover:bg-red-600 text-slate-200 group-hover:text-white font-bold text-xs transition flex items-center justify-center gap-2">
                  <span>Start Learning</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            {/* 02 - MINI GAME MULTIPLAYER */}
            <div
              onClick={() => setActiveFeatureModal('multiplayer')}
              className="group relative bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-950/50 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-400 tracking-wider">02 — MULTIPLAYER</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition flex items-center gap-2">
                    Mini Games <span className="text-xs font-serif text-slate-400">(游戏)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Challenge other online learners in live speed battles and tone listening showdowns!
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button className="w-full py-2.5 px-4 rounded-xl bg-slate-800 group-hover:bg-purple-600 text-slate-200 group-hover:text-white font-bold text-xs transition flex items-center justify-center gap-2">
                  <span>Play Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            {/* 03 - QUIZ CARD */}
            <div
              onClick={() => setActiveFeatureModal('quiz')}
              className="group relative bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-950/50 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-600/10 rounded-full blur-xl group-hover:bg-amber-600/20 transition"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 tracking-wider">03 — QUIZ</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition flex items-center gap-2">
                    Quiz Arena <span className="text-xs font-serif text-slate-400">(测验)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Test your HSK knowledge, earn bonus experience points, and cement long-term retention.
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button className="w-full py-2.5 px-4 rounded-xl bg-slate-800 group-hover:bg-amber-600 text-slate-200 group-hover:text-white font-bold text-xs transition flex items-center justify-center gap-2">
                  <span>Take Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            {/* 04 - ADVENTURE CARD */}
            <div
              onClick={() => setActiveFeatureModal('adventure')}
              className="group relative bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/50 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-600/10 rounded-full blur-xl group-hover:bg-emerald-600/20 transition"></div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 tracking-wider">04 — ADVENTURE</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                    <Compass className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition flex items-center gap-2">
                    Adventure <span className="text-xs font-serif text-slate-400">(冒险)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Embark on RPG-style quests through Chinese cities, ordering tea and conversing with locals.
                  </p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button className="w-full py-2.5 px-4 rounded-xl bg-slate-800 group-hover:bg-emerald-600 text-slate-200 group-hover:text-white font-bold text-xs transition flex items-center justify-center gap-2">
                  <span>Start Adventure</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ACHIEVEMENTS & LEADERBOARD TEASER */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievement Badges */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Achievement Badges 成就</span>
                </h3>
                <p className="text-xs text-slate-400">Unlock special badges by reaching learning milestones</p>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                2 / 4 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {ACHIEVEMENTS.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition ${
                    item.unlocked
                      ? 'bg-slate-950/80 border-slate-700/80 hover:border-amber-500/40'
                      : 'bg-slate-950/30 border-slate-800/60 opacity-60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {item.title}
                        <span className="text-[10px] text-slate-400 font-serif">({item.hanzi})</span>
                      </h4>
                      {!item.unlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                    </div>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                    <div className="pt-1 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.unlocked ? 'bg-amber-400' : 'bg-slate-600'
                          }`}
                          style={{ width: item.progress.includes('%') ? item.progress : '64%' }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{item.progress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Learning / Daily Quest */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <span>Daily Quest 每日任务</span>
              </div>

              <h4 className="text-base font-extrabold text-white">
                Complete 1 Pinyin Sound Drill
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Listen and identify the correct tones for 10 common vocabulary items to fulfill your daily quota.
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Quest Progress</span>
                  <span className="text-red-400">7 / 10 Drills</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[70%]"></div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveFeatureModal('learn')}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Continue Quest (+100 XP)
            </button>
          </div>
        </section>

      </main>

      {/* MODAL 1: CHOOSE AVATAR */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">Choose Profile Avatar</h3>
              <p className="text-xs text-slate-400">Select a avatar character for your Live Chinese profile</p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-2">
              {AVATAR_OPTIONS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Option"
                  onClick={() => handleSelectAvatar(url)}
                  className={`w-20 h-20 rounded-2xl object-cover cursor-pointer border-2 transition transform hover:scale-105 ${
                    userAvatar === url ? 'border-red-500 ring-4 ring-red-500/20' : 'border-slate-700 hover:border-slate-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="w-full py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: ACTIVE FEATURE PREVIEW MODAL */}
      {activeFeatureModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveFeatureModal("")}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {activeFeatureModal === 'learn' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">01 — Learn Mandarin (学习)</h3>
                    <p className="text-xs text-slate-400">Interactive Vocabulary & Tone Drills</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Sample Lesson Preview</div>
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-2xl font-extrabold text-amber-400">你好</span>
                      <span className="ml-3 text-sm font-semibold text-slate-300">nǐ hǎo</span>
                    </div>
                    <button className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">Meaning: <span className="font-bold text-white">Hello / Hi</span></p>
                </div>

                <button
                  onClick={() => {
                    setActiveFeatureModal("");
                    showToast('Starting Learn Module...');
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-lg"
                >
                  Enter Full Learn Area
                </button>
              </div>
            )}

            {activeFeatureModal === 'multiplayer' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">02 — Mini Game Multiplayer (游戏)</h3>
                    <p className="text-xs text-slate-400">Real-Time Pinyin Showdown Arena</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-purple-400 font-bold">
                    <span>Active Lobby</span>
                    <span>1,420 Players Online</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-bold">Pinyin Speed Race</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Matchmaking Ready</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveFeatureModal("");
                    showToast('Searching for online match...');
                  }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl shadow-lg"
                >
                  Quick Match Now
                </button>
              </div>
            )}

            {activeFeatureModal === 'quiz' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">03 — Quiz Arena (测验)</h3>
                    <p className="text-xs text-slate-400">Test Your Knowledge & Earn XP</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <p className="text-xs text-slate-300">
                    Test your understanding of Chinese tones, Hanzi characters, and sentence structures under time pressure.
                  </p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-amber-950 text-amber-400 px-2.5 py-1 rounded-md border border-amber-800/40 font-bold">HSK Level 1-3</span>
                    <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-bold">10 Questions</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveFeatureModal("");
                    showToast('Starting Quiz Session...');
                  }}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-xl shadow-lg"
                >
                  Start Quiz Challenge
                </button>
              </div>
            )}

            {activeFeatureModal === 'adventure' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">04 — Mandarin Adventure (冒险)</h3>
                    <p className="text-xs text-slate-400">Explore Chinese Cities & RPG Quests</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Chapter 1: The Tea House</span>
                  <p className="text-xs text-slate-300">
                    Travel through Chengdu, order Jasmine tea, and negotiate prices with tea masters.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveFeatureModal("");
                    showToast('Launching Adventure Chapter 1...');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg"
                >
                  Begin Quest
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}