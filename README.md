<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/11a36abb-7c2d-44db-bfd6-47fee23bd352

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contributing

PR 작성 가이드 — [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md). PR 템플릿은 자동 적용 ([`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)).

## Design System

- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — 토큰·컴포넌트·네이밍 컨벤션 정본
- [`docs/SCOPE.md`](docs/SCOPE.md) — 디자인 시스템 정체성 (CRM ≠ 보닥 v3)
- [`docs/WHITE_LABEL.md`](docs/WHITE_LABEL.md) — B2B 화이트레이블 운영
- 시각화: `npm run dev` 후 [http://localhost:3000/design-system.html](http://localhost:3000/design-system.html)
- 토큰 audit: `npm run lint:tokens`
