import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // 관리자 페이지는 수집 거부
    },
    // 사이트맵 위치를 알려줌
    sitemap: 'https://www.mysite.com/sitemap.xml',
  };
}