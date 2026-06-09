<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Currencies
        DB::table('currencies')->insert([
            ['code' => 'IDR', 'name' => 'Rupiah', 'symbol' => 'Rp', 'exchange_rate' => 1.0000, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'USD', 'name' => 'US Dollar', 'symbol' => '$', 'exchange_rate' => 16250.0000, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'SGD', 'name' => 'Singapore Dollar', 'symbol' => 'S$', 'exchange_rate' => 12050.0000, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 2. Payment Methods
        DB::table('payment_methods')->insert([
            ['name' => 'Transfer Bank BCA', 'code' => 'bca_transfer', 'logo' => null, 'type' => 'bank_transfer', 'sort_order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Transfer Bank Mandiri', 'code' => 'mandiri_transfer', 'logo' => null, 'type' => 'bank_transfer', 'sort_order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Midtrans Instant Payment', 'code' => 'midtrans', 'logo' => null, 'type' => 'payment_gateway', 'sort_order' => 3, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 3. Reward Tiers
        DB::table('reward_tiers')->insert([
            ['name' => 'Bronze Member', 'min_points' => 0, 'multiplier' => 1.0, 'benefits' => 'Dapatkan 1 poin setiap kelipatan Rp 100.000 pembelian tiket shuttle.', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Silver Member', 'min_points' => 500, 'multiplier' => 1.2, 'benefits' => 'Poin multiplier 1.2x, welcome drink gratis di lounge.', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Gold Member', 'min_points' => 2000, 'multiplier' => 1.5, 'benefits' => 'Poin multiplier 1.5x, prioritas kursi depan, free snack extra.', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 4. Test Users
        DB::table('users')->insert([
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'phone' => '08123456789',
                'preferred_currency' => 'IDR',
                'preferred_locale' => 'id',
                'points' => 350,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Siti Aminah',
                'email' => 'siti@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'phone' => '08234567890',
                'preferred_currency' => 'IDR',
                'preferred_locale' => 'id',
                'points' => 600,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        // 5. Regions
        $regionId = DB::table('regions')->insertGetId([
            'name' => 'Domestik Jawa Timur',
            'slug' => 'domestik-jawa-timur',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $regionAsia = DB::table('regions')->insertGetId([
            'name' => 'Asia Tenggara',
            'slug' => 'asia-tenggara',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // 6. Tour Categories
        $catId = DB::table('tour_categories')->insertGetId([
            'name' => 'Open Trip',
            'slug' => 'open-trip',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // 7. Destinations
        $destMalang = DB::table('destinations')->insertGetId([
            'name' => 'Malang & Batu',
            'slug' => 'malang-dan-batu',
            'country' => 'Indonesia',
            'description' => 'Kota apel dengan udara sejuk, pegunungan indah, dan taman bermain Batu.',
            'image' => 'https://images.unsplash.com/photo-1583161376878-3db8df1e51b1?w=800',
            'is_featured' => true,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $destSurabaya = DB::table('destinations')->insertGetId([
            'name' => 'Surabaya',
            'slug' => 'surabaya',
            'country' => 'Indonesia',
            'description' => 'Kota Pahlawan pusat bisnis dan bandara penghubung utama Juanda.',
            'image' => 'https://images.unsplash.com/photo-1620215754668-3e4b781a7d65?w=800',
            'is_featured' => true,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // 8. Tours
        $tourId = DB::table('tours')->insertGetId([
            'region_id' => $regionId,
            'category_id' => $catId,
            'title' => 'Open Trip Bromo Sunrise Premium',
            'slug' => 'open-trip-bromo-sunrise-premium',
            'duration_days' => 1,
            'duration_nights' => 0,
            'departure_city' => 'Malang',
            'price' => 300000.00,
            'price_original' => 350000.00,
            'description' => 'Petualangan menyaksikan golden sunrise Gunung Bromo dengan Jeep 4x4, bukit Widodaren, kawah Bromo, dan pasir berbisik.',
            'includes' => 'Jeep 4x4, Tiket Masuk Bromo, Driver & Guide, Air Mineral',
            'excludes' => 'Pengeluaran Pribadi, Tips Guide',
            'image' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
            'is_featured' => true,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Tour Departures
        DB::table('tour_departures')->insert([
            ['tour_id' => $tourId, 'departure_date' => now()->addDays(2)->format('Y-m-d'), 'return_date' => now()->addDays(2)->format('Y-m-d'), 'available_seats' => 12, 'total_seats' => 20, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['tour_id' => $tourId, 'departure_date' => now()->addDays(5)->format('Y-m-d'), 'return_date' => now()->addDays(5)->format('Y-m-d'), 'available_seats' => 8, 'total_seats' => 20, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Tour Itineraries
        DB::table('tour_itineraries')->insert([
            ['tour_id' => $tourId, 'day_number' => 1, 'title' => 'Midnight Pickup & Sunrise Hunt', 'description' => 'Penjemputan di Malang Kota pukul 00:00 WIB, perjalanan ke rest area Bromo, ganti Jeep 4x4 menuju Penanjakan 1 untuk sunrise.', 'meals' => 'B', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 9. Hotels
        DB::table('hotels')->insert([
            [
                'name' => 'Grand Cakra Hotel Malang',
                'slug' => 'grand-cakra-hotel-malang',
                'city' => 'Malang',
                'country' => 'Indonesia',
                'stars' => 4,
                'rating' => 4.5,
                'address' => 'Jl. Green Boulevard No. 2, Malang',
                'description' => 'Hotel bintang 4 premium dengan akses cepat ke jalan tol Malang-Surabaya.',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Swiss-Belinn Airport Surabaya',
                'slug' => 'swiss-belinn-airport-surabaya',
                'city' => 'Sidoarjo',
                'country' => 'Indonesia',
                'stars' => 3,
                'rating' => 4.2,
                'address' => 'Jl. Raya Juanda No. 188, Sidoarjo',
                'description' => 'Pilihan hotel transit terbaik sangat dekat dengan Bandara Juanda.',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        // 10. Flights
        DB::table('flights')->insert([
            [
                'airline' => 'Garuda Indonesia',
                'flight_number' => 'GA-290',
                'origin_airport' => 'SUB',
                'destination_airport' => 'CGK',
                'origin_city' => 'Surabaya',
                'destination_city' => 'Jakarta',
                'departure_time' => now()->addDays(1)->setTime(8, 0),
                'arrival_time' => now()->addDays(1)->setTime(9, 30),
                'cabin_class' => 'economy',
                'price' => 1450000.00,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'airline' => 'Singapore Airlines',
                'flight_number' => 'SQ-930',
                'origin_airport' => 'SUB',
                'destination_airport' => 'SIN',
                'origin_city' => 'Surabaya',
                'destination_city' => 'Singapore',
                'departure_time' => now()->addDays(2)->setTime(10, 15),
                'arrival_time' => now()->addDays(2)->setTime(13, 30),
                'cabin_class' => 'economy',
                'price' => 2200000.00,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        // 11. Promos
        DB::table('promos')->insert([
            [
                'code' => 'BUMALANG',
                'title' => 'Promo Perdana Bhakti Utama',
                'description' => 'Potongan langsung Rp 15.000 untuk pemesanan shuttle Malang Kota.',
                'discount_type' => 'fixed',
                'discount_value' => 15000.00,
                'min_booking_amount' => 130000.00,
                'start_date' => now()->subDay(),
                'end_date' => now()->addMonths(3),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'code' => 'BUWISATA',
                'title' => 'Libur Seru Bareng BU',
                'description' => 'Diskon 10% untuk Paket Open Trip Bromo Sunrise.',
                'discount_type' => 'percentage',
                'discount_value' => 10.00,
                'min_booking_amount' => 200000.00,
                'start_date' => now()->subDay(),
                'end_date' => now()->addMonths(2),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        // 12. Site Settings
        DB::table('site_settings')->insert([
            ['key' => 'site_name', 'value' => 'Bhakti Utama Travel', 'group' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'tagline', 'value' => 'The Excellent Service', 'group' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'hotline', 'value' => '082 1199 8809', 'group' => 'contact', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'email', 'value' => 'info@bhaktiutamatravel.id', 'group' => 'contact', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
