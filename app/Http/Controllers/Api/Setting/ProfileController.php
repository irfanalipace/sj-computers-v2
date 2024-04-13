<?php

namespace App\Http\Controllers\Api\Setting;

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Jobs\UpdateProfileEmailJob;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ProfileController extends BaseController
{
    //update profile
    public function updateProfile(UpdateProfileRequest $request)
    {
        try {
            $user = auth()->user();

            //upload picture in database field profile_pic and also file saved in Storage app/public/uploads folder
            if ($request->hasFile('profile_pic')) {
                $filename = $request->file('profile_pic')->store('public/profile_pics');
                $update['profile_pic'] = str_replace('public/', '', $filename);
                Log::info("Profile image updated");
            }

            //update also name
            $update['name'] = $request->name;

            // Update user's name in the database
            $user->update($update);

            UpdateProfileEmailJob::dispatch($user);

            return $this->sendResponse(auth()->user()->fresh(), "user profile updated.");
        } catch (Exception $e) {
            Log::info("Error in updating profile image");
            return $this->sendError(["msg" => ['Something went wrong.' . $e]]);
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

                return $this->sendError(["oldPassword" => ['old password does not match please try again.']]);
            }
            return $this->sendResponse($user, 'user password has been changed Successfully.');
        } catch (Exception $e) {
            return $this->sendError(["msg" => ["Something went wrong.' . $e"]]);
        }
    }
    //delete profile picture
    public function deleteProfilePic()
    {
        try {
            auth()->user()->update(['profile_pic' => null]);
            return $this->sendResponse(auth()->user()->fresh(), "user profile deleted.");
        } catch (Exception $e) {
            return $this->sendError(["msg" => ['Something went wrong.' . $e]]);
        }
    }
}
