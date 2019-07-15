<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPassword;

class ResetPasswordController extends Controller
{
    //
    public function index(){
        return view('emails.resetPassword');
    }

    public function reset(Request $request){
        $data = $request->all();
//      giangtt@ans-asia.com

        $title = 'Test';
        $email =    $request->email;
        $data['content']        =   'Test Content';
        $data['name']    		=   'Name Test';
        $data['password']       =   '12345678';

        if($email) {
            \Mail::send('emails.subject_mail', $data, function ($message) use ($title, $email) {
                $message->to($email)
                    ->subject($title);
            });
            $status= 200;
        }else{
            $status= 201;
        }

        return response()->json($status);
    }
}
