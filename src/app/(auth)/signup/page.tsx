"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { TextField } from "@/components/ui/TextField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setError("올바른 이메일 형식인지 확인해주세요");
      return;
    }
    setError("");
    router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex max-w-[500px] flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="text-headline-emphasis-28 text-gray-10">회원가입</h1>
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-7">
          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit} noValidate>
            <TextField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              error={error}
            />
            <Button type="submit">다음</Button>
          </form>
          <Divider>또는</Divider>
          <GoogleButton>Google 계정으로 시작</GoogleButton>
        </div>
        <div className="flex h-6 w-full items-center justify-center gap-2">
          <span className="text-label-15 text-gray-50">이미 계정이 있으신가요?</span>
          <Link href="/login" className="text-label-15 font-normal text-gray-30 underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
