import Image from "next/image"
import foodImg from '/public/next.svg'

export default function List() {

  const 상품: string[] = ['토마토', '파스타', '코코넛']
  const 수량: number[] = [20, 30, 10]

  {/* 리액트는 for 문 못쓰고 자바 스트림 처럼 map 을 사용해서 반복문 적용 가능 (파라미터는 2개까지 가능)*/ }
  // 리액트가 리스트를 구분하도록 하기 위해선 고유 key 값을 넣어줘야함.
  //   배열명.map((요소, 인덱스) => {
  //     <div key={i}>
  //       <h4>{item}</h4>
  //       <p>인덱스 번호는 {i}입니다.</p>
  //     </div>
  //   ))

  const productStream = 상품.map((a, i) => (
    <div className="food" key={i}>
      <h4>{상품[i]} 수량 : {수량[i]}</h4>
    </div>
  ))

  return (
    <div>
      <h4 className="title">상품 목록</h4>

      {/* 중괄호로 함수를 감싸는 이유는 스크립트 실행 역역을 선언하는 기호 */}
      {
        상품.map((a, i) => (
          <div className="food" key={i}>
            {/* /로 시작하는 경로는 무조건 public 폴더를 루트로 간주함, 스프링으로 치면 resources폴더가 루트가 되는 것 같은 */}
            <img src="/next.svg" className="food-img" />
            {/* 위 이미지 태그는 이미지 파일을 있는 그대로 보여주지만 Next의 Image 컴포넌트를 사용하면 모바일, 데스크탑에 따라 크기 조절 및 레이지 로딩 적용해줌 */}
            {/* <Image src={foodImg} alt="음식 사진" /> */}
            {/* 주의할점은 외부 이미지를 가져와서 경로를 입력할 때는 실제 크기를 알 수 없어서 idth와 height를 반드시 명시해야 함 + next.config.js도 추가 세팅 필요 */}
            {/* <Image src="/https://s3.amazonaws.com/my-bucket/image.png" width={500} height={500} /> */}
            <h4>{상품[i]} 수량 : {수량[i]}</h4>
          </div>
        ))
      }

      {/* 아래 처럼 만들어논 함수를 사용할 수도 있음 */}
      {productStream}

    </div>
  );
}
