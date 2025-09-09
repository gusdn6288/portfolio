import SectionReveal from "../components/SectionReveal";
// 이미지 import
import profileImg from "../assets/asd.png";

export default function AboutSection() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-6 py-24">
      {/* 프로필 */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-36 h-44 rounded-xl overflow-hidden ring-1 ring-white/10 mb-4 bg-white/5">
          <img
            src={profileImg}
            alt="profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 인터뷰 */}
      <h3 className="text-2xl font-bold mb-6 text-center text-white">
        Interview
      </h3>

      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-left">
          <p className="font-semibold mb-2 text-white">
            Q. 프론트엔드를 결정한 이유?
          </p>
          <p className="text-white/80">
            대학교 캡스톤 디자인 프로젝트에서 처음 개발을 경험했을 때, 실력이
            부족해 UI/UX를 담당했습니다. 화면이 실제로 구현되고 동작하는 과정을
            지켜보며 개발의 즐거움과 성취감을 느꼈고, 이를 계기로 사용자 경험을
            직접 만들어가는 프론트엔드의 매력에 빠져 본격적으로 배우고 성장하게
            되었습니다.
          </p>
        </div>

        <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-left">
          <p className="font-semibold mb-2 text-white">Q. 나를 표현한다면?</p>
          <p className="text-white/80">
            “여기까지는 누구나 한다, 지금부터 시작이다.” 저는 개발에 어려움이
            생기거나 힘들 때마다 이 말을 마음에 새기며 한 걸음 더 나아가고
            있습니다.
          </p>
        </div>

        <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-left">
          <p className="font-semibold mb-2 text-white">
            Q. 성장을 위해 어떤 노력을 하고 있는지?
          </p>
          <p className="text-white/80">
            저는 성장을 위해 꾸준히 블로그 작성으로 학습 내용을 기록하고
            있습니다. 또한 코딩테스트 문제를 풀며 문제 해결 능력을 키우고, 예전
            프로젝트 팀원들과의 스터디를 통해 새로운 기술을 함께 학습하고
            피드백을 나누고 있습니다. 이러한 습관을 통해 지속적으로 학습하고
            성장하는 개발자가 되기 위해 노력하고 있습니다.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
