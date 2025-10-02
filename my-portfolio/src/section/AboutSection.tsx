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
            과정에서 배우고, 과정에서 성장{" "}
          </p>
          <p className="text-white/80">
            개발을 통해 단순히 결과를 만드는 것에 그치지 않고, 과정 속에서
            배우고 성장하는 경험을 가장 큰 가치로 생각합니다. 새로운 시도와
            시행착오 속에서 얻은 배움이 곧 저를 더 나은 개발자로 이끌어간다고
            믿습니다. 비록 과정이 쉽지 않더라도, 그 길을 끝까지 걸어가는 힘이
            결국 저를 성장시킨다고 생각합니다.
          </p>
        </div>

        <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-left">
          <p className="font-semibold mb-2 text-white">함께 만드는 가치</p>
          <p className="text-white/80">
            프로젝트를 진행하면서 깨달은 것은 혼자 잘하는 것보다 함께 잘하는
            것이 더 큰 성과를 만든다는 점입니다. 때로는 개인의 역량이
            부족하더라도 신뢰와 소통이 된다면 더 큰 시너지를 낼 수 있습니다.
            저는 ‘함께 성장하는 경험’이야말로 개발의 가장 큰 가치라 믿고, 이를
            실천하는 팀원이 되고자 합니다.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
