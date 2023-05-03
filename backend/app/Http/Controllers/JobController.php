<?php

namespace App\Http\Controllers;

use App\Models\Job;
use GuzzleHttp\Psr7\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class JobController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    function getJobs()
    {
        //Job::all();

        return response()->json(Job::all());
    }
}
