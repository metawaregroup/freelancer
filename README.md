# Project name Jobs

happyjobs.jp

## 必須なソフトウェアのインストール

### VS Code

https://azure.microsoft.com/ja-jp/products/visual-studio-code

### VS Code Plugin

1. Markdown Preview Enhanced
1. PHP Intelephense
1. PHP Namespace Resolver
1. PHP Debuger
1. Prettier - Code formatter
1. Jest Runner

### Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

https://brew.sh/

### node

https://nodejs.org/

```shell
brew install node
```

### yarn

https://yarnpkg.com/

```shell
brew install yarn
```

### Docker

```shell
brew install docker
brew install docker-compose
```

#### Docker Desktop 版のインストール

https://docs.docker.jp/docker-for-mac/install.html

### React Develop tool

https://react.dev/learn/react-developer-tools

# Clone

```shell
git clone https://github.com/metawaregroup/freelancer
cd freelancer
cd frontend
# react install
yarn install;
cd ..
cd backend
# Laravel install
composer install
cd ..
# Docker 環境構築
docker-compose up -d
```

## Build

```shell
yarn export
```

# Laravel

## Create Database

```shell
# データーテーブルの作成
php artisan migrate
# 初期データーを作成する
php artisan migrate --seed
# 全てのテーブルを削除して、データーテーブルの作成
php artisan migrate:fresh

# モデルの作成
php artisan make:model User
# テーブルの作成
php artisan make:migration create_[tests]_table --create=[tests]
# Factoryの作成
php artisan make:factory [User]
```

###### 必要のないテーブルを無視する

```php
class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        Sanctum::ignoreMigrations();
    }
}
```

##### artisan コマンドを作成する

```shell
php artisan make:command MigrateClearCommand
```

###### わからないバグがあったときに下記の命令を実行してください。

```shell
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## create controller

```shell
php artisan make:controller <controller-name> --plain
php artisan make:middleware SecondMiddleware
```
