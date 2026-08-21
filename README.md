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

1. GitHub のリポジトリ設定で Pages の Source を **GitHub Actions** にします。
2. `main` ブランチへ push すると、`.github/workflows/deploy.yml` が実行されます。
3. ビルド済みの `dist/` が GitHub Pages に公開されます。
