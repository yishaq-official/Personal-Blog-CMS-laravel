<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\MediaController;

Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::apiResource('media', MediaController::class)->only(['index', 'store', 'destroy']);
});
