<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. REGIONS (Europe, Asia, etc.)
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. TOUR CATEGORIES (Signature, Super Sale, Favorite)
        Schema::create('tour_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. CURRENCIES (IDR, USD, etc.)
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('code', 3)->unique();
            $table->string('name');
            $table->string('symbol', 5)->nullable();
            $table->decimal('exchange_rate', 15, 6)->default(1.0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. REWARD TIERS (Bronze, Silver, Gold, Platinum)
        Schema::create('reward_tiers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->integer('min_points')->default(0);
            $table->decimal('multiplier', 3, 2)->default(1.0);
            $table->text('benefits')->nullable();
            $table->timestamps();
        });

        // 5. PAYMENT METHODS (Visa, MC, Xendit, Midtrans)
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('code', 50)->unique();
            $table->string('logo', 500)->nullable();
            $table->string('type', 30)->nullable(); // credit_card, bank_transfer, ewallet
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
        Schema::dropIfExists('reward_tiers');
        Schema::dropIfExists('currencies');
        Schema::dropIfExists('tour_categories');
        Schema::dropIfExists('regions');
    }
};
