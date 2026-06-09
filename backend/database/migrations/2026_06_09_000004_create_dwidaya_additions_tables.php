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
        // 19. UMROH PACKAGES
        Schema::create('umroh_packages', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('slug', 500)->unique();
            $table->integer('duration_days')->default(9);
            $table->string('hotel_makkah')->nullable();
            $table->string('hotel_madinah')->nullable();
            $table->string('airline')->nullable();
            $table->decimal('price', 15, 2);
            $table->text('departure_dates')->nullable(); // JSON array
            $table->text('description')->nullable();
            $table->text('includes')->nullable();
            $table->text('excludes')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 20. RAIL PASSES (JR Pass, Euro Rail, etc.)
        Schema::create('rail_passes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->string('country', 100)->nullable();
            $table->string('pass_type', 50)->default('ordinary'); // ordinary, green (first class)
            $table->integer('duration_days')->default(7);
            $table->decimal('price', 15, 2);
            $table->text('description')->nullable();
            $table->text('terms')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 21. EVENTS
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('slug', 500)->unique();
            $table->string('location', 255)->nullable();
            $table->timestamp('event_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('registration_url', 500)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 22. MULTI-LANGUAGE TRANSLATIONS
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 5); // 'id', 'en'
            $table->string('group_key', 100)->nullable(); // 'nav', 'home', 'tours'
            $table->string('item_key', 255);
            $table->text('value');
            $table->unique(['locale', 'group_key', 'item_key']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
        Schema::dropIfExists('events');
        Schema::dropIfExists('rail_passes');
        Schema::dropIfExists('umroh_packages');
    }
};
