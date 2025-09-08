<?php

use App\Http\Controllers\Auth\TokenAuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [TokenAuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [TokenAuthController::class, 'create'])->name('login');
    Route::post('/login', [TokenAuthController::class, 'login']);
    Route::post('/register', [RegisterController::class, 'register']);
});
