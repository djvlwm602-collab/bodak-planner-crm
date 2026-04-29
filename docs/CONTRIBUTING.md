# Contributing

## 디자인 시스템 토큰 추가 절차

신규 색상·토큰을 추가할 때:

1. [`DESIGN_SYSTEM.md § 12`](../DESIGN_SYSTEM.md) 결정 트리 통과
   - Tier 2 우선 검토, 도메인 토큰은 차순위
2. [`§ 11`](../DESIGN_SYSTEM.md) 네이밍 컨벤션 준수
   - `bg-*` / `text-*` / `border-*` / `button-*` / `status-*` / `chart-*` 등 prefix
3. `@brand-free` / `@brand-safe` / `@reserved` 주석 명시
4. `src/styles/tokens.css` + `src/index.css @theme` 양쪽 갱신
5. `design-system.html` 시각화 추가
6. `npm run lint:tokens` 통과 (전체 미사용 audit)
7. **`npm run lint:tokens:check` 통과** (Phase 8-F PR 시점 강제 — 신규 토큰 사용처 / `@reserved` / `@deprecated` 분류)
8. PR 템플릿 체크리스트 모두 통과

## 신규 화이트레이블 브랜드 추가

[`docs/WHITE_LABEL.md`](WHITE_LABEL.md) 체크리스트 따라 진행:

1. `src/config/brand/{key}.ts` 작성 (`sample.ts` 복사)
2. `/public/brand/{key}/` 자산 3개
3. (선택) `src/config/copy/{key}.ko.ts`
4. `src/config/brand/index.ts` `brands` 객체 등록
5. `VITE_BRAND={key} npm run build` → 시각 확인

## 시각 회귀 검증

모든 PR 은 *시각 변화 0* 가 기본:

- `node scripts/visual-baseline/capture.mjs --target=before` — baseline 캡처 (변경 전)
- 작업 후 `node scripts/visual-baseline/capture.mjs --target=after-step{N}` + `node scripts/visual-baseline/diff.mjs --step={N}` — diff 측정
- diff 0 미통과 시 의도된 변화인지 명시 + baseline 갱신

## Phase 6 정책

v3 visual alignment (코드 hex 를 v3 spec 으로 정렬) 은 **폐기**됨 (Phase 7-A, 2026-04-29).
CRM 은 보닥 v3 와 별개 시스템 — [`docs/SCOPE.md`](SCOPE.md) 참조.
