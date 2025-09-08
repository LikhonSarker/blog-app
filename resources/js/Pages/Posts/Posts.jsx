import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAuthHeader = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/posts",
                {
                    headers: getAuthHeader(),
                }
            );
            setPosts(response.data.data || response.data);
        } catch (err) {
            setError("Failed to fetch posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            await axios.delete(`/api/posts/${id}`, {
                headers: getAuthHeader(),
            });
            setPosts((prev) => prev.filter((p) => p.id !== id));
            alert("Post deleted successfully.");
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

            <a
                href="/posts/create"
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >
                Create New Post
            </a>

            {loading && <p>Loading posts...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <ul>
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="border p-4 rounded mb-2 flex justify-between items-start"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">
                                {post.title}
                            </h2>
                            <p className="text-gray-700">
                                {post.body.substring(0, 200)}...
                            </p>
                            <p className="text-gray-500 text-sm">
                                Author: {post.user?.name || "Unknown"}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={`/posts/${post.id}/edit`}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </a>
                            <button
                                onClick={() => deletePost(post.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
