
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_orders', function (Blueprint $table) {
            $table->id();

            $table->string('client_name');
            $table->string('contact_email')->index();

            $table->foreignId('furniture_model_id')
                ->constrained('furniture_models')
                ->restrictOnDelete();

            $table->foreignId('wood_type_id')
                ->constrained('wood_types')
                ->restrictOnDelete();

            $table->foreignId('finish_id')
                ->constrained('finishes')
                ->restrictOnDelete();

            $table->text('custom_dimensions');

            $table->decimal('base_cost', 10, 2);
            $table->decimal('customization_fee', 10, 2)->default(0);
            $table->decimal('deposit_paid', 10, 2)->default(0);
            $table->decimal('total_price', 10, 2);

            $table->string('manufacturing_status')
                ->default('Pending')
                ->index();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_orders');
    }
};
