<?php

namespace App\Services;

use App\Models\CustomOrder;
use App\Models\FurnitureModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class FurnitureOrderService
{
    public function createFurniture(array $data): FurnitureModel
    {
        return DB::transaction(
            fn () => FurnitureModel::create($data)
        );
    }

    public function updateFurniture(
        FurnitureModel $furniture,
        array $data
    ): FurnitureModel {
        return DB::transaction(function () use ($furniture, $data) {
            $furniture->update($data);

            return $furniture->refresh();
        });
    }

    public function createOrder(array $data): CustomOrder
    {
        return DB::transaction(function () use ($data) {
            $furniture = FurnitureModel::findOrFail(
                $data['furniture_model_id']
            );

            $data['contact_email'] = strtolower(
                trim($data['contact_email'])
            );

            $data['custom_dimensions'] = $this->cleanDimensions(
                $data['custom_dimensions']
            );

            $data['base_cost'] = $furniture->base_cost;

            $data['customization_fee'] = $data['customization_fee'] ?? 0;

            $data['total_price'] =
                (float) $data['base_cost']
                + (float) $data['customization_fee'];

            $data['deposit_paid'] = $data['deposit_paid'] ?? 0;

            $data['manufacturing_status'] =
                $data['manufacturing_status'] ?? 'Pending';

            $this->checkDeposit(
                $data['manufacturing_status'],
                (float) $data['deposit_paid'],
                (float) $data['total_price']
            );

            return CustomOrder::create($data);
        });
    }

    public function updateOrder(
        CustomOrder $order,
        array $data
    ): CustomOrder {
        return DB::transaction(function () use ($order, $data) {
            $modelId = $data['furniture_model_id']
                ?? $order->furniture_model_id;

            $furniture = FurnitureModel::findOrFail($modelId);

            $email = $data['contact_email']
                ?? $order->contact_email;

            $dimensions = $data['custom_dimensions']
                ?? $order->custom_dimensions;

            $fee = $data['customization_fee']
                ?? $order->customization_fee;

            $deposit = $data['deposit_paid']
                ?? $order->deposit_paid;

            $status = $data['manufacturing_status']
                ?? $order->manufacturing_status;

            $baseCost = (float) $furniture->base_cost;
            $totalPrice = $baseCost + (float) $fee;

            $this->checkDeposit(
                $status,
                (float) $deposit,
                $totalPrice
            );

            $data['contact_email'] = strtolower(trim($email));
            $data['custom_dimensions'] = $this->cleanDimensions(
                $dimensions
            );
            $data['base_cost'] = $baseCost;
            $data['customization_fee'] = $fee;
            $data['deposit_paid'] = $deposit;
            $data['total_price'] = $totalPrice;
            $data['manufacturing_status'] = $status;

            $order->update($data);

            return $order->refresh();
        });
    }

    private function cleanDimensions(string $dimensions): string
    {
        $dimensions = strip_tags($dimensions);
        $dimensions = preg_replace('/\s+/', ' ', $dimensions);

        return trim($dimensions);
    }

    private function checkDeposit(
        string $status,
        float $deposit,
        float $total
    ): void {
        if (
            $status === 'In Production'
            && $deposit < ($total * 0.40)
        ) {
            throw ValidationException::withMessages([
                'deposit_paid' =>
                    'A minimum 40% deposit is required before production.',
            ]);
        }
    }
}