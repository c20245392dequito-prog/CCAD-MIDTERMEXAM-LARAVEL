<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFurnitureModelRequest;
use App\Http\Requests\UpdateFurnitureModelRequest;
use App\Models\FurnitureModel;
use App\Services\FurnitureOrderService;
use Illuminate\Http\JsonResponse;

class FurnitureModelController extends Controller
{
    public function __construct(
        private FurnitureOrderService $service
    ) {}

    public function index(): JsonResponse
    {
        return response()->json(
            FurnitureModel::with('customOrders')
                ->latest()
                ->paginate(10)
        );
    }

    public function create(): JsonResponse
    {
        return response()->json([
            'fields' => [
                'name',
                'description',
                'base_cost',
            ],
        ]);
    }

    public function store(
        StoreFurnitureModelRequest $request
    ): JsonResponse {
        $furniture = $this->service->createFurniture(
            $request->validated()
        );

        return response()->json($furniture, 201);
    }

    public function update(
        UpdateFurnitureModelRequest $request,
        FurnitureModel $furniture_model
    ): JsonResponse {
        $furniture = $this->service->updateFurniture(
            $furniture_model,
            $request->validated()
        );

        return response()->json($furniture);
    }
}