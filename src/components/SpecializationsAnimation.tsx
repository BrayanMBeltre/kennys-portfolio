import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  specializations: string[];
};
export const SpecializationsAnimation = (props: Props) => {
  const container = useRef<HTMLUListElement | null>(null);

  const specializations = props.specializations;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
      });

      const movement = 20;
      const duration = 2.15;

      for (let index = 0; index < specializations.length; index++) {
        tl.to(`#specialization-${index}`, {
          keyframes: {
            opacity: [0, 0, 1, 1, 1, 1, 0, 0],
            y: [movement, movement, 0, 0, 0, 0, -movement, -movement],
          },
          duration,
          delay: -0.5,
        });
      }
    },
    { scope: container }
  );

  return (
    <ul ref={container} className="relative h-[28px]">
      {specializations.map((specialization, index) => {
        return (
          <li
            key={`specialization-${index}`}
            id={`specialization-${index}`}
            className={"italic font-medium text-xl absolute opacity-0"}
          >
            {specialization}
          </li>
        );
      })}
    </ul>
  );
};
