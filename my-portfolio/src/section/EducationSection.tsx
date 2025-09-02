import SectionTitle from "../components/SectionTitle";
import SectionReveal from "../components/SectionReveal";

function Item({
  period,
  title,
  desc,
}: {
  period: string;
  title: string;
  desc?: string;
}) {
  return (
    <li className="flex justify-center pb-5 last:pb-0">
      <div className="flex gap-8 w-full max-w-xl">
        {/* 기간 */}
        <p className="text-sm text-white/60 w-32 shrink-0">{period}</p>

        {/* 내용 */}
        <div className="flex-1">
          <p className="font-semibold text-white">{title}</p>
          {desc && <p className="text-sm text-white/60">{desc}</p>}
        </div>
      </div>
    </li>
  );
}

export default function EducationSection() {
  return (
    <SectionReveal
      className="mx-auto max-w-3xl px-6 py-32 text-left 
    "
    >
      <SectionTitle>교육 및 자격증</SectionTitle>

      {/* 교육 */}

      <ul className="text-white/85 mb-10 ">
        <Item
          period="2019 - 2023"
          title="대전대학교 중퇴"
          desc="컴퓨터공학과"
        />
        <Item
          period="2023 - 2025"
          title="한국교통대학교 편입"
          desc="소프트웨어학과"
        />
        <Item
          period="2025.01 - 08"
          title="LG U+ 유레카 2기"
          desc="프론트엔드 과정 부트캠프 수료"
        />
      </ul>

      {/* 자격증 */}

      <ul className="text-white/85">
        <Item period="2024.09.10" title="정보처리기사 취득" desc="" />
      </ul>
    </SectionReveal>
  );
}
