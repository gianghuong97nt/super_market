<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{

    public function login(){
        return view('auth.login');
    }

    /**
     * Dùng để đăng  nhập cho admin
     * lấy thông tin form
     */

    public function checkLogin(Request $request){
        $params = $request->all();
        unset($params['remember_me']);

        $get_user = Dao::call_stored_procedure('[SPC_USERS_ACT01]',$params);

        session([
            'users'=>$get_user[2][0]['user_name'],
        ]);

        session([
            'avatar'=>$get_user[2][0]['avata'],
        ]);


        if((isset($get_user[1][0]['result'])?$get_user[1][0]['result']:'') == 'ok'){
            try{
                $remember_me=$request->remember_me;
                $year = time() + 31536000;
                if ($remember_me=='true') {
                    setcookie('remember_me',$remember_me,$year);
                    setcookie('username',$params['username'],$year);
                    setcookie('password',$params['password'],$year);
                }
                else{
                    setcookie('remember_me',NULL,$year);
                    setcookie('username','',$year);
                    setcookie('password','',$year);
                }
            } catch (\Exception $e) {
            }
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

    /**
     * Phương thức đăng xuất
     * Xóa hết các session trong phiên làm việc hiện tại
     * Redirect login
     */
    public function logout(Request $request){
        $request->session()->flush();
        return redirect()->route('login');
    }
}
