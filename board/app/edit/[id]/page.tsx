import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import EditForm from "../EditForm";

type Props = {
    params: Promise<{ id: string }>;
};

// 여전히 async 서버 컴포넌트입니다.
export default async function Edit(props: Props) {
    const params = await props.params;
    const db = (await connectDB).db('baord');
    const result = await db.collection('post').findOne({ _id: new ObjectId(params.id) });

    if (!result) {
        return <div>게시물을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="p-20">
            <h4>수정페이지</h4>
            <EditForm
                id={result._id.toString()}
                defaultTitle={result.title}
                defaultContent={result.content}
            />
        </div>
    )
}