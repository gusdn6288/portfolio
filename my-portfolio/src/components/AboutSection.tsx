export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 text-black">
      {/* 프로필 */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-36 h-44 rounded-xl overflow-hidden ring-1 ring-black/10 mb-4">
          {/* 이미지 교체 */}
          <img src="" alt="profile" className="h-full w-full object-cover" />
        </div>
        <button className="rounded-lg bg-black text-white text-xs px-3 py-1.5 hover:bg-black/80">
          응원에 한마디 적기
        </button>
      </div>

      {/* 인터뷰 */}
      <h3 className="text-2xl font-bold mb-4 text-center text-white">
        Interview
      </h3>
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="rounded-lg bg-gray-100 p-4 text-left">
          <p className="font-semibold mb-2">Q. 프론트엔드를 결정한 이유?</p>
          <p>
            대학교 캡스톤 디자인에서 처음 프로젝트를 경험했을 때, 실력이
            부족했던 저는 디자인을 담당하며 개발에는 소극적이었습니다. 하지만
            화면이 실제로 구현되고 동작하는 과정을 보며 큰 흥미와 성취감을
            느꼈습니다. 그 경험을 계기로 사용자와 직접 맞닿는 부분을 구현하는
            프론트엔드의 매력에 끌려, 전문적으로 배우고 성장하게 되었습니다.
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4 text-left">
          <p className="font-semibold mb-2">Q. 나를 표현한다면?</p>
          <p>
            저를 표현한다면 “어제보다 성장하는 사람”입니다. 저는 하루하루
            작게라도 배운 것을 기록하고 실천하며 꾸준히 발전하는 것을 중요하게
            생각합니다. 새로운 기술을 익히고 문제를 해결하는 과정에서 어제의
            저보다 한 걸음 더 나아가는 성장을 추구하고 있습니다. 이러한 태도가
            제 성장을 이끄는 원동력이라고 생각합니다.
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4 text-left">
          <p className="font-semibold mb-2">
            Q. 성장을 위해 어떤 노력을 하고 있는지?
          </p>
          <p>
            저는 성장을 위해 매일 꾸준히 1일 1블로그 작성으로 학습 내용을
            기록하고 있습니다. 또한 코딩테스트 문제를 풀며 문제 해결 능력을
            키우고, 예전 프로젝트 팀원들과의 스터디를 통해 새로운 기술을 함께
            학습하고 피드백을 나누고 있습니다. 이러한 습관을 통해 지속적으로
            학습하고 성장하는 개발자가 되기 위해 노력하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
