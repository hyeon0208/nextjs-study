// nextJS의 page.tsx는 집입점으로 해당 폴더에 오직 하나, 그리고 이 이름을 찾아 실행함.
// 컴포넌트 (여기서는 함수를 컴포넌트라 부름)는 파일 하나에 하나만 있어야함.
// 만약 하나의 컴포넌트가 너무 커진다면 Button.tsx와 같이 공통으로 사용되는 컴포넌트를 분리하여 사용할 수 있음.
// 컴포넌트는 export default로 내보내야함 생략시 라우팅되지 않음. (Next JS 규칙인듯)
// 컴포넌트 네이밍 규칙은 파스칼 케이스로 작성해야한다고함. (소문자로 시작하면 일반 HTML 태그로 인식한다고 함) - 자바로 치면 컴포넌트를 클래스처럼 생각하면 될 듯

export default function Home() {
  // return 위는 스크립트 코드 작성 공간이고, return 아래는 JSX 코드 작성 공간임.
  const name = "John";
  const link = "https://www.naver.com";
  const linkText = "naver";

  return (
    // return 시에는 항상 하나의 HTML 태그로 시작해서 하나의 HTML 태그로 끝나야함.
    <div>
      {/* css 적용할 때 class가 아닌 className을 사용해야함. */}
      <h1 className="red">Hello World</h1>
      {/* JSX 내에서는 {}를 사용해서 JS 코드를 사용할 수 있음. */}
      {/* style 속성에는 JS object 자료형을 사용해야함. */}
      <p style={{ color: "blue", fontSize: "20px" }}>my name is {name}</p> 
      <a href={link}>{linkText}</a>
      
    </div>
  );
}
