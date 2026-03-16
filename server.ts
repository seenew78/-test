import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jeil1234';

app.use(express.json());
app.use(cookieParser());

// --- 데이터 관리 (임시 파일 DB) ---
const DATA_FILE = path.join(process.cwd(), 'listings.json');

// 초기 데이터 로드
const getListings = () => {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  return [];
};

const saveListings = (listings: any) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(listings, null, 2));
};

// --- 인증 미들웨어 ---
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ message: '인증이 필요합니다.' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    req.user = user;
    next();
  });
};

// --- API Routes ---

// 1. 로그인 (회원가입은 아예 없음)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 24시간
    });
    return res.json({ success: true, message: '로그인 성공' });
  }

  res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' });
});

// 2. 로그아웃
app.post('/api/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

// 3. 매물 목록 조회 (공개)
app.get('/api/listings', (req, res) => {
  res.json(getListings());
});

// 4. 매물 등록 (관리자 전용)
app.post('/api/listings', authenticateToken, (req, res) => {
  const listings = getListings();
  const newListing = {
    ...req.body,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: Date.now()
  };
  listings.unshift(newListing);
  saveListings(listings);
  res.json(newListing);
});

// 5. 매물 수정 (관리자 전용)
app.put('/api/listings/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  let listings = getListings();
  const index = listings.findIndex((l: any) => l.id === id);
  
  if (index !== -1) {
    listings[index] = { ...listings[index], ...req.body };
    saveListings(listings);
    return res.json(listings[index]);
  }
  res.status(404).json({ message: '매물을 찾을 수 없습니다.' });
});

// 6. 매물 삭제 (관리자 전용)
app.delete('/api/listings/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  let listings = getListings();
  const filtered = listings.filter((l: any) => l.id !== id);
  
  if (listings.length !== filtered.length) {
    saveListings(filtered);
    return res.json({ success: true });
  }
  res.status(404).json({ message: '매물을 찾을 수 없습니다.' });
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
