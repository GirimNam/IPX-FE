"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "문자, 숫자, 기호 조합 8자 이상 입력해주세요"),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 입력해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type NewPasswordErrors = Partial<Record<"password" | "passwordConfirm", string>>;

export default function NewPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<NewPasswordErrors>({});

  const handleSubmit = () => {
    const result = newPasswordSchema.safeParse({ password, passwordConfirm });
    if (!result.success) {
      const fieldErrors: NewPasswordErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof NewPasswordErrors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    router.push("/reset-password/complete");
  };

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex flex-col gap-2">
        <h1 className="text-headline-emphasis-28 text-gray-10">비밀번호 재설정</h1>
        <h2 className="text-body-19 text-gray-30">
          이메일로 새 비밀번호를 설정할 수 있는 링크가 전송됩니다.
        </h2>
      </div>
      <div className="flex w-full flex-col items-start gap-4">
        <PasswordField
          label="비밀번호"
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
        />
        <PasswordField
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            if (errors.passwordConfirm)
              setErrors((prev) => ({ ...prev, passwordConfirm: undefined }));
          }}
          error={errors.passwordConfirm}
        />
      </div>
      <div className="flex w-full gap-3">
        <Button variant="secondary" onClick={() => router.back()}>
          이전
        </Button>
        <Button variant="primary" disabled={!password || !passwordConfirm} onClick={handleSubmit}>
          재설정
        </Button>
      </div>
    </div>
  );
}
