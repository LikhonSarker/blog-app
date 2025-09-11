<?php

use App\Http\Controllers\PostController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/posts/create', [PostController::class, 'create'])->name('post.create');
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('post.edit');

require __DIR__.'/auth.php';
