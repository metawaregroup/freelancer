<?php

namespace App\Console\Commands;

use App\Models\UserModel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateClearCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    // protected $signature = 'command:name';　<-ここを下の行で書き換え
    protected $signature = 'migrate:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    // protected $description = 'Command description'; <-ここを下の行で書き換え
    protected $description = 'Remove all data from database';
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //ここから記述
        DB::table('users')->truncate();
        DB::table('favorites')->truncate();
        DB::table('organizations')->truncate();
        DB::table('jobs')->truncate();
    }
}
