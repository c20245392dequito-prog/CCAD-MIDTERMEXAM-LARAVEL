<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WoodType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function customOrders(): HasMany
    {
        return $this->hasMany(CustomOrder::class);
    }
}
