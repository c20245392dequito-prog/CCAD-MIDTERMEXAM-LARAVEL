<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name',
        'contact_email',
        'furniture_model_id',
        'wood_type_id',
        'finish_id',
        'custom_dimensions',
        'base_cost',
        'customization_fee',
        'deposit_paid',
        'total_price',
        'manufacturing_status',
    ];

    protected function casts(): array
    {
        return [
            'base_cost' => 'decimal:2',
            'customization_fee' => 'decimal:2',
            'deposit_paid' => 'decimal:2',
            'total_price' => 'decimal:2',
        ];
    }

    public function furnitureModel(): BelongsTo
    {
        return $this->belongsTo(FurnitureModel::class);
    }

    public function woodType(): BelongsTo
    {
        return $this->belongsTo(WoodType::class);
    }

    public function finish(): BelongsTo
    {
        return $this->belongsTo(Finish::class);
    }
}
