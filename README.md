# Simple Task Manager

ブラウザのローカルストレージに保存する、シンプルなタスク管理アプリです。

## 機能

- タスクの追加
- 完了/未完了の切り替え
- すべて/未完了/完了済みの絞り込み
- タスクの削除
- 完了済みタスクの一括削除
- ブラウザのローカルストレージによる保存

## ローカル実行

```bash
npm install
npm run start
```

## ビルド

```bash
npm run build
```

ビルド成果物は `dist/` に出力されます。

## デプロイ

このリポジトリには GitHub Pages へ自動デプロイするワークフローを含めています。

1. GitHub のリポジトリ設定で **Settings > Pages > Build and deployment > Source** を **GitHub Actions** にします。
2. `main` ブランチへ push するか、Actions 画面から `Deploy to GitHub Pages` を手動実行します。
3. `.github/workflows/deploy.yml` が `dist/` をビルドして GitHub Pages に公開します。

## デプロイエラーの対処

`Creating Pages deployment failed` と `HttpError: Not Found` が出る場合は、GitHub Pages がまだ有効化されていない可能性が高いです。次の設定を確認してください。

1. `https://github.com/hiranoyudai/tasktest/settings/pages` を開きます。
2. **Build and deployment** の **Source** を **GitHub Actions** に変更します。
3. 保存後、Actions 画面から `Deploy to GitHub Pages` を再実行します。

Node.js 20 の非推奨警告を避けるため、ワークフローは Node.js 24 を指定し、Node.js 24 対応の `actions/checkout@v5` と `actions/setup-node@v7`、GitHub Pages の初期化に `actions/configure-pages@v5` を使っています。
