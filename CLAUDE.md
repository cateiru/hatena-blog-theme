# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは、はてなブログ用のカスタムCSSテーマを開発するためのボイラープレートです。SCSSを使用してスタイルシートを記述し、Viteでビルド・開発サーバーを起動します。必要最小限の見た目が調整されており、このベースをもとにCSSを書くことで比較的楽にオリジナルテーマが作成できます。

## 技術スタック

- **言語**: SCSS/Sass (1.63.6)
- **ビルドツール**: Vite 7.x
- **PostCSS処理**: Autoprefixer
- **開発環境**: Node.js 22
- **CI/CD**: GitHub Actions
- **依存関係**: normalize.css

## 開発コマンド

- `npm install`: 依存関係のインストール
- `npm start`: 開発サーバー起動（localhost:5173でホットリロード対応）
- `npm run build`: CSSのビルド（出力先: `build/boilerplate.css`）

## プロジェクト構造

### SCSSファイル構成

- **`scss/boilerplate.scss`**: メインエントリーポイント。すべてのパーシャルをインポート
- **`scss/lib/_variable.scss`**: 変数定義（色、フォント、サイズ、グラデーション、レスポンシブブレークポイント）
- **`scss/lib/_core.scss`**: コアレイアウトとグローバルスタイル（検索フォーム、ヘッダー、フッター等）
- **`scss/lib/_entry.scss`**: 記事本体のスタイル
- **`scss/lib/_comment.scss`**: コメント機能のスタイル
- **`scss/lib/_pager.scss`**: ページャー
- **`scss/lib/_ad.scss`**: 広告スタイル
- **`scss/lib/_not_found.scss`**: 404ページ
- **`scss/lib/entry/`**: 記事内要素の詳細スタイル
  - `_blockquote.scss`: 引用ブロック（Note、Tip、Warning等のカスタムスタイル含む）
  - `_code.scss`: コードブロック
  - `_heading.scss`: 見出し
  - `_iframe.scss`: iframe埋め込み
  - `_image.scss`: 画像
  - `_social_buttons.scss`: SNSシェアボタン
  - `_table.scss`: テーブル
  - `_table_of_contents.scss`: 目次

## コーディングガイドライン

### SCSS変数の使用

すべての色、フォント、サイズは `_variable.scss` で定義された変数を使用してください。直接値を記述せず、変数経由でアクセスすることで一貫性を保ちます。

**主要な変数:**
- テキスト色: `$text`, `$text-light`, `$text-header`
- リンク色: `$link`, `$link-hover`
- 背景色: `$background`, `$code-background`, `$blockquote-background`
- アクセントカラー: `$primary`, `$accent`
- グラデーション: `$title-gradient`, `$tag-gradient`

### ファイル配置ルール

新しいスタイルを追加する際は、適切なパーシャルファイルに配置してください:

- **グローバルレイアウト・共通要素** → `_core.scss`
- **記事本体の基本スタイル** → `_entry.scss`
- **記事内の特定要素** → `entry/` サブディレクトリ内の対応ファイル
- **新しいモジュール** → 新しいパーシャルを作成し、`boilerplate.scss` でインポート

### レスポンシブデザイン

メディアクエリのブレークポイント:
- **タブレット**: `@media screen and (min-width: 1000px)`
- **デスクトップ**: `@media screen and (min-width: 1440px)`

## 開発ワークフロー

### ローカル開発

1. `npm start` で開発サーバーを起動（localhost:5173）
2. はてなブログの「デザイン設定」→「カスタマイズ」→「ヘッダ」→「タイトル下」に以下を追加:
   ```html
   <script type="module" src="http://localhost:5173/@vite/client"></script>
   <link rel="stylesheet" href="http://localhost:5173/scss/boilerplate.scss" />
   ```
3. SCSSファイルを編集すると、変更がリアルタイムにブログに反映される
4. 開発完了後、`npm run build` でビルド
5. `build/boilerplate.css` の内容をはてなブログの「デザインCSS」に貼り付け

### Vite設定の特徴

- **CORSヘッダー設定済み**: `vite.config.js` でプライベートネットワークアクセスに対応
- **Autoprefixer**: ビルド時にベンダープレフィックスを自動付与
- **ソースマップ**: 開発時にCSS SourceMapを生成

## CI/CD

- **GitHub Actions**: masterブランチへのpush/PRで自動ビルド検証を実行
- **ビルドアーティファクト**: `build/` ディレクトリをアップロード
- **Renovate**: 依存関係の自動更新（週末スケジュール、日本語コミットメッセージ対応）

## 重要な注意事項

- `build/` ディレクトリはgitignore対象（ビルド成果物のため、コミット不要）
- コミットメッセージは日本語で記述すること
- はてなブログのデフォルトクラス名（`.entry-content`, `.archive-entry` 等）を尊重する
- normalize.cssを使用しているため、ブラウザ間の差異はあらかじめ吸収されている
