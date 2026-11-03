<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomOrderRequest;
use App\Http\Requests\UpdateCustomOrderRequest;
use App\Models\CustomOrder;
use App\Models\FurnitureModel;
use App\Models\WoodType;
use App\Models\Finish;
use App\Services\FurnitureOrderService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CustomOrderController extends Controller
{
    public function __construct(
        private FurnitureOrderService $service
    ) {}

    public function index(): Response
    {
        return Inertia::render('custom-orders/index', [
            'orders' => CustomOrder::with([
                'furnitureModel',
                'woodType',
                'finish',
            ])->latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('custom-orders/create', [
            'furniture_models' => FurnitureModel::all(),
            'wood_types' => WoodType::all(),
            'finishes' => Finish::all(),
        ]);
    }

    public function store(
        StoreCustomOrderRequest $request
    ): RedirectResponse {
        $this->service->createOrder($request->validated());

        return redirect()
            ->route('custom-orders.index')
            ->with('success', 'Custom order created successfully.');
    }

    public function update(
        UpdateCustomOrderRequest $request,
        CustomOrder $custom_order
    ): RedirectResponse {
        $this->service->updateOrder(
            $custom_order,
            $request->validated()
        );

        return redirect()
            ->route('custom-orders.index')
            ->with('success', 'Custom order updated successfully.');
    }
}