/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Listing {
  id: string;
  title: string;
  type: '매매' | '전세' | '월세';
  category: '아파트' | '상가' | '오피스텔' | '빌라' | '토지';
  price: string;
  location: string;
  description: string;
  features: string[];
  imageUrl: string;
  area: string; // 면적 (m2)
  floor?: string; // 층수
  createdAt: number;
}

export interface SiteConfig {
  name: string;
  phone: string;
  address: string;
  email: string;
  representative: string;
  registrationNumber: string;
  themeColor: string;
  japaneseSupport: boolean;
}

export type Page = 'home' | 'listings' | 'detail' | 'contact' | 'admin';
