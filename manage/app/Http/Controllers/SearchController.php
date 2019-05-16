<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;

class SearchController extends Controller
{
    //
    function search(Request $request){
        $param = $request->all();
        try {
            $data  = Dao::call_stored_procedure('SPC_SEARCH_INQ01',$param);

            if((isset($data[0][0]['link'])?$data[0][0]['link']:'') == 'product'){

                $result = [
                    'status' => 'product'
                ];
            }
            else if ((isset($data[0][0]['link'])?$data[0][0]['link']:'') == 'personalInfo'){
                $result = [
                    'status' => 'personalInfo'
                ];
            }
            else if ((isset($data[0][0]['link'])?$data[0][0]['link']:'') == 'product/detail'){
                $result = [
                    'status' => 'product/detail'
                ];
            }else{
                $result = [
                    'status' => 'NG'
                ];
            }
            return response()->json($result);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
    }
}
