import React, { useState } from "react";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Mail, Lock, User as UserIcon } from "lucide-react";

interface AuthFormProps {
  onSubmit: (data: { email: string; password?: string; name?: string; isRegister: boolean }) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, name: isRegister ? name : undefined, isRegister });
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isRegister ? "Buat Akun Baru" : "Masuk ke Akun Anda"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isRegister
            ? "Mulai belajar AI terapan untuk produktivitas kerja."
            : "Lanjutkan progres belajar AI Anda."}
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {isRegister && (
          <div>
            <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <Input
              type="text"
              placeholder="Budi Santoso"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<UserIcon className="h-4 w-4" />}
              required
              className="mt-1"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            placeholder="budi@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-4 w-4" />}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="h-4 w-4" />}
            required
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full mt-6 py-2.5">
          {isRegister ? "Daftar" : "Masuk"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
        </span>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="font-semibold text-blue-600 hover:text-blue-500"
        >
          {isRegister ? "Masuk di sini" : "Daftar gratis"}
        </button>
      </div>
    </div>
  );
}
