import { useState } from "react";
import authApi from "../apis/authAPI";
import { useNavigate } from "react-router";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await authApi.post("/login", form)
            const data = res.data
            console.log(res)
            if (!res.statusText == 'OK') {
                throw new Error(data.message || "Login failed");
            }

            console.log("SUCCESS:", data);

            // 👉 เก็บ token
            localStorage.setItem("token", data.user.token);

            // 👉 redirect
            navigate('/chat')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center">Login</h2>

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            className="input input-bordered"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            className="input input-bordered"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mt-4">
                        <button
                            className={`btn btn-primary ${loading ? "loading" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                    <p className="text-center text-sm mt-2">
                        ยังไม่มีบัญชี?{" "}
                        <a href="/register" className="link link-primary">
                            สมัครสมาชิก
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}