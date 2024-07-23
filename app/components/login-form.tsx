"use client";

import { useFormState } from "react-dom";
import { handleLogin } from '@/app/lib/actions';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(handleLogin, "");
    return (
        <form action={dispatch}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <div className="text-red-500">{errorMessage && <p>{errorMessage}</p>}</div>
            <button type="submit">Login</button>
        </form>
    );
}