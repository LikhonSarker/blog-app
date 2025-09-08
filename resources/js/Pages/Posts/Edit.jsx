import React, { useState, useEffect } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BackLogo from "@/Components/BackLogo";
import { Link } from "@inertiajs/react";

const Edit = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    const getAuthHeader = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const submit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.put(
                `/api/posts/${post.id}`,
                { title, body },
                { headers: getAuthHeader() }
            );
            alert("Post updated successfully!");
            Inertia.visit("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update post.");
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="container mx-auto p-4">
                                <Link onClick={() => window.history.back()}>
                                    <BackLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                                <h1 className="text-2xl font-bold mb-4">
                                    Edit Post
                                </h1>

                                {error && (
                                    <p className="text-red-600 mb-4">{error}</p>
                                )}

                                <form
                                    onSubmit={submit}
                                    className="flex flex-col gap-4"
                                >
                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            className="border p-2 w-full rounded"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Body
                                        </label>
                                        <textarea
                                            value={body}
                                            onChange={(e) =>
                                                setBody(e.target.value)
                                            }
                                            className="border p-2 w-full rounded"
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Update Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
