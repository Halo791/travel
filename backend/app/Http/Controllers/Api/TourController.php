<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TourController extends Controller
{
    /**
     * Display a listing of tour packages with optional filtering.
     */
    public function index(Request $request)
    {
        try {
            $query = DB::table('tours')
                ->where('is_active', true);

            // Filter by search query
            if ($request->has('search') && !empty($request->search)) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('departure_city', 'like', "%{$search}%");
                });
            }

            // Filter by category
            if ($request->has('category_id') && !empty($request->category_id)) {
                $query->where('category_id', $request->category_id);
            }

            // Filter by region
            if ($request->has('region_id') && !empty($request->region_id)) {
                $query->where('region_id', $request->region_id);
            }

            // Filter by price range
            if ($request->has('price_min')) {
                $query->where('price', '>=', $request->price_min);
            }
            if ($request->has('price_max')) {
                $query->where('price', '<=', $request->price_max);
            }

            // Sort options
            $sortBy = $request->input('sort_by', 'created_at');
            $sortOrder = $request->input('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Paginate results
            $tours = $query->paginate(9);

            return response()->json([
                'success' => true,
                'data' => $tours
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified tour package detail.
     */
    public function show($slug)
    {
        try {
            $tour = DB::table('tours')
                ->where('slug', $slug)
                ->where('is_active', true)
                ->first();

            if (!$tour) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tour package not found.'
                ], 404);
            }

            // Fetch departures
            $departures = DB::table('tour_departures')
                ->where('tour_id', $tour->id)
                ->where('is_active', true)
                ->orderBy('departure_date', 'asc')
                ->get();

            // Fetch itineraries
            $itineraries = DB::table('tour_itineraries')
                ->where('tour_id', $tour->id)
                ->orderBy('day_number', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'tour' => $tour,
                    'departures' => $departures,
                    'itineraries' => $itineraries
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
