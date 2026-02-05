import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./comment";
import { Props } from "@/types/props";

// 일반적으로 함수에 파라미터를 넘기는건 데이터 전달용, Props를 넘기고 받는건 렌더링을 위한 리액트 전용 파라미터
export default async function Detail(props: Props) {
    const params = await props.params;
    const db = (await connectDB).db('baord');

    const result = await db.collection('post').findOne({
        _id: new ObjectId(params.id)
    });

    if (!result) return <div>게시글을 찾을 수 없습니다.</div>;

    return (
        <div>
            <h4>상세페이지임</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Comment id={result._id.toString()} />
        </div>
    )
}