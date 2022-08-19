import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const publishPost = async (postId) => {
        setPublishing(true);

        try {
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            setPublishing(false);

            return router.push(router.asPath);
        } catch (error) {
            return setPublishing(false);
        }
    };
    const deletePost = async (postId) => {
        setDeleting(true);

        try {
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            setDeleting(false);

            return router.push(router.asPath);
        } catch (error) {
            return setDeleting(false);
        }
    };
    return (
        <>
            <li>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                {!post.published ? (
                    <button type="button" onClick={() => publishPost(post.id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </button>
                ) : null}
                <button type="button" onClick={() => deletePost(post['id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </button>
            </li>
        </>
    );
}