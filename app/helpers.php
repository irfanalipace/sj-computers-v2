<?php

use App\Enums\StatusEnum;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

function generateSlug($data)
{
    return trim(strtolower(str_replace(' ', '', $data)));
}

/* search  */
function searchWhere($columns, $search)
{
    $where = [];
    foreach ($columns as $column) {
        $where[] = [$column, 'like', '%' . $search . '%'];
    }
    return $where;
}

function bulkUpdateStatus($request, $modelName)
{
    $ids = $request->ids;
    $ids = validateInput($ids);
    checkExistingIDs($modelName, $ids);
    // Update the status column
    $updated = $modelName::whereIn('id', $ids)->update(['status' => $request->action]);
    return $updated;
}

function validateInput($ids)
{

    // Check if $ids is empty or not an array
    if (empty($ids) || !is_array($ids)) {
        throw new Exception('Invalid input');
    }

    $ids = array_filter($ids, function($id) {
        // Validate UUID v4
        if (preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $id)) {
            return true;
        }
        // Validate numeric
        return is_numeric($id);
    });

    // Check if any valid IDs exist
    if (empty($ids)) {
        throw new Exception('No valid IDs provided');
    }
    return $ids;
}

function checkExistingIDs($modelName, $ids)
{
    // Get the count of existing records with the given IDs
    $existingCount = $modelName::whereIn('id', $ids)->count();

    // Check if the count matches the number of IDs provided
    if ($existingCount !== count($ids)) {
        throw new Exception('One or more IDs not found in the database');
    }
}

// upload check image
function uploadMediaStorage($media,$directory)
{
    $extension = $media->getClientOriginalExtension();
    $fileName = Carbon::now()->format('YmdHis') . rand(100000, 999999) . '.' . $extension;
    
    $path = Storage::disk('public')->putFileAs($directory, $media, $fileName);
    return [
        'file_name' => $fileName,
        'file_path' => asset('storage/' . $path),
    ];
}
