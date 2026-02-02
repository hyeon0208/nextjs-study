import { connectDB } from "@/util/database";
import Link from "next/link"
import DetailLink from "../detail/[id]/DetailLink";

export default async function List() {

    const db = (await connectDB).db('baord');
    const result = await db.collection('post').find().toArray();

    console.log(result)

    return (
        <div className="list-bg">
            {
                result.map((a, i) =>
                    <div className="list-item" key={i}>
                        {/* Link 태그도 prefetch 방식으로 동작한다고함 끄는건 prefetch={false} */}
                        {/* <Link href={`/detail/${a._id.toString()}`}>
                            <h4>{a.title}</h4>
                        </Link> */}
                        <h4>{a.title}</h4>
                        <p>{a.content}</p>
                        {/* id를 props로 전달 */}
                        <DetailLink id={a._id.toString()} />
                    </div>
                )
            }
        </div>
    )
} 