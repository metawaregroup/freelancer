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
        Schema::create('tests', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('integer')->comment('数値');
            $table->bigInteger('big_integer')->default(0);
            $table->integer('unsigned_integer_1')->unsigned();
            $table->unsignedInteger('unsigned_integer_2');

            $table->float('float', 8, 2);
            $table->double('double', 15, 8);

            $table->string('string')->nullable();
            $table->string('string100', 100);
            $table->text('text');

            $table->enum(
                'enum',
                ['DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY']
            );
            $table->geometry('geometry');
            $table->json('json');

            $table->date('date');
            $table->dateTime('dateTime');
            $table->timestamp('timestamp');
            $table->timestamps();
            $table->softDeletes();

            $table->unique('integer');
            $table->index(['string', 'string100']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tests');
    }
};
