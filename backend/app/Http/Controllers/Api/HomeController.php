<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Get homepage data listing.
     */
    public function index()
    {
        try {
            $tours = DB::table('tours')
                ->where('is_active', true)
                ->limit(6)
                ->get();

            $hotels = DB::table('hotels')
                ->where('is_featured', true)
                ->limit(6)
                ->get();

            $flights = DB::table('flights')
                ->limit(6)
                ->get();

            $promos = DB::table('promos')
                ->where('is_active', true)
                ->limit(3)
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'tours' => $tours,
                    'hotels' => $hotels,
                    'flights' => $flights,
                    'promos' => $promos
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
