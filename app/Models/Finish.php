<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Finish extends Model
{
    use HasFactory;

    protected $fillable = [
        'color_name',
    ];

    public function customOrders(): HasMany
    {
        return $this->hasMany(CustomOrder::class);
    }
}
