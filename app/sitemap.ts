import { MetadataRoute } from 'next';

// 메타데이터가 각 페이지의 "명함"이라면, 사이트맵은 사이트 전체의 "안내 지도"
// 지도가 없으면 손님(로봇)이 우리 집 안방(중요 콘텐츠)을 못 찾고 그냥 돌아갈 수도 있음

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. 기준 주소 (layout.tsx의 metadataBase와 동일하게 설정)
    const baseUrl = 'https://www.mysite.com';

    // 2. 데이터 가져오기 (DB 연동 예시)
    // 실제로는 데이터베이스에서 모든 포스트를 fetch 해옴.
    // const products = await getProducts();
    const products = [
        { id: '1', updatedAt: new Date('2024-01-10') },
        { id: '2', updatedAt: new Date('2024-01-15') },
    ];

    const postUrls = products.map((product) => ({
        url: `${baseUrl}/post/${product.id}`, // 절대 경로로 작성
        lastModified: product.updatedAt,
        priority: 0.8, // 상품은 중간 정도 중요도
    }));

    // 3. 정적 페이지 (홈, 소개 등)
    const routes = ['', '/about'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        priority: 1.0, // 홈은 가장 높은 중요도
    }));

    return [...routes, ...postUrls];
}