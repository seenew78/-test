/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  Building2, 
  Home as HomeIcon, 
  Store, 
  LandPlot, 
  Plus, 
  Trash2, 
  Edit, 
  ArrowLeft,
  Share2,
  Globe,
  CheckCircle2,
  Instagram,
  Facebook,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG, INITIAL_LISTINGS } from './constants';
import { Listing, Page } from './types';

// --- Components ---

const Header = ({ currentPage, setPage, isLoggedIn }: { currentPage: Page, setPage: (p: Page) => void, isLoggedIn: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: '홈', value: 'home' },
    { label: '매물보기', value: 'listings' },
    { label: '문의하기', value: 'contact' },
  ];

  // 로그인된 경우에만 관리자 메뉴 추가
  if (isLoggedIn) {
    navItems.push({ label: '관리자', value: 'admin' });
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setPage('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white mr-3 shadow-lg shadow-primary/20">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{SITE_CONFIG.name}</h1>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-widest">Global Real Estate</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setPage(item.value)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.value ? 'text-primary' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn && (
              <button 
                onClick={() => setPage('login')}
                className="text-xs font-bold text-slate-400 hover:text-primary transition-colors"
              >
                관리자 로그인
              </button>
            )}
            <a 
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
            >
              <Phone size={16} className="mr-2" />
              {SITE_CONFIG.phone}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setPage(item.value);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left text-lg font-medium ${
                    currentPage === item.value ? 'text-primary' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a 
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center text-primary font-bold text-lg pt-4 border-t border-slate-50"
              >
                <Phone size={20} className="mr-2" />
                {SITE_CONFIG.phone}
              </a>
              {!isLoggedIn && (
                <button 
                  onClick={() => {
                    setPage('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-bold text-slate-400 pt-2"
                >
                  관리자 로그인
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white mr-3">
              <Building2 size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{SITE_CONFIG.name}</h2>
          </div>
          <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
            부산광역시 선정 글로벌 공인중개사로서 정직과 신뢰를 바탕으로 최상의 매물을 연결해 드립니다. 
            일본어 중개 상담이 가능하며, 외국인 고객님들을 위한 전문적인 서비스를 제공합니다.
          </p>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
              <MessageCircle size={18} />
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-6">고객센터</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <Phone size={16} className="mr-3 text-primary shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex items-start">
              <Mail size={16} className="mr-3 text-primary shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.email}</span>
            </li>
            <li className="flex items-start">
              <MapPin size={16} className="mr-3 text-primary shrink-0 mt-0.5" />
              <span>{SITE_CONFIG.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">사업자 정보</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li>대표: {SITE_CONFIG.representative}</li>
            <li>등록번호: {SITE_CONFIG.registrationNumber}</li>
            <li>상담시간: 평일 09:00 - 19:00</li>
            <li>(토요일 10:00 - 16:00, 일요일 휴무)</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500">© 2024 {SITE_CONFIG.name}. All rights reserved. Designed for Excellence.</p>
        <button 
          onClick={() => window.location.href = '/jeil-boss-door'}
          className="text-[10px] text-slate-600 hover:text-slate-400 transition-colors"
        >
          관리자 로그인
        </button>
      </div>
    </div>
  </footer>
);

const ListingCard: React.FC<{ listing: Listing, onClick: () => void }> = ({ listing, onClick }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={listing.imageUrl} 
        alt={listing.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">
          {listing.type}
        </span>
        <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-full">
          {listing.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center text-slate-400 text-xs mb-2">
        <MapPin size={12} className="mr-1" />
        {listing.location}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-1 group-hover:text-primary transition-colors">
        {listing.title}
      </h3>
      <div className="text-xl font-black text-primary mb-4">
        {listing.price}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {listing.features.slice(0, 3).map((f, i) => (
          <span key={i} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-medium rounded border border-slate-100">
            {f}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Pages ---

const HomePage = ({ setPage, listings, setSelectedListing }: { setPage: (p: Page) => void, listings: Listing[], setSelectedListing: (l: Listing) => void }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/busan-city/1920/1080" 
            className="w-full h-full object-cover brightness-50"
            alt="Busan Cityscape"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-sm font-bold mb-6">
              <Globe size={16} className="mr-2" />
              부산시 선정 글로벌 공인중개사 (일본어 상담 가능)
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              부산의 가치를 <br />
              <span className="text-primary">제일</span> 먼저 만나다
            </h2>
            <p className="text-lg text-slate-200 mb-10 leading-relaxed max-w-lg">
              해운대, 수영구, 남구 등 부산 전지역 프리미엄 매물 전문. 
              당신의 소중한 자산, 전문가의 안목으로 연결해 드립니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setPage('listings')}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 flex items-center justify-center"
              >
                매물 보러가기
                <ChevronRight size={20} className="ml-2" />
              </button>
              <button 
                onClick={() => setPage('contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center"
              >
                상담 신청하기
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '누적 거래액', value: '1.2조+' },
              { label: '보유 매물', value: '2,500+' },
              { label: '고객 만족도', value: '99%' },
              { label: '전문 중개사', value: '15명' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">추천 매물</h2>
              <p className="text-slate-500">제일부동산이 엄선한 부산 최고의 프리미엄 매물입니다.</p>
            </div>
            <button 
              onClick={() => setPage('listings')}
              className="hidden md:flex items-center text-primary font-bold hover:underline"
            >
              전체보기 <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.slice(0, 3).map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                onClick={() => {
                  setSelectedListing(listing);
                  setPage('detail');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Global Support Banner */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20">
          <Globe size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-xl">
              <h2 className="text-3xl font-black mb-6">Global Real Estate Service</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                부산시에서 선정한 글로벌 공인중개사 사무소로서, 일본어 능통자가 상주하여 
                외국인 투자자 및 거주자분들께 완벽한 중개 서비스를 제공합니다.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <CheckCircle2 size={20} className="mr-2 text-white" />
                  <span className="font-bold">일본어 상담 가능</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 size={20} className="mr-2 text-white" />
                  <span className="font-bold">외국인 투자 자문</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
              <div className="text-white text-center">
                <p className="text-sm font-medium mb-2 opacity-80">日本語でお気軽にお問い合わせください</p>
                <p className="text-3xl font-black mb-6">051-123-4567</p>
                <button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  상담 예약하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ListingsPage = ({ listings, setSelectedListing, setPage }: { listings: Listing[], setSelectedListing: (l: Listing) => void, setPage: (p: Page) => void }) => {
  const [filter, setFilter] = useState<string>('전체');
  const [search, setSearch] = useState('');

  const filteredListings = useMemo(() => {
    return listings.filter(l => {
      const matchesFilter = filter === '전체' || l.category === filter;
      const matchesSearch = l.title.includes(search) || l.location.includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [listings, filter, search]);

  return (
    <div className="py-16 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-6">매물 검색</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="지역명, 아파트명으로 검색하세요"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {['전체', '아파트', '상가', '오피스텔', '빌라', '토지'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    filter === cat 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-slate-500 font-medium">총 <span className="text-primary">{filteredListings.length}</span>개의 매물이 있습니다.</p>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredListings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                onClick={() => {
                  setSelectedListing(listing);
                  setPage('detail');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-slate-500">다른 검색어나 필터를 선택해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailPage = ({ listing, setPage }: { listing: Listing | null, setPage: (p: Page) => void }) => {
  if (!listing) return null;

  return (
    <div className="py-12 bg-slate-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setPage('listings')}
          className="flex items-center text-slate-500 font-bold mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          목록으로 돌아가기
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Image and Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <img 
                src={listing.imageUrl} 
                alt={listing.title} 
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-full">
                  {listing.type}
                </span>
                <span className="px-4 py-1.5 bg-slate-900 text-white text-sm font-bold rounded-full">
                  {listing.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{listing.title}</h1>
              <div className="flex items-center text-slate-500 mb-8">
                <MapPin size={18} className="mr-2 text-primary" />
                {listing.location}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-100 mb-8">
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">매매가</div>
                  <div className="text-xl font-black text-primary">{listing.price}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">전용면적</div>
                  <div className="text-xl font-black text-slate-900">{listing.area}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">해당층</div>
                  <div className="text-xl font-black text-slate-900">{listing.floor || '-'}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">등록일</div>
                  <div className="text-xl font-black text-slate-900">{new Date(listing.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">매물 설명</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">주요 특징</h3>
                <div className="flex flex-wrap gap-3">
                  {listing.features.map((f, i) => (
                    <div key={i} className="flex items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 font-medium">
                      <CheckCircle2 size={16} className="mr-2 text-primary" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 sticky top-32">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-400 overflow-hidden">
                  <img src="https://picsum.photos/seed/agent/200/200" alt="Agent" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{SITE_CONFIG.representative} 대표</h3>
                <p className="text-sm text-slate-500">제일부동산 공인중개사</p>
              </div>

              <div className="space-y-4 mb-8">
                <a 
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  <Phone size={20} className="mr-2" />
                  전화 상담하기
                </a>
                <button 
                  onClick={() => setPage('contact')}
                  className="flex items-center justify-center w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all"
                >
                  <Mail size={20} className="mr-2" />
                  문의 메시지 보내기
                </button>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>매물 공유하기</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100"><Share2 size={16} /></button>
                    <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 text-[#3b5998]"><Facebook size={16} /></button>
                    <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 text-[#FEE500]"><MessageCircle size={16} /></button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  매물번호: {listing.id} | {SITE_CONFIG.registrationNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-white animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-6">상담 문의</h2>
          <p className="text-lg text-slate-500">
            매물에 대해 궁금하신 점이 있으신가요? <br />
            아래 양식을 작성해 주시면 담당자가 신속하게 연락드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="bg-slate-50 rounded-3xl p-10 h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">연락처 정보</h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mr-6 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">대표번호</div>
                    <div className="text-xl font-bold text-slate-900">{SITE_CONFIG.phone}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mr-6 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">이메일</div>
                    <div className="text-xl font-bold text-slate-900">{SITE_CONFIG.email}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mr-6 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">사무실 위치</div>
                    <div className="text-xl font-bold text-slate-900 leading-relaxed">{SITE_CONFIG.address}</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-200">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                  <Globe size={16} className="mr-2" />
                  Global Support
                </div>
                <p className="text-slate-600 font-medium">
                  日本語での相談も承っております。お気軽にご連絡ください。
                </p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-primary rounded-3xl p-12 text-center h-full flex flex-col justify-center items-center"
              >
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">문의가 접수되었습니다!</h3>
                <p className="text-slate-500 mb-8">확인 후 빠른 시일 내에 연락드리겠습니다. 감사합니다.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
                >
                  새 문의 작성하기
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">성함</label>
                    <input 
                      required
                      type="text" 
                      placeholder="홍길동"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="010-0000-0000"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">문의 유형</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                    <option>매물 매수/임차 문의</option>
                    <option>매물 매도/임대 의뢰</option>
                    <option>기타 일반 상담</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">문의 내용</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="관심 있는 매물이나 상담 내용을 자유롭게 적어주세요."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  ></textarea>
                </div>
                <div className="flex items-start gap-3 mb-6">
                  <input type="checkbox" required className="mt-1 w-4 h-4 accent-primary" />
                  <span className="text-xs text-slate-500 leading-relaxed">
                    개인정보 수집 및 이용에 동의합니다. (상담 목적으로만 사용됩니다.)
                  </span>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                >
                  상담 신청하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ listings, setListings, onLogout }: { listings: Listing[], setListings: (l: Listing[]) => void, onLogout: () => void }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Listing>>({
    title: '',
    type: '매매',
    category: '아파트',
    price: '',
    location: '',
    description: '',
    features: [],
    area: '',
    floor: '',
    imageUrl: 'https://picsum.photos/seed/new/800/600'
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/listings/${editingId}` : '/api/listings';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const savedListing = await response.json();
        if (editingId) {
          setListings(listings.map(l => l.id === editingId ? savedListing : l));
        } else {
          setListings([savedListing, ...listings]);
        }
        setIsAdding(false);
        setEditingId(null);
        setFormData({ title: '', type: '매매', category: '아파트', price: '', location: '', description: '', features: [], area: '', floor: '', imageUrl: 'https://picsum.photos/seed/new/800/600' });
      } else {
        alert('저장에 실패했습니다. 권한을 확인하세요.');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setListings(listings.filter(l => l.id !== id));
        } else {
          alert('삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const startEdit = (listing: Listing) => {
    setFormData(listing);
    setEditingId(listing.id);
    setIsAdding(true);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">관리자 대시보드</h2>
            <p className="text-slate-500">매물을 등록하고 관리할 수 있습니다.</p>
          </div>
          <div className="flex gap-4">
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                <Plus size={20} className="mr-2" />
                새 매물 등록
              </button>
            )}
            <button 
              onClick={onLogout}
              className="px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition-all"
            >
              로그아웃
            </button>
          </div>
        </div>
        {/* ... (기본 테이블 및 폼 UI는 유지) ... */}
        {isAdding ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">
                {editingId ? '매물 수정' : '새 매물 등록'}
              </h3>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">매물 제목</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">위치 (지역)</label>
                  <input 
                    required
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">거래 유형</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  >
                    <option>매매</option>
                    <option>전세</option>
                    <option>월세</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">매물 종류</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  >
                    <option>아파트</option>
                    <option>상가</option>
                    <option>오피스텔</option>
                    <option>빌라</option>
                    <option>토지</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">가격</label>
                  <input 
                    required
                    type="text" 
                    placeholder="예: 5억 2,000만"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">면적</label>
                  <input 
                    required
                    type="text" 
                    placeholder="예: 84㎡"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">상세 설명</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => { setIsAdding(false); setEditingId(null); }}
                  className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  {editingId ? '수정 완료' : '매물 등록'}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">매물정보</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">유형/종류</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">가격</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">등록일</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={l.imageUrl} className="w-12 h-12 rounded-lg object-cover mr-4" referrerPolicy="no-referrer" />
                          <div>
                            <div className="font-bold text-slate-900">{l.title}</div>
                            <div className="text-xs text-slate-400">{l.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">{l.type}</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">{l.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{l.price}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(l.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => startEdit(l)}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(l.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting login...');
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        onLogin();
      } else {
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('Login fetch error:', err);
      setError('서버 연결 오류: 서버가 응답하지 않거나 네트워크 문제가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-primary/20">
            <Building2 size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">관리자 로그인</h2>
          <p className="text-slate-500 mt-2">비밀의 문에 오신 것을 환영합니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">아이디</label>
            <input 
              required
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <button 
            type="submit"
            className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
          >
            입장하기
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 숨겨진 경로 감지
  useEffect(() => {
    if (window.location.pathname === '/jeil-boss-door') {
      setPage('login');
    }
  }, []);

  // 데이터 로드 (백엔드 API 사용)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        setListings(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchListings();
  }, []);

  // 로그인 상태 체크 (간단하게 세션 스토리지 사용하거나 쿠키 존재 여부로 판단 가능)
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    setPage('admin');
    window.history.pushState({}, '', '/'); // URL 청소
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} listings={listings} setSelectedListing={setSelectedListing} />;
      case 'listings':
        return <ListingsPage listings={listings} setSelectedListing={setSelectedListing} setPage={setPage} />;
      case 'detail':
        return <DetailPage listing={selectedListing} setPage={setPage} />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'admin':
        return isLoggedIn ? (
          <AdminDashboard listings={listings} setListings={setListings} onLogout={handleLogout} />
        ) : (
          <HomePage setPage={setPage} listings={listings} setSelectedListing={setSelectedListing} />
        );
      default:
        return <HomePage setPage={setPage} listings={listings} setSelectedListing={setSelectedListing} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={page} setPage={setPage} isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
