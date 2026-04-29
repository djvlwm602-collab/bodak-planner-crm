## 변경 요약
<!-- 무엇을 왜 바꿨는지 1~3줄 -->

## 변경 영향
- [ ] 시각 변화 없음 (diff 0)
- [ ] 시각 변화 있음 (의도된 디자인 변경 — baseline 갱신 포함)

## 디자인 시스템 영향 (해당 시)

### 신규 토큰 추가
- [ ] DESIGN_SYSTEM.md § 12 결정 트리 통과 (Tier 2 우선, 도메인은 차순위)
- [ ] 네이밍 컨벤션 (§ 11) 준수 — prefix/suffix 룰
- [ ] @brand-free / @brand-safe / @reserved 주석 명시
- [ ] 즉시 사용처 있음 (없으면 @reserved 명시)
- [ ] DESIGN_SYSTEM.md 해당 섹션 갱신
- [ ] § 13 Tailwind 유틸 매핑 표 갱신
- [ ] design-system.html 시각화 추가
- [ ] npm run lint:tokens 통과

### 토큰 삭제 / 리네이밍
- [ ] lint:tokens 미사용 확인 (또는 @deprecated alias 1년 유예)
- [ ] DESIGN_SYSTEM.md § 6.4 / § 13 갱신
- [ ] design-system.html 갱신

### 컴포넌트 변경
- [ ] hex 직박이 0건 (토큰만 사용)
- [ ] Tailwind preset (gray-*/blue-* 등) 신규 추가 없음 — § 5.4 정책

## 검증
- [ ] npm run snapshot 통과 (또는 의도된 변화 baseline 갱신)
- [ ] diff 결과 또는 스크린샷 첨부

## 화이트레이블 영향 (해당 시)
- [ ] @brand-free 토큰 변경 — sample brand 빌드 시각 spot-check 완료
- [ ] WHITE_LABEL.md 체크리스트 갱신 (필요 시)

## 관련 문서
<!-- DESIGN_SYSTEM.md / SCOPE.md / WHITE_LABEL.md 중 갱신된 섹션 링크 -->
