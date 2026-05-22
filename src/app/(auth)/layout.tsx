import Image from "next/image";
import LogoIpxFigure from "@/components/icons/logo-ipx-figure.svg";
import LogoIpxChar from "@/components/icons/logo-ipx-char.svg";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <div className="relative w-1/2 overflow-hidden rounded-[20px] my-5 ml-5">
        <Image
          src="/img/img-auth-graphic.png"
          alt="auth graphic"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <LogoIpxFigure width={60} height={60} />
          <div className="flex flex-col gap-5">
            <p className="text-display-40">
              교차하는 가치 <br />
              새로운 연결
            </p>
            <p className="text-body-emphasis-19">
              IPX는 데이터 속에 고립된 기술과 그를 필요로 하는 기업을 <br />
              연결시키고 흩어진 정보를 하나로 모아 비즈니스 아이디어와 <br />
              성장의 시작을 만들어갑니다.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        <div className="pt-7 px-8">
          <LogoIpxChar width={64} height={20} />
        </div>
        <div className="flex flex-1 items-center justify-center px-20 py-15">{children}</div>
      </div>
    </div>
  );
}
