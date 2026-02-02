'use client'

import Image from "next/image"
import foodImg from '/public/next.svg'
import { useState } from "react" // client 컴포넌트에서만 사용 가능

export default function List() {

  const 상품: string[] = ['토마토', '파스타', '코코넛']
  // const 수량: number[] = [20, 30, 10]

  // useState 문법: const [변수명, 변경함수] = useState(초기값)
  const [수량, 수량변경] = useState(new Array(상품.length).fill(0));// state를 사용하는 html 부분도 state가 변경되면 재렌더링됨 (변수는 새로고침해야함)

  {/* 리액트는 for 문 못쓰고 자바 스트림 처럼 map 을 사용해서 반복문 적용 가능 (파라미터는 2개까지 가능)*/ }
  // 리액트가 리스트를 구분하도록 하기 위해선 고유 key 값을 넣어줘야함.
  //   배열명.map((요소, 인덱스) => {
  //     <div key={i}>
  //       <h4>{item}</h4>
  //       <p>인덱스 번호는 {i}입니다.</p>
  //     </div>
  //   ))

  // const productStream = 상품.map((a, i) => (
  //   <div className="food" key={i}>
  //     <h4>{상품[i]} 수량 : {수량[i]}</h4>
  //   </div>
  // ))

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
            <span> 수량 : {수량[i]}</span>

            {/* ➕ 증가 버튼 */}
            <button onClick={() => { 
              // 중요한건 state 변경 함수를 사용할 때 기존 state와 같을 경우(참조 주소가 같은 경우) react가 상태 변경을 해주지 않음
              // 방법은 서로 다른 참조 주소를 갖도록 해야함
              // 1. 기존 배열을 복사해서 겉 포장지 object 객체만 다른 참조주소를 갖도록함 (Deep Copy 아님, 얕은 복사)
              const copy = [...수량];

              // 2. 복사된 판에서 내가 클릭한 놈(i번째)만 숫자를 바꿈
              copy[i] = copy[i] + 1;

              // 3. 수정된 복사본으로 전체 상태를 갈아끼움.
              수량변경(copy);
            }}> + </button>

            {/* ➖ 감소 버튼 */}
            <button onClick={() => {
              const copy = [...수량];

              if (copy[i] > 0) {
                copy[i]--; // 1 감소
                수량변경(copy); // 변경된 복사본으로 갈아끼움
              }

            }}> - </button>
          </div>
        ))
      }

      {/* 아래 처럼 만들어논 함수를 사용할 수도 있음 */}
      {/* {productStream} */}

    </div>
  );
}
