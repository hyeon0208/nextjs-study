import { connectDB } from "@/util/database";
import ListItem from "./listItem";
import { Post } from "@/types/post";

export default async function List() {

    const db = (await connectDB).db('baord');
    const rawData = await db.collection('post').find().toArray();

    const result: Post[] = rawData.map((item) => ({
        _id: item._id.toString(), 
        title: item.title,
        content: item.content,
    }));

    return (
        <div className="list-bg">
            <ListItem result={result} />
        </div>
    )
} 