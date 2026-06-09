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
        // 12. HOTELS
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('city');
            $table->string('country');
            $table->integer('stars')->default(3);
            $table->decimal('rating', 3, 1)->default(4.0);
            $table->text('address')->nullable();
            $table->text('description')->nullable();
            $table->text('amenities')->nullable(); // JSON or serialized string
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 13. HOTEL ROOMS
        Schema::create('hotel_rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained('hotels')->onDelete('cascade');
            $table->string('room_type');
            $table->integer('capacity')->default(2);
            $table->decimal('price_per_night', 15, 2);
            $table->text('description')->nullable();
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        // 14. FLIGHTS
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->string('airline');
            $table->string('airline_logo')->nullable();
            $table->string('flight_number');
            $table->string('origin_airport');
            $table->string('destination_airport');
            $table->string('origin_city');
            $table->string('destination_city');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->string('cabin_class')->default('economy'); // economy, business, first
            $table->decimal('price', 15, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 15. CRUISES
        Schema::create('cruises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('cruise_line');
            $table->integer('duration_days');
            $table->string('departure_port');
            $table->decimal('price_starts_from', 15, 2);
            $table->text('itinerary')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 16. ATTRACTIONS (Amusement parks, museums tickets)
        Schema::create('attractions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('city');
            $table->string('country');
            $table->decimal('price', 15, 2);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 17. VISA SERVICES
        Schema::create('visa_services', function (Blueprint $table) {
            $table->id();
            $table->string('country');
            $table->string('visa_type');
            $table->integer('processing_days')->default(7);
            $table->decimal('price', 15, 2);
            $table->text('requirements')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 18. INSURANCE PLANS
        Schema::create('insurance_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('coverage_type'); // individual, family, group
            $table->decimal('premium', 15, 2); // Price of insurance
            $table->text('benefits')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_plans');
        Schema::dropIfExists('visa_services');
        Schema::dropIfExists('attractions');
        Schema::dropIfExists('cruises');
        Schema::dropIfExists('flights');
        Schema::dropIfExists('hotel_rooms');
        Schema::dropIfExists('hotels');
    }
};
