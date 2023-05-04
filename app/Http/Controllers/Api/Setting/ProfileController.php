<?php

namespace App\Http\Controllers\Api\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    //update profile
    public function updateProfile(UpdateProfileRequest $request)
    {
        try {
            //upload picture in database field profile_pic and also file saved in Storage app/public/uploads folder
            if ($request->hasFile('profile_pic')) {
                $filename = $request->file('profile_pic')->store('public/profile_pics');
                $update['profile_pic'] = str_replace('public/', '', $filename);
            }
            //update also name
            $update['name'] = $request->name;
            $user = auth()->user()->update($update);
            return response(array('success' => true, 'data' => $user->fresh(), 'message' => "user profile updated."), 200, []);
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }
    //reset password
    public function resetPassword(ResetPasswordRequest $request)
    {
        try {

            $user = User::find(auth()->user()->id);
            //This code checks if the user's old password matches the hashed password stored in the database, and if so, updates the user's password to the new password provided by the user.
            //If the old password does not match, it returns a JSON response with a status code of 422 and an error message stating that the old password does not match.
            if (Hash::check($request->oldPassword, $user->password)) {
                $user->fill(['password' => bcrypt($request->newPassword)])->save();
            } else {
                return response()->json(array('status' => 422, 'msg' => 'old password does not match please try again.'));
            }
            return response(array('success' => true, 'data' => $user, 'message' => "user password has been changed Successfully."), 200, []);
        } catch (Exception $e) {
            return response()->json(['status' => 400, 'msg', 'Something went wrong.' . $e]);
        }
    }
}
