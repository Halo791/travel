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
        // 6. DESTINATIONS
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('country');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. TOURS
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('region_id')->constrained('regions')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('tour_categories')->onDelete('cascade');
            $table->string('title', 500);
            $table->string('slug', 500)->unique();
            $table->integer('duration_days');
            $table->integer('duration_nights');
            $table->string('departure_city');
            $table->decimal('price', 15, 2);
            $table->decimal('price_original', 15, 2)->nullable(); // For sale/promo discounts
            $table->text('description')->nullable();
            $table->text('includes')->nullable();
            $table->text('excludes')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 8. TOUR DEPARTURES
        Schema::create('tour_departures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained('tours')->onDelete('cascade');
            $table->date('departure_date');
            $table->date('return_date');
            $table->integer('available_seats')->default(20);
            $table->integer('total_seats')->default(20);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 9. TOUR ITINERARIES
        Schema::create('tour_itineraries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained('tours')->onDelete('cascade');
            $table->integer('day_number');
            $table->string('title');
            $table->text('description');
            $table->string('meals')->nullable(); // B, L, D
            $table->timestamps();
        });

        // 10. TOUR GALLERIES
        Schema::create('tour_galleries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->constrained('tours')->onDelete('cascade');
            $table->string('image_path');
            $table->string('caption')->nullable();
            $table->timestamps();
        });

        // 11. PACKAGES (Generic Travel Packages)
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('slug', 500)->unique();
            $table->integer('duration_days');
            $table->decimal('price', 15, 2);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
        Schema::dropIfExists('tour_galleries');
        Schema::dropIfExists('tour_itineraries');
        Schema::dropIfExists('tour_departures');
        Schema::dropIfExists('tours');
        Schema::dropIfExists('destinations');
    }
};
