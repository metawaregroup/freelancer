<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $organizations = [1, 2, 3, 4, 5, 6, 7];

        $names = [
            '展開中スマホゲームのサーバーサイド開発案件',
            '企業向けクラウド型健康管理サービスのUI/UXデザイン業務支援/サービス',
            '監視運用インフラエンジニア',
            'Salesforceシステム開発案件',
            'コスメ関連ECサイトのシステム開発',
            '大規模チケット予約サイトの追加開発',
            '就活モバイルアプリのフロントエンド開発'
        ];

        $stations = ['東京', '横浜', '秋葉原', '川口', '新宿', '品川', '池袋'];
        $forms = [1, 2, 3, 4, 5, 6, 7];
        $contracts = [1, 2, 3, 4, 5, 6, 7];


        $contract = $contracts[rand(0, count($contracts) - 1)];
        $form = $forms[rand(0, count($forms) - 1)];
        $organization = $organizations[rand(0, count($organizations) - 1)];
        $name = $names[rand(0, count($names) - 1)];
        $station = $stations[rand(0, count($stations) - 1)];
        return [
            'organization_id' => $organization,
            'name' => $name,
            'form_id' => $form,
            'contract_id' => $contract,
            'station' => $station,
            'development_environment' => 1,
            'require' => "・制作会社、広告代理店等でのデザイン制作の実務経験(2年以上目安)
            ・Webデザイン、バナーデザイン実務経験
            ・Adobe CCでのデザイン経験
            ・Figma使用経験",
            'wellcome' => "・イラスト作成経験
            ・HTML、CSSでのコーディング経験
            ・紙媒体の制作経験
            ・制作管理等ディレクション経験",
            'interview_count' => 1,

            'duties' => "・クライアントが運営する企業向けクラウド型健康管理サービスにおけるUI/UXデザイン業務
            ・マーケティング領域、利用促進に係るデザインおよびサービスデザイン
            ・バナー制作およびサービスサイト・LPの改善、制作
            ・利用促進リーフレット、チラシ等紙媒体のデザイン制作
            ・営業資料制作
            ・展示会ブースデザイン",
            'price_from' => 700000,
            'price_to' => 900000
        ];
    }
}
