import { Metadata } from 'next';

// 해당 프로퍼티는 해당 파일(.tsx) 안에서만 유효 (만약 다른 파일에서도 이 Props 타입을 쓰고 싶다면 앞에 export를 붙여서 내보냄)
// generateMetadata 함수로 전달되는 속성값을 정의
// 폴더 이름을 대괄호로 감싼 [id]라고 지었다면, 코드의 params 객체 안에도 반드시 id라는 이름으로 들어옴
type Props = {
    params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
    // const res = await fetch(`https://your-real-api.com/products/${id}`);
    // return res.json();

    return {
        title: `멋진 상품 ${id}`,
        description: `이 상품은 ID ${id}를 가진 최고의 상품입니다.`,
    };
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // params를 unwrap(await) 합니다.
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const product = await getProduct(id);

    return {
        alternates: {
            canonical: `/product/${id}`, // 앞에 도메인을 안 붙여도 됨
        },
        openGraph: {
            url: `/product/${id}`,      // 알아서 https://mysite.com/product/1 로 변환됨
            images: "/thumbnail.png", // 알아서 https://mysite.com/thumbnail.png 로 변환됨
        },
        title: `${product.title} 최저가 구매하기`,
        description: product.description,
    };
}

// 실제 페이지 컴포넌트
export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <main>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
        </main>
    );
}