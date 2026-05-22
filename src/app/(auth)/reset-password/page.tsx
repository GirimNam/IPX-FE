"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

const resetPasswordSchema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
});

type ResetPasswordErrors = Partial<Record<keyof z.infer<typeof resetPasswordSchema>, string>>;

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ResetPasswordErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = resetPasswordSchema.safeParse({ email });
    if (!result.success) {
      const fieldErrors: ResetPasswordErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ResetPasswordErrors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    router.push(`/reset-password/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex flex-col gap-2">
        <h1 className="text-headline-emphasis-28 text-gray-10">비밀번호 재설정</h1>
        <h2 className="text-body-19 text-gray-30">
          이메일로 새 비밀번호를 설정할 수 있는 링크가 전송됩니다.
        </h2>
      </div>

      <form className="flex w-full flex-col gap-10" onSubmit={handleSubmit} noValidate>
        <TextField
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
        />
        <div className="flex flex-row gap-3">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            이전
          </Button>
          <Button type="submit" disabled={!email}>
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
