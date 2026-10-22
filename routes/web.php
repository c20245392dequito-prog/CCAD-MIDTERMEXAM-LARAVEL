
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FurnitureModelController;
use App\Http\Controllers\CustomOrderController;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('furniture-models', FurnitureModelController::class)
        ->only(['index', 'create', 'store', 'update']);

    Route::resource('custom-orders', CustomOrderController::class)
        ->only(['index', 'create', 'store', 'update']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
