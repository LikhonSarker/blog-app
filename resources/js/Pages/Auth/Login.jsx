import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/react";
import { get } from "lodash";

import axios from "axios";
import { useEffect } from "react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login", {
                email: data.email,
                password: data.password,
            });

            localStorage.setItem("token", res.data.token);
            Inertia.visit("/dashboard");
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setData("errors", err.response.data.errors);
            } else {
                console.error("Login failed:", err);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        }
    }, []);

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <InputError
                message={get(data, "errors", "")}
                className="mb-2 font-bold"
            />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("register")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                    >
                        Register
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
