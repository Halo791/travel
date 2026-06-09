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
        // 23. ALTER USERS TABLE
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->nullable()->after('email');
            }
            $table->string('preferred_currency', 3)->default('IDR')->after('remember_token');
            $table->string('preferred_locale', 5)->default('id')->after('preferred_currency');
            $table->integer('points')->default(0)->after('preferred_locale'); // Cache user reward points
        });

        // 24. PROMOS
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->enum('discount_type', ['percentage', 'fixed'])->default('percentage');
            $table->decimal('discount_value', 15, 2);
            $table->decimal('min_booking_amount', 15, 2)->default(0);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 25. BOOKINGS
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('booking_code')->unique();
            $table->string('product_type'); // 'tour', 'hotel', 'flight', 'cruise', 'umroh', 'railpass'
            $table->unsignedBigInteger('product_id');
            $table->dateTime('booking_date')->useCurrent();
            $table->decimal('subtotal', 15, 2);
            $table->decimal('discount', 15, 2)->default(0);
            $table->decimal('points_redeemed', 15, 2)->default(0);
            $table->decimal('total_amount', 15, 2);
            $table->enum('status', ['pending', 'confirmed', 'paid', 'completed', 'cancelled'])->default('pending');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('guest_details')->nullable(); // JSON list of travelers
            $table->timestamps();
        });

        // 26. PAYMENTS
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('payment_method_id')->nullable()->constrained('payment_methods')->onDelete('set null');
            $table->string('transaction_reference')->nullable(); // Midtrans SNAP token / reference
            $table->decimal('amount', 15, 2);
            $table->enum('status', ['pending', 'success', 'failed', 'expired'])->default('pending');
            $table->timestamps();
        });

        // 27. USER REWARDS (Loyalty profile link)
        Schema::create('user_rewards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tier_id')->constrained('reward_tiers')->onDelete('cascade');
            $table->integer('total_points')->default(0);
            $table->integer('available_points')->default(0);
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamps();
        });

        // 28. REWARD TRANSACTIONS
        Schema::create('reward_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->onDelete('set null');
            $table->integer('points');
            $table->enum('type', ['earn', 'redeem']);
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // 29. WISHLISTS
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('product_type'); // 'tour', 'hotel', etc.
            $table->unsignedBigInteger('product_id');
            $table->unique(['user_id', 'product_type', 'product_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlists');
        Schema::dropIfExists('reward_transactions');
        Schema::dropIfExists('user_rewards');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('promos');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'preferred_currency', 'preferred_locale', 'points']);
        });
    }
};
