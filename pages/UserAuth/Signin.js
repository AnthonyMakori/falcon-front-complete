import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        data
      );
      localStorage.setItem("token", response.data.token);
      router.push("/wishlist/wishlistpage");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">Sign In</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-white block">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-white block">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-white text-center mt-4">
        <p>Don&apos;t have an account? Sign up</p>
          <span
            className="text-red-400 cursor-pointer hover:underline"
            onClick={() => (window.location.href = "/UserAuth/Signup")}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
}
