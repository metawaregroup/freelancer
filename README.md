# Project name Jobs

happyjobs.jp

## 必須なソフトウェアのインストール

### VS Code

https://azure.microsoft.com/ja-jp/products/visual-studio-code

### VS Code Plugin

1. Markdown Preview Enhanced
1. PHP Intelephense
1. PHP Namespace Resolver
1. Prettier - Code formatter
1. Jest Runner
1. PHP Debuger

### Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

https://brew.sh/

### node

```shell
brew install node
```

https://nodejs.org/

### yarn

```shell
brew install yarn
```

https://yarnpkg.com/

### Docker

```shell
brew install docker
brew install docker-compose
```

#### Docker Desktop 版のインストール

https://docs.docker.jp/docker-for-mac/install.html

Make sure that you have the last stable [NodeJS](https://nodejs.org/en/download/) and `yarn` version.

- Do not delete the `yarn.lock file`

### React Develop tool

https://react.dev/learn/react-developer-tools

# Clone

```shell
git clone project
cd project
yarn install;
```

## Start

インストールは成功したら、下記の命令で、開発サーバーを起動できます。

```shell
yarn dev
```

This starts a local webserver at `http://localhost:3000` and auto detect file changes:

## Build

```shell
yarn export
```

# Docker 環境構築

```shell
docker-compose up -d
```

# PHP サーバー起動

```shell
php artisan serv
```

# Laravel

php artisan migrate

php artisan make:model User

必要のないテーブルを無視する
class AppServiceProvider extends ServiceProvider
{
public function register()
{
Sanctum::ignoreMigrations();
}
}

全てのテーブルを削除する

php artisan migrate:fresh

Default data

この部分はすでに作成済みなので無視していいです。
php artisan make:command MigrateClearCommand

データーベース作成した後に下記の命令を使って初期データーを追加できます。
php artisan migrate:master
php artisan migrate:dummy

php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

create controller

php artisan make:controller <controller-name> --plain
php artisan make:middleware SecondMiddleware
