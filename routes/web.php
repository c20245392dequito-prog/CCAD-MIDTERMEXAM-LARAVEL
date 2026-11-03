<?php

use App\Models\CustomOrder;
use App\Models\FurnitureModel;
use App\Http\Controllers\FurnitureModelController;
use App\Http\Controllers\CustomOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Homepage
Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('dashboard', [
        'totalOrders' => CustomOrder::count(),

        'pendingOrders' => CustomOrder::where(
            'manufacturing_status',
            'Pending'
        )->count(),

        'productionOrders' => CustomOrder::where(
            'manufacturing_status',
            'In Production'
        )->count(),

        'completedOrders' => CustomOrder::where(
            'manufacturing_status',
            'Completed'
        )->count(),

        'totalFurniture' => FurnitureModel::count(),

        'recentOrders' => CustomOrder::with([
            'furnitureModel',
            'woodType',
            'finish',
        ])
            ->latest()
            ->take(5)
            ->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Furniture Models
Route::resource('furniture-models', FurnitureModelController::class)
    ->only(['index', 'create', 'store', 'update']);

// Custom Orders
Route::resource('custom-orders', CustomOrderController::class)
    ->only(['index', 'create', 'store', 'update']);

// Authentication routes
require __DIR__ . '/auth.php';

// Settings routes
require __DIR__ . '/settings.php';