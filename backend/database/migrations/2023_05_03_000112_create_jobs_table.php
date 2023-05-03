<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->integer('job_id')->autoIncrement()->comment("案件ID");
            $table->integer('organization_id')->comment("企業");
            $table->string('name', 500)->comment("案件名");
            $table->integer('form_id')->comment("作業体制");
            $table->integer('contract_id')->comment("契約種類");
            $table->string('station')->comment("最寄駅");
            $table->integer('development_environment');
            $table->string('require')->comment("必須スキル");
            $table->string('wellcome')->comment("尚可スキル");
            $table->integer('interview_count')->comment("商談回数");
            $table->string('comment', 500)->nullable()->comment("コメント");
            $table->string('duties', 8000)->comment("業務内容");
            $table->integer('price_from')->default(0);
            $table->integer('price_to')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();

            $table->comment('案件の情報');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
