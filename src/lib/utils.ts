import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// v3 typography size-only 매크로를 font-size 그룹으로 등록한다.
// 이렇게 해야 cn('text-body5', 'text-[11px]') 같은 override 패턴에서
// 두 클래스가 동일 font-size 그룹으로 인식되어 마지막(`text-[11px]`)이 이긴다.
// (등록 안 하면 두 클래스가 모두 적용되고, outside-layer .text-body5 가
// @layer utilities 의 .text-\[11px\] 를 덮어씀 → override 무력화)
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5',
        'text-body1', 'text-body2', 'text-body3', 'text-body4', 'text-body5',
        'text-caption',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
