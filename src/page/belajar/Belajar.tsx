import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  Button,
  Grid, 
  Paper,
  Chip,
  IconButton,
  Alert,
  Divider,
  Stack,
  useMediaQuery
} from '@mui/material';

import {
  VolumeUp as Volume2Icon,
  AutoAwesome as SparklesIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as XCircleIcon,
  Refresh as RefreshIcon,
  InfoOutlined as InfoIcon,
  EmojiEvents as AwardIcon,
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ef4444', // Red accent
    },
    secondary: {
      main: '#f59e0b', // Amber accent
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});

interface ToneInfo {
  id: number;
  nameZh: string;
  nameId: string;
  markExample: string;
  contour: string;
  symbol: string;
  description: string;
  pitchPath: string;
  color: string;
  startPitch: number;
  endPitch: number;
  dipPitch?: number;
}

interface SoundItem {
  pinyin: string;
  ipa?: string;
  exampleZh?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
}

interface SoundGroup {
  category: string;
  categoryZh: string;
  items: SoundItem[];
}

const TONES: ToneInfo[] = [
  {
    id: 1,
    nameZh: "阴平 (Yīnpíng)",
    nameId: "Nada 1: Datar & Tinggi (High Level)",
    markExample: "mā",
    contour: "55",
    symbol: "ˉ",
    description: "Suara tinggi mendatar dan stabil. Tidak naik dan tidak turun.",
    pitchPath: "M 10,20 L 90,20",
    color: "#EF4444",
    startPitch: 400,
    endPitch: 400
  },
  {
    id: 2,
    nameZh: "阳平 (Yángpíng)",
    nameId: "Nada 2: Naik (Rising)",
    markExample: "má",
    contour: "35",
    symbol: "ˊ",
    description: "Suara naik dari sedang ke tinggi, seperti mengajukan pertanyaan ('Hah?').",
    pitchPath: "M 10,70 Q 50,50 90,20",
    color: "#10B981",
    startPitch: 280,
    endPitch: 420
  },
  {
    id: 3,
    nameZh: "上声 (Shǎngshēng)",
    nameId: "Nada 3: Turun-Naik (Falling-Rising)",
    markExample: "mǎ",
    contour: "214",
    symbol: "ˇ",
    description: "Suara diawali sedikit rendah, turun ke paling bawah lalu melonjak naik.",
    pitchPath: "M 10,60 Q 50,90 90,35",
    color: "#3B82F6",
    startPitch: 260,
    dipPitch: 180,
    endPitch: 360
  },
  {
    id: 4,
    nameZh: "去声 (Qùshēng)",
    nameId: "Nada 4: Turun Tajam (Falling)",
    markExample: "mà",
    contour: "51",
    symbol: "ˋ",
    description: "Suara turun tajam dan tegas dari nada paling tinggi ke rendah, seperti memberi perintah.",
    pitchPath: "M 10,20 L 90,85",
    color: "#8B5CF6",
    startPitch: 440,
    endPitch: 200
  }
];

const CONSONANTS: SoundGroup[] = [
  {
    category: "Konsonan Bibir (Bibir/Labial)",
    categoryZh: "双唇音 / 唇齿音",
    items: [
      { pinyin: "b", exampleZh: "八", examplePinyin: "bā", exampleMeaning: "Delapan" },
      { pinyin: "p", exampleZh: "爬", examplePinyin: "pá", exampleMeaning: "Merayap/Mendaki" },
      { pinyin: "m", exampleZh: "妈", examplePinyin: "mā", exampleMeaning: "Ibu" },
      { pinyin: "f", exampleZh: "发", examplePinyin: "fā", exampleMeaning: "Kirim/Rambut" }
    ]
  },
  {
    category: "Konsonan Ujung Lidah (Alveolar)",
    categoryZh: "舌尖中音",
    items: [
      { pinyin: "d", exampleZh: "大", examplePinyin: "dà", exampleMeaning: "Besar" },
      { pinyin: "t", exampleZh: "他", examplePinyin: "tā", exampleMeaning: "Dia (Laki-laki)" },
      { pinyin: "n", exampleZh: "你", examplePinyin: "nǐ", exampleMeaning: "Kamu" },
      { pinyin: "l", exampleZh: "拉", examplePinyin: "lā", exampleMeaning: "Tarik" }
    ]
  },
  {
    category: "Konsonan Pangkal Lidah (Velar)",
    categoryZh: "舌根音",
    items: [
      { pinyin: "g", exampleZh: "哥", examplePinyin: "gē", exampleMeaning: "Kakak Laki-laki" },
      { pinyin: "k", exampleZh: "客", examplePinyin: "kè", exampleMeaning: "Tamu" },
      { pinyin: "h", exampleZh: "好", examplePinyin: "hǎo", exampleMeaning: "Baik/Bagus" }
    ]
  },
  {
    category: "Konsonan Permukaan Lidah (Palatal)",
    categoryZh: "舌面音",
    items: [
      { pinyin: "j", exampleZh: "家", examplePinyin: "jiā", exampleMeaning: "Rumah/Keluarga" },
      { pinyin: "q", exampleZh: "七", examplePinyin: "qī", exampleMeaning: "Tujuh" },
      { pinyin: "x", exampleZh: "西", examplePinyin: "xī", exampleMeaning: "Barat" }
    ]
  },
  {
    category: "Konsonan Gulung Lidah (Retroflex)",
    categoryZh: "翘舌音 (舌尖后音)",
    items: [
      { pinyin: "zh", exampleZh: "中", examplePinyin: "zhōng", exampleMeaning: "Tengah" },
      { pinyin: "ch", exampleZh: "吃", examplePinyin: "chī", exampleMeaning: "Makan" },
      { pinyin: "sh", exampleZh: "书", examplePinyin: "shū", exampleMeaning: "Buku" },
      { pinyin: "r", exampleZh: "热", examplePinyin: "rè", exampleMeaning: "Panas" }
    ]
  },
  {
    category: "Konsonan Gigi Depan (Dental)",
    categoryZh: "平舌音 (舌尖前音)",
    items: [
      { pinyin: "z", exampleZh: "早", examplePinyin: "zǎo", exampleMeaning: "Pagi" },
      { pinyin: "c", exampleZh: "菜", examplePinyin: "cài", exampleMeaning: "Sayur/Masakan" },
      { pinyin: "s", exampleZh: "三", examplePinyin: "sān", exampleMeaning: "Tiga" }
    ]
  },
  {
    category: "Semi-Vokal (Pelengkap)",
    categoryZh: "零声母辅助",
    items: [
      { pinyin: "y", exampleZh: "一", examplePinyin: "yī", exampleMeaning: "Satu" },
      { pinyin: "w", exampleZh: "五", examplePinyin: "wǔ", exampleMeaning: "Lima" }
    ]
  }
];

const VOWELS: SoundGroup[] = [
  {
    category: "Vokal Tunggal (单韵母)",
    categoryZh: "单韵母",
    items: [
      { pinyin: "a", exampleZh: "阿", examplePinyin: "ā", exampleMeaning: "Kata Seru" },
      { pinyin: "o", exampleZh: "哦", examplePinyin: "ó", exampleMeaning: "Oh" },
      { pinyin: "e", exampleZh: "鹅", examplePinyin: "é", exampleMeaning: "Angsa" },
      { pinyin: "i", exampleZh: "衣", examplePinyin: "yī", exampleMeaning: "Baju" },
      { pinyin: "u", exampleZh: "乌", examplePinyin: "wū", exampleMeaning: "Gagak/Hitam" },
      { pinyin: "ü", exampleZh: "鱼", examplePinyin: "yú", exampleMeaning: "Ikan" }
    ]
  },
  {
    category: "Vokal Majemuk (复韵母)",
    categoryZh: "复韵母",
    items: [
      { pinyin: "ai", exampleZh: "爱", examplePinyin: "ài", exampleMeaning: "Cinta" },
      { pinyin: "ei", exampleZh: "飞", examplePinyin: "fēi", exampleMeaning: "Terbang" },
      { pinyin: "ui", exampleZh: "水", examplePinyin: "shuǐ", exampleMeaning: "Air" },
      { pinyin: "ao", exampleZh: "猫", examplePinyin: "māo", exampleMeaning: "Kucing" },
      { pinyin: "ou", exampleZh: "狗", examplePinyin: "gǒu", exampleMeaning: "Anjing" },
      { pinyin: "iu", exampleZh: "九", examplePinyin: "jiǔ", exampleMeaning: "Sembilan" },
      { pinyin: "ie", exampleZh: "叶", examplePinyin: "yè", exampleMeaning: "Daun" },
      { pinyin: "üe", exampleZh: "月", examplePinyin: "yuè", exampleMeaning: "Bulan" },
      { pinyin: "er", exampleZh: "二", examplePinyin: "èr", exampleMeaning: "Dua" }
    ]
  },
  {
    category: "Vokal Hidung Frontal & Nasal (鼻韵母)",
    categoryZh: "前/后鼻韵母",
    items: [
      { pinyin: "an", exampleZh: "安", examplePinyin: "ān", exampleMeaning: "Tenang/Aman" },
      { pinyin: "en", exampleZh: "门", examplePinyin: "mén", exampleMeaning: "Pintu" },
      { pinyin: "in", exampleZh: "心", examplePinyin: "xīn", exampleMeaning: "Hati" },
      { pinyin: "un", exampleZh: "轮", examplePinyin: "lún", exampleMeaning: "Roda" },
      { pinyin: "ün", exampleZh: "云", examplePinyin: "yún", exampleMeaning: "Awan" },
      { pinyin: "ang", exampleZh: "昂", examplePinyin: "áng", exampleMeaning: "Tinggi" },
      { pinyin: "eng", exampleZh: "风", examplePinyin: "fēng", exampleMeaning: "Angin" },
      { pinyin: "ing", exampleZh: "星", examplePinyin: "xīng", exampleMeaning: "Bintang" },
      { pinyin: "ong", exampleZh: "龙", examplePinyin: "lóng", exampleMeaning: "Naga" }
    ]
  }
];

function applyToneToVowel(syllable: string, toneNum: number): string {
  if (toneNum === 0 || toneNum > 4) return syllable;
  
  const toneMarks: { [key: string]: string[] } = {
    'a': ['a', 'ā', 'á', 'ǎ', 'à'],
    'o': ['o', 'ō', 'ó', 'ǒ', 'ò'],
    'e': ['e', 'ē', 'é', 'ě', 'è'],
    'i': ['i', 'ī', 'í', 'ǐ', 'ì'],
    'u': ['u', 'ū', 'ú', 'ǔ', 'ù'],
    'ü': ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
    'v': ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ']
  };

  let lower = syllable.toLowerCase();

  if (lower.includes('a')) return lower.replace('a', toneMarks['a'][toneNum]);
  if (lower.includes('e')) return lower.replace('e', toneMarks['e'][toneNum]);
  if (lower.includes('ou')) return lower.replace('o', toneMarks['o'][toneNum]);
  if (lower.includes('o')) return lower.replace('o', toneMarks['o'][toneNum]);
  if (lower.includes('iu')) return lower.replace('u', toneMarks['u'][toneNum]);
  if (lower.includes('ui')) return lower.replace('i', toneMarks['i'][toneNum]);
  if (lower.includes('ü')) return lower.replace('ü', toneMarks['ü'][toneNum]);
  if (lower.includes('i')) return lower.replace('i', toneMarks['i'][toneNum]);
  if (lower.includes('u')) return lower.replace('u', toneMarks['u'][toneNum]);

  return syllable;
}

export default function Belajar() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedTone, setSelectedTone] = useState<ToneInfo>(TONES[0]);
  const [activeTonePlaying, setActiveTonePlaying] = useState<number | null>(null);

  // Pinyin Builder state
  const [selectedConsonant, setSelectedConsonant] = useState<string>('m');
  const [selectedVowel, setSelectedVowel] = useState<string>('a');
  const [selectedBuilderTone, setSelectedBuilderTone] = useState<number>(1);

  // Quiz state
  const [quizTone, setQuizTone] = useState<ToneInfo>(TONES[0]);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizTotal, setQuizTotal] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    generateNewQuizQuestion();
  }, []);

  const playToneSound = (tone: ToneInfo) => {
    setActiveTonePlaying(tone.id);
    speakText(tone.markExample);

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      const duration = 0.6;

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      if (tone.id === 1) {
        osc.frequency.setValueAtTime(tone.startPitch, now);
        osc.frequency.setValueAtTime(tone.endPitch, now + duration);
      } else if (tone.id === 2) {
        osc.frequency.setValueAtTime(tone.startPitch, now);
        osc.frequency.exponentialRampToValueAtTime(tone.endPitch, now + duration);
      } else if (tone.id === 3) {
        osc.frequency.setValueAtTime(tone.startPitch, now);
        osc.frequency.exponentialRampToValueAtTime(tone.dipPitch || 180, now + duration * 0.4);
        osc.frequency.exponentialRampToValueAtTime(tone.endPitch, now + duration);
      } else if (tone.id === 4) {
        osc.frequency.setValueAtTime(tone.startPitch, now);
        osc.frequency.exponentialRampToValueAtTime(tone.endPitch, now + duration * 0.8);
      }

      osc.start(now);
      osc.stop(now + duration);

      setTimeout(() => {
        setActiveTonePlaying(null);
      }, duration * 1000);
    } catch (e) {
      console.log("Audio API Error:", e);
      setActiveTonePlaying(null);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // const getTtsMp3Url = (text: string) => {
  //   return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=zh-CN&client=tw-ob`;
  // };
const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    audioRef.current?.play();
  };
  // const downloadMp3 = (text: string) => {
  //   const url = getTtsMp3Url(text);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = `${text}.mp3`;
  //   link.target = '_blank';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const generateNewQuizQuestion = () => {
    const randomIdx = Math.floor(Math.random() * TONES.length);
    setQuizTone(TONES[randomIdx]);
    setQuizFeedback(null);
  };

  const handleQuizAnswer = (toneId: number) => {
    setQuizTotal(prev => prev + 1);
    if (toneId === quizTone.id) {
      setQuizScore(prev => prev + 1);
      setQuizFeedback('correct');
    } else {
      setQuizFeedback('wrong');
    }
  };

  const combinedPinyin = applyToneToVowel(selectedConsonant + selectedVowel, selectedBuilderTone);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        
        {/* MUI AppBar Header */}
        <AppBar position="sticky" elevation={4} sx={{ bgcolor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #334155' }}>
          <Toolbar>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: isMobile ? 1 : 0 }}>
                <Button
                  component={Link}
                  to="/"
                  variant="outlined"
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: '#f8fafc',
                    borderColor: 'rgba(255,255,255,0.2)',
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    mr: 1,
                    '&:hover': {
                      borderColor: 'error.main',
                      bgcolor: 'rgba(239, 68, 68, 0.15)',
                    }
                  }}
                >
                  Kembali
                </Button>
                <Paper elevation={3} sx={{ bgcolor: 'error.main', color: '#fff', px: 1.8, py: 0.5, borderRadius: 2, fontWeight: 'bold', fontSize: '1.4rem' }}>
                  漢
                </Paper>
                <Box>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 800, background: 'linear-gradient(90deg, #f87171, #fde047)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Live Chinese - Hanyu Pinyin & 4 Nada
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Pembelajaran Interaktif Nada Tradisional & Fonetik Mandarin (MUI)
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Tabs */}
              <Tabs 
                value={tabIndex} 
                onChange={(_, val) => setTabIndex(val)} 
                variant={isMobile ? "scrollable" : "standard"}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8' },
                  '& .Mui-selected': { color: '#f8fafc' }
                }}
              >
                <Tab label="4 Nada (声调)" />
                <Tab label="Vokal & Konsonan" />
                <Tab label="Penggabung Pinyin" />
                <Tab label="Kuis Nada" />
              </Tabs>
            </Container>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          
          {/* ==========================================
              TAB 0: 4 NADA MANDARIN SECTION
             ========================================== */}
          {}
          {tabIndex === 0 && (
            <Stack spacing={4}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: 'rgba(30, 41, 59, 0.7)', border: '1px solid #334155', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <InfoIcon color="primary" sx={{ fontSize: 28, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                      Tentang 4 Nada Utama Bahasa Mandarin
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5, lineHeight: 1.6 }}>
                      Bahasa Mandarin adalah bahasa tonat (tonal language). Kata yang sama jika diucapkan dengan nada berbeda dapat memiliki arti yang sepenuhnya berbeda! Tekan 4 tombol nada di bawah untuk mendengarkan audio nada dan melihat kontur perubahannya.
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Volume2Icon sx={{ color: 'secondary.main' }} />
                  Klik 4 Tombol Nada untuk Mendengarkan Suara:
                </Typography>

                <Grid container spacing={2}>
                  {TONES.map((tone) => {
                    const isPlaying = activeTonePlaying === tone.id;
                    const isSelected = selectedTone.id === tone.id;

                    return (
                      <Grid size={{ xs:12, sm:6, md:3}} key={tone.id}>
                        <Card 
                          elevation={isSelected ? 8 : 2}
                          sx={{ 
                            border: `2px solid ${tone.color}`,
                            bgcolor: isSelected ? 'rgba(30, 41, 59, 0.9)' : 'background.paper',
                            transition: 'all 0.3s ease',
                            boxShadow: isSelected ? `0 0 16px ${tone.color}55` : undefined,
                            '&:hover': { transform: 'translateY(-4px)' }
                          }}
                        >
                          <CardActionArea 
                            onClick={() => {
                              setSelectedTone(tone);
                              playToneSound(tone);
                            }}
                            sx={{ p: 2.5 }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Chip 
                                label={`Nada ${tone.id}`} 
                                size="small"
                                sx={{ bgcolor: tone.color, color: '#fff', fontWeight: 'bold' }} 
                              />
                              <IconButton 
                                size="small" 
                                sx={{ bgcolor: isPlaying ? 'secondary.main' : 'rgba(255,255,255,0.08)' }}
                              >
                                <Volume2Icon fontSize="small" sx={{ color: isPlaying ? '#0f172a' : '#fff' }} />
                              </IconButton>
                            </Box>

                            <Paper elevation={0} sx={{ p: 1.5, mb: 2, bgcolor: '#090d16', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2 }}>
                              <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                  Contoh:
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: tone.color }}>
                                  {tone.markExample}
                                </Typography>
                              </Box>
                              <Box sx={{ width: 80, height: 48 }}>
                                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                  <path
                                    d={tone.pitchPath}
                                    fill="none"
                                    stroke={tone.color}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </Box>
                            </Paper>

                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>
                              {tone.nameZh}
                            </Typography>
                            <Typography variant="caption" sx={{ color: tone.color, fontWeight: 600, display: 'block', mb: 1 }}>
                              {tone.nameId}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', height: 36, overflow: 'hidden' }}>
                              {tone.description}
                            </Typography>

                            <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.1)' }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ color: tone.color, fontWeight: 600 }}>
                                Skala: {tone.contour}
                              </Typography>
                              <Chip 
                                icon={<PlayIcon style={{ fontSize: 14 }} />} 
                                label="Putar" 
                                size="small" 
                                variant="outlined"
                                sx={{ borderColor: tone.color, color: tone.color, height: 24 }}
                              />
                            </Box>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              {/* Pitch Level Chart */}
              <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <SparklesIcon sx={{ color: 'secondary.main' }} />
                  Diagram Skala Pitch Nada 5 Tingkat (五度标记法)
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
                  Skala 1 - 5 menunjukkan tinggi rendahnya nada suara manusia. (1 = Paling Rendah, 5 = Paling Tinggi)
                </Typography>

                <Grid container spacing={3} sx={{alignItems:"center"}}>
                  <Grid size={{ xs:12, md:6}}>
                    <Paper elevation={0} sx={{ p: 2, bgcolor: '#090d16', border: '1px solid #334155', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Tinggi (5)</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Diagram Perubahan Pitch</Typography>
                      </Box>
                      <svg viewBox="0 0 400 200" style={{ width: '100%', height: 180 }}>
                        {[5, 4, 3, 2, 1].map((level, i) => {
                          const y = 20 + i * 38;
                          return (
                            <g key={level}>
                              <line x1="30" y1={y} x2="380" y2={y} stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
                              <text x="10" y={y + 4} fill="#64748B" fontSize="12" fontWeight="bold">
                                {level}
                              </text>
                            </g>
                          );
                        })}
                        <path d="M 50,20 L 120,20" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                        <text x="75" y="14" fill="#EF4444" fontSize="11" fontWeight="bold">Tone 1 (55)</text>

                        <path d="M 140,96 Q 175,70 200,20" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                        <text x="175" y="45" fill="#10B981" fontSize="11" fontWeight="bold">Tone 2 (35)</text>

                        <path d="M 220,134 Q 250,172 280,58" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
                        <text x="240" y="145" fill="#3B82F6" fontSize="11" fontWeight="bold">Tone 3 (214)</text>

                        <path d="M 300,20 L 360,172" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
                        <text x="335" y="100" fill="#8B5CF6" fontSize="11" fontWeight="bold">Tone 4 (51)</text>
                      </svg>
                    </Paper>
                  </Grid>

                  <Grid size={{xs:12, md:6}}>
                    <Stack spacing={1.5}>
                      <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>mā (妈) - Ibu</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Nada 1: Datar tinggi mendatar</Typography>
                        </Box>
                      </Paper>
                      <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981' }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>má (麻) - Tanaman Rami / Kebas</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Nada 2: Suara bertanya naik</Typography>
                        </Box>
                      </Paper>
                      <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#3b82f6' }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>mǎ (马) - Kuda</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Nada 3: Turun rendah lalu naik</Typography>
                        </Box>
                      </Paper>
                      <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#0f172a', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#8b5cf6' }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>mà (骂) - Dimarahi / Memaki</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Nada 4: Turun tajam dan tegas</Typography>
                        </Box>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          )}

          {/* ==========================================
              TAB 1: PINYIN VOWELS AND CONSONANTS
             ========================================== */}
          {}
          {tabIndex === 1 && (
            <Stack spacing={4}>
              {/* Vowels Section */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="韵母" color="secondary" size="small" sx={{ fontWeight: 'bold' }} />
                  Huruf Vokal Pinyin (Yùnmǔ)
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
                  Klik pada setiap vokal untuk mendengarkan lafal pengucapannya.
                </Typography>

                <Stack spacing={3}>
                  {VOWELS.map((group, idx) => (
                    <Paper key={idx} elevation={2} sx={{ p: 2.5, bgcolor: 'background.paper', border: '1px solid #334155' }}>
                      <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 700, mb: 2 }}>
                        {group.category} <span style={{ color: '#64748b' }}>• {group.categoryZh}</span>
                      </Typography>
                      <Grid container spacing={1.5}>
                        {group.items.map((item, itemIdx) => (
                          <Grid size={{ xs:6, sm:4, md:2}} key={itemIdx}>
                            <Button
                              fullWidth
                              variant="outlined"
                              onClick={() => speakText(item.examplePinyin || item.pinyin)}
                              sx={{
                                p: 1.5,
                                borderColor: '#334155',
                                bgcolor: '#090d16',
                                textTransform: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '&:hover': { borderColor: 'secondary.main', bgcolor: '#1e293b' }
                              }}
                            >
                              <Typography variant="h5" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                                {item.pinyin}
                              </Typography>
                              {item.exampleZh && (
                                <Box sx={{ mt: 1, borderTop: '1px solid #334155', pt: 0.5, width: '100%', textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>
                                    {item.exampleZh}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                    ({item.examplePinyin})
                                  </Typography>
                                  <Typography variant="caption" noWrap sx={{ color: '#64748b', display: 'block' }}>
                                    {item.exampleMeaning}
                                  </Typography>
                                </Box>
                              )}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Consonants Section */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="声母" color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                  Huruf Konsonan Pinyin (Shēngmǔ)
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
                  Sistem konsonan pembuka kata dalam Hanyu Pinyin.
                </Typography>

                <Stack spacing={3}>
                  {CONSONANTS.map((group, idx) => (
                    <Paper key={idx} elevation={2} sx={{ p: 2.5, bgcolor: 'background.paper', border: '1px solid #334155' }}>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
                        {group.category} <span style={{ color: '#64748b' }}>• {group.categoryZh}</span>
                      </Typography>
                      <Grid container spacing={1.5}>
                        {group.items.map((item, itemIdx) => (
                          <Grid size={{xs:6, sm:3, md:1.7}} key={itemIdx}>
                            <Button
                              fullWidth
                              variant="outlined"
                              onClick={() => speakText(item.examplePinyin || item.pinyin)}
                              sx={{
                                p: 1.5,
                                borderColor: '#334155',
                                bgcolor: '#090d16',
                                textTransform: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '&:hover': { borderColor: 'primary.main', bgcolor: '#1e293b' }
                              }}
                            >
                              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                                {item.pinyin}
                              </Typography>
                              {item.exampleZh && (
                                <Box sx={{ mt: 1, borderTop: '1px solid #334155', pt: 0.5, width: '100%', textAlign: 'center' }}>
                                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>
                                    {item.exampleZh}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                    ({item.examplePinyin})
                                  </Typography>
                                  <Typography variant="caption" noWrap sx={{ color: '#64748b', display: 'block' }}>
                                    {item.exampleMeaning}
                                  </Typography>
                                </Box>
                              )}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Stack>
          )}

          {/* ==========================================
              TAB 2: PINYIN SYLLABLE BUILDER
             ========================================== */}
          {}
          {tabIndex === 2 && (
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>
                  Penggabung Konsonan + Vokal + Nada
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Pilih konsonan awal, vokal akhir, dan salah satu dari 4 nada untuk mendengarkan hasil gabungan pinyin!
                </Typography>
              </Box>

              {/* Combined Syllable Card */}
              <Paper 
                elevation={6}
                sx={{ 
                  p: 4, 
                  mb: 4, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: 4
                }}
              >
                <Chip 
                  label="Hasil Gabungan Pinyin" 
                  color="secondary" 
                  size="small" 
                  sx={{ fontWeight: 'bold', mb: 2 }} 
                />
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 900, 
                    my: 2, 
                    background: 'linear-gradient(90deg, #fde047, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {combinedPinyin}
                </Typography>
                
                {}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}  sx={{justifyContent:"center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<Volume2Icon />}
                    onClick={() => speakText(combinedPinyin)}
                    sx={{ fontWeight: 'bold', px: 3, py: 1.5, borderRadius: 3 }}
                  >
                    Putar Suara ({combinedPinyin})
                  </Button>
                  <audio ref={audioRef} src="/src/assets/sound/test.mp3" />
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={playAudio}
                    sx={{ fontWeight: 'bold', px: 3, py: 1.5, borderRadius: 3 }}
                  >
                    Dengarkan
                  </Button>
                </Stack>
              </Paper>

              {/* Selector Panels */}
              <Grid container spacing={3}>
                {/* Select Consonant */}
                <Grid size={{ xs:12, md:4}}>
                  <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid #334155' }}>
                    <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700, mb: 1.5 }}>
                      1. Pilih Konsonan (Shēngmǔ)
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, maxHeight: 240, overflowY: 'auto', pr: 0.5 }}>
                      {["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"].map((c) => (
                        <Button
                          key={c}
                          size="small"
                          variant={selectedConsonant === c ? "contained" : "outlined"}
                          color="primary"
                          onClick={() => setSelectedConsonant(c)}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {c}
                        </Button>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Select Vowel */}
                <Grid size={{ xs:12, md:4}}>
                  <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid #334155' }}>
                    <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1.5 }}>
                      2. Pilih Vokal (Yùnmǔ)
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, maxHeight: 240, overflowY: 'auto', pr: 0.5 }}>
                      {["a", "o", "e", "i", "u", "ü", "ai", "ei", "ui", "ao", "ou", "iu", "ie", "an", "en", "in", "ang", "eng", "ong"].map((v) => (
                        <Button
                          key={v}
                          size="small"
                          variant={selectedVowel === v ? "contained" : "outlined"}
                          color="secondary"
                          onClick={() => setSelectedVowel(v)}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {v}
                        </Button>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Select Tone */}
                <Grid size={{ xs:12, md:4}}>
                  <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid #334155' }}>
                    <Typography variant="subtitle2" sx={{ color: '#3b82f6', fontWeight: 700, mb: 1.5 }}>
                      3. Pilih Nada (1 - 4)
                    </Typography>
                    <Stack spacing={1}>
                      {TONES.map((t) => (
                        <Button
                          key={t.id}
                          variant={selectedBuilderTone === t.id ? "contained" : "outlined"}
                          onClick={() => setSelectedBuilderTone(t.id)}
                          sx={{ 
                            justifyContent: 'space-between', 
                            textTransform: 'none',
                            bgcolor: selectedBuilderTone === t.id ? '#2563eb' : 'transparent',
                            borderColor: '#334155'
                          }}
                        >
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>Nada {t.id} ({t.contour})</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>{t.nameZh}</Typography>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>{t.symbol}</Typography>
                        </Button>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* ==========================================
              TAB 3: QUIZ MODE
             ========================================== */}
          {}
          {tabIndex === 3 && (
            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>
                  Kuis Latihan Pendengaran Nada
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Dengarkan audio nada lalu tebak nada berapa yang diucapkan!
                </Typography>
              </Box>

              {/* Score Header */}
              <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AwardIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Skor Kamu:</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                    {quizScore} / {quizTotal}
                  </Typography>
                </Box>
                <Button 
                  size="small" 
                  startIcon={<RefreshIcon />} 
                  onClick={() => {
                    setQuizScore(0);
                    setQuizTotal(0);
                    generateNewQuizQuestion();
                  }}
                  sx={{ textTransform: 'none', color: 'text.secondary' }}
                >
                  Reset Skor
                </Button>
              </Paper>

              {/* Quiz Card */}
              <Paper elevation={4} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, textAlign: 'center' }}>
                <Chip label="Soal: Tebak Nada Dari Suara Berikut" variant="outlined" sx={{ mb: 3, fontWeight: 600 }} />

                <Box sx={{ my: 3 }}>
                  <IconButton
                    onClick={() => playToneSound(quizTone)}
                    sx={{
                      width: 90,
                      height: 90,
                      bgcolor: 'primary.main',
                      color: '#fff',
                      boxShadow: '0 0 24px rgba(239, 68, 68, 0.4)',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <Volume2Icon sx={{ fontSize: 44 }} />
                  </IconButton>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 1.5 }}>
                    Klik tombol audio di atas untuk mendengarkan nada
                  </Typography>
                </Box>

                {/* Feedback Alerts */}
                {quizFeedback === 'correct' && (
                  <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Benar! Itu adalah {quizTone.nameZh} (Nada {quizTone.id})
                  </Alert>
                )}
                {quizFeedback === 'wrong' && (
                  <Alert icon={<XCircleIcon fontSize="inherit" />} severity="error" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Masih Kurang Tepat! Coba dengarkan lagi.
                  </Alert>
                )}

                {/* Option Buttons */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {TONES.map((t) => (
                    <Grid size={{ xs:6}} key={t.id}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleQuizAnswer(t.id)}
                        sx={{
                          p: 2,
                          borderColor: '#334155',
                          justifyContent: 'space-between',
                          textTransform: 'none',
                          bgcolor: '#090d16',
                          '&:hover': { borderColor: t.color, bgcolor: '#1e293b' }
                        }}
                      >
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#fff' }}>
                            Nada {t.id}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {t.nameZh}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: t.color }}>
                          {t.symbol}
                        </Typography>
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {quizFeedback && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={generateNewQuizQuestion}
                    sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                  >
                    Soal Selanjutnya &rarr;
                  </Button>
                )}
              </Paper>
            </Box>
          )}

        </Container>

        {}
        <Box component="footer" sx={{ py: 3, borderTop: '1px solid #334155', bgcolor: '#090d16', mt: 'auto' }}>
          <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Hanyu Pinyin Learning Tool • 汉语拼音与四声学习 (Material UI)
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Web Speech API & Web Audio Oscillator Pitch Engine
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}