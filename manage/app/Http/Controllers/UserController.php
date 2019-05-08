<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;

class UserController extends Controller
{
    //

    public function personalInfo(){
        // lay thong tin nguoi dung
        try {
            $username = session('users');
            $user = Dao::call_stored_procedure('SPC_USERS_INQ01',array($username));
            return view('personalInfo.info')
                -> with('user', $user[0]);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
    }

    public function updatePersonalInfo(Request $request){
        try {
            $param = $request->all();


            $data = Dao::call_stored_procedure('[SPC_USERS_ACT02]', $param);

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
