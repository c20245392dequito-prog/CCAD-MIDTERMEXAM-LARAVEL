<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FurnitureModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'base_cost',
    ];

    protected function casts(): array
    {
        return [
            'base_cost' => 'decimal:2',
        ];
    }

    public function customOrders(): HasMany
    {
        return $this->hasMany(CustomOrder::class);
    }
}
