import { useState } from "react";
import authApi from "../apis/authAPI";

export default function Register() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        if (!form.firstName) return "กรุณากรอกชื่อ";
        if (!form.lastName) return "กรุณากรอกนามสกุล";
        if (!form.email) return "กรุณากรอก email";
        if (!form.username) return "กรุณากรอก username";
        if (form.password.length < 6) return "password อย่างน้อย 6 ตัว";
        if (form.password !== form.confirmPassword)
            return "password ไม่ตรงกัน";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errMsg = validate();
        if (errMsg) return setError(errMsg);

        setLoading(true);
        setError("");

        try {
            const res = await authApi.post("/register", {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                username: form.username,
                password: form.password,
            });

            console.log("REGISTER SUCCESS:", res.data);

            window.location.href = "/login";
        } catch (err) {
            setError(err.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center">Create Account</h2>

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    {/* First Name */}
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="input input-bordered"
                        value={form.firstName}
                        onChange={handleChange}
                    />

                    {/* Last Name */}
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="input input-bordered"
                        value={form.lastName}
                        onChange={handleChange}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        className="input input-bordered"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        className="input input-bordered"
                        value={form.username}
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="input input-bordered"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {/* Confirm Password */}
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        className="input input-bordered"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    {/* Button */}
                    <button
                        className={`btn btn-primary mt-4 ${loading ? "loading" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}