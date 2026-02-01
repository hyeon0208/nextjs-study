
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
// not-found.tsx는 특정 페이지를 찾을 수 없을 때 에러 페이지로 NextJs 규칙으로 예약된 에러 페이지.


export default function NotFound() {

    return (
        <div>
            <h1 className="red">페이지를 찾을 수 없습니다.</h1>
        </div>
    );
}
