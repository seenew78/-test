import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const STORE_NAME = "listings";
const LISTINGS_KEY = "all";

// Initial listings data (used when store is empty)
const INITIAL_LISTINGS = [
  {
    id: "1",
    title: "해운대 엘시티 더샵 고층 오션뷰",
    type: "매매",
    category: "아파트",
    price: "35억 5,000만",
    location: "부산광역시 해운대구 중동",
    description:
      "해운대 최고의 랜드마크 엘시티 더샵입니다. 전면 오션뷰를 자랑하는 고층 매물로 내부 인테리어가 최상급입니다.",
    features: ["오션뷰", "풀옵션", "즉시입주", "주차편리"],
    imageUrl: "https://picsum.photos/seed/apartment1/800/600",
    area: "186㎡",
    floor: "75층 / 85층",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "2",
    title: "센텀시티 역세권 대형 상가 임대",
    type: "월세",
    category: "상가",
    price: "5,000 / 350",
    location: "부산광역시 해운대구 우동",
    description:
      "센텀시티역 도보 3분 거리의 초역세권 상가입니다. 유동인구가 매우 많아 프랜차이즈 카페나 음식점으로 추천드립니다.",
    features: ["역세권", "무권리", "유동인구많음", "코너상가"],
    imageUrl: "https://picsum.photos/seed/shop1/800/600",
    area: "120㎡",
    floor: "1층 / 15층",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "3",
    title: "광안리 해변가 신축 오피스텔 첫입주",
    type: "전세",
    category: "오피스텔",
    price: "2억 8,000만",
    location: "부산광역시 수영구 민락동",
    description:
      "광안대교 뷰가 보이는 신축 오피스텔입니다. 첫 입주 매물로 매우 깨끗하며 보안이 철저합니다.",
    features: ["신축", "광안대교뷰", "풀빌트인", "보안우수"],
    imageUrl: "https://picsum.photos/seed/officetel1/800/600",
    area: "45㎡",
    floor: "12층 / 20층",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "4",
    title: "마린시티 제니스 조망권 좋은 세대",
    type: "매매",
    category: "아파트",
    price: "22억 8,000만",
    location: "부산광역시 해운대구 우동",
    description:
      "마린시티 두산위브더제니스입니다. 광안대교와 요트경기장 조망이 일품인 세대입니다.",
    features: ["고급단지", "조망권우수", "커뮤니티시설", "철저한보안"],
    imageUrl: "https://picsum.photos/seed/apartment2/800/600",
    area: "157㎡",
    floor: "45층 / 80층",
    createdAt: Date.now() - 86400000 * 10,
  },
];

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    cookies[name] = rest.join("=");
  });
  return cookies;
}

function authenticate(req: Request): boolean {
  const cookies = parseCookies(req.headers.get("cookie"));
  const token = cookies["admin_token"];
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

async function getListings(): Promise<any[]> {
  const store = getStore(STORE_NAME);
  const data = await store.get(LISTINGS_KEY, { type: "json" }) as any[] | null;
  if (data) {
    return data;
  }
  // Initialize with default data
  await store.set(LISTINGS_KEY, JSON.stringify(INITIAL_LISTINGS));
  return INITIAL_LISTINGS;
}

async function saveListings(listings: any[]): Promise<void> {
  const store = getStore(STORE_NAME);
  await store.set(LISTINGS_KEY, JSON.stringify(listings));
}

function extractListingId(url: string): string | null {
  // URL path will be like /.netlify/functions/listings/abc123
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split("/").filter(Boolean);
  // parts: [".netlify", "functions", "listings", "abc123"]
  if (parts.length >= 4) {
    return parts[3];
  }
  return null;
}

export default async (req: Request, context: Context) => {
  const headers = { "Content-Type": "application/json" };
  const id = extractListingId(req.url);

  try {
    // GET /api/listings - public
    if (req.method === "GET") {
      const listings = await getListings();
      return new Response(JSON.stringify(listings), { headers });
    }

    // POST /api/listings - create (auth required)
    if (req.method === "POST" && !id) {
      if (!authenticate(req)) {
        return new Response(
          JSON.stringify({ message: "인증이 필요합니다." }),
          { status: 401, headers }
        );
      }
      const body = await req.json();
      const listings = await getListings();
      const newListing = {
        ...body,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
      };
      listings.unshift(newListing);
      await saveListings(listings);
      return new Response(JSON.stringify(newListing), { headers });
    }

    // PUT /api/listings/:id - update (auth required)
    if (req.method === "PUT" && id) {
      if (!authenticate(req)) {
        return new Response(
          JSON.stringify({ message: "인증이 필요합니다." }),
          { status: 401, headers }
        );
      }
      const body = await req.json();
      const listings = await getListings();
      const index = listings.findIndex((l: any) => l.id === id);
      if (index !== -1) {
        listings[index] = { ...listings[index], ...body };
        await saveListings(listings);
        return new Response(JSON.stringify(listings[index]), { headers });
      }
      return new Response(
        JSON.stringify({ message: "매물을 찾을 수 없습니다." }),
        { status: 404, headers }
      );
    }

    // DELETE /api/listings/:id - delete (auth required)
    if (req.method === "DELETE" && id) {
      if (!authenticate(req)) {
        return new Response(
          JSON.stringify({ message: "인증이 필요합니다." }),
          { status: 401, headers }
        );
      }
      const listings = await getListings();
      const filtered = listings.filter((l: any) => l.id !== id);
      if (listings.length !== filtered.length) {
        await saveListings(filtered);
        return new Response(JSON.stringify({ success: true }), { headers });
      }
      return new Response(
        JSON.stringify({ message: "매물을 찾을 수 없습니다." }),
        { status: 404, headers }
      );
    }

    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (err) {
    console.error("Listings API error:", err);
    return new Response(
      JSON.stringify({ message: "서버 내부 오류가 발생했습니다." }),
      { status: 500, headers }
    );
  }
};
