<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    //
    //
    public function login(){
        return view('auth.login');
    }

    /**
     * Dùng để đăng  nhập cho admin
     * lấy thông tin form
     */

    public function checkLogin(Request $request){
        //validate dữ liệu đăng nhập
//        $this->validate($request, array(
//            'username' => 'required|username',
//            'password' => 'required|min:6',
//        ));

        $params = $request->all();


        $get_user = Dao::call_stored_procedure('[SPC_USERS_ACT01]',$params);

//        var_dump( $get_user[1]);
//        var_dump( $get_user[1][0]['username']);
//        exit;

        session([
            'users'=>$get_user[1][0]['user_name'],
        ]);

        $result = [
            'status' => '200'
        ];

//        session_start();
        if((isset($get_user[0][0]['result'])?$get_user[0][0]['result']:'') == 'ok'){

            $result = [
                'status' => '200'
            ];
        }
        else{
            $result = [
                'status' => 'NG'
            ];
        }

        return response()->json($result);
    }

    public function logout(){

    }
}
