<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;
use Illuminate\Support\Facades\Validator;
//use Illuminate\Support\Facades\File;

use DB;
use Session;
use File;



class UserController extends Controller
{
    //

    public function personalInfo(){
        // lay thong tin nguoi dung
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $username = session('users');
                $user = Dao::call_stored_procedure('SPC_USERS_INQ01',array($username));
                return view('personalInfo.info')
                    -> with('user', $user[0]);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }

    }

    public function updatePersonalInfo(Request $request){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $param = $request->all();
                $request->session()->forget('avatar');
                $data = Dao::call_stored_procedure('[SPC_USERS_ACT02]', $param);

                session([
                    'avatar'=>$data[1][0]['avata'],
                ]);
                if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') { //SQL Exception
                    $result = array(
                        'status' => '202',
                        'data' => $data[0],
                    );
                } else if ($data[0][0]['Data'] != '') { //Data Validate
                    $result = array(
                        'status' => '201',
                        'data' => array($data[0]),
                    );
                } else {// OK
                    $result = array(
                        'status' => '200',
                        'data' => '',
                    );
                }

            } catch (Exception $e) {
                $result = array(
                    'status' => 'EX',
                    'data' => $e->getMessage(),
                );
            }

            return response()->json($result);
        }

    }

    public function uploadImage(Request $request)
    {
        if(!session('users')){
            return redirect('/login');
        }else{
            $validator = Validator::make($request->all(),
                [
                    'file' => 'image',
                ],
                [
                    'file.image' => 'The file must be an image (jpeg, png, bmp, gif, or svg)'
                ]);
            if ($validator->fails())
                return array(
                    'fail' => true,
                    'errors' => $validator->errors()
                );
            $extension = $request->file('file')->getClientOriginalExtension();
            $dir = 'uploads/';
            $filename = uniqid() . '_' . time() . '.' . $extension;
            $request->file('file')->move($dir, $filename);

            return $filename;
        }


    }


    public function deleteImage(Request $request)
    {
        if(!session('users')){
            return redirect('/login');
        }else{
            $filename = $request->input('filename');
            File::delete('uploads/' . $filename);
        }

    }

}
