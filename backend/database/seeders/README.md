## 使用用途

### Docker を立ち上げた際の初期マスターデータの　 Seeder になります。

#### 初期化かた

1. Docker を立ち上がっている状態で`docker compose exec app bash`を実行し。app コンテナに入る
2. `php artisan migrate:refresh --seed`を実行して、全てのテーブルを削除し、マスターデータを作成できる。
