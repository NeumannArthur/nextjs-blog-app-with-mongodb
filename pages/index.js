import Head from 'next/head';
import { MongoClient } from 'mongodb';
import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    // let dev = process.env.NODE_ENV !== 'production';
    // let { DEV_URL, PROD_URL } = process.env;

    // let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
    // let data = await response.json();

    const client = await MongoClient.connect('mongodb+srv://Arthur:Mon130541Beiertheim@cluster0.qmdtv.mongodb.net/sample_posts?retryWrites=true&w=majority');
    const db = client.db();
    const data = await db.collection('posts');
    const post_list = await data.find().toArray();
    // console.log(post_list);


    return {
        props: {
            posts: post_list.map((post) => ({
                id: post._id.toString(),
                title: post.title,
                published: post.published,
                content: post.content,
                createdAt: post.createdAt
            }))
        },
    };
}