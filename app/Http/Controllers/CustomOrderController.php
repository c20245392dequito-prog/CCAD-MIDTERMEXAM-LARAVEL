<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomOrderRequest;
use App\Http\Requests\UpdateCustomOrderRequest;
use App\Models\CustomOrder;
use App\Models\FurnitureModel;
use App\Models\WoodType;
use App\Models\Finish;
use App\Services\FurnitureOrderService;
use Illuminate\Http\JsonResponse;

class CustomOrderController extends Controller
{
    public function __construct(
        private FurnitureOrderService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json(
            CustomOrder::with([
                'furnitureModel',
                'woodType',
                'finish',
            ])->latest()->paginate(10)
        );
    }

    public function create(): JsonResponse
    {
        return response()->json([
            'furniture_models' => FurnitureModel::all(),
            'wood_types' => WoodType::all(),
            'finishes' => Finish::all(),
        ]);
    }

    public function store(
        StoreCustomOrderRequest $request
    ): JsonResponse {
        $order = $this->service->createOrder(
            $request->validated()
        );

        return response()->json($order, 201);
    }

    public function update(
        UpdateCustomOrderRequest $request,
        CustomOrder $custom_order
    ): JsonResponse {
        $order = $this->service->updateOrder(
            $custom_order,
            $request->validated()
        );

        return response()->json($order);
    }
}