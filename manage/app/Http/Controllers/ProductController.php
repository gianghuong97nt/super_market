<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;

class ProductController extends Controller
{
    //
    public function index(){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $data  = Dao::call_stored_procedure('SPC_PRODUCT_INQ01');
                return view('product.index')
                    -> with('categories', $data[0]);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }
    }
    //
    public function search(Request $request){
        //$params = $request->all();
        $params = $request->json()->all();
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $product  = Dao::call_stored_procedure('SPC_PRODUCT_FND01',$params);

                if($product[1][0]['totalRecord'] != 0){
                    return view('product.search')
                        -> with('products', $product[0])
                        -> with('paging', $product[1][0]);
                }else{
                    return view('product.not_result');
                }



            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }

    }

    //phan trang cho san pham
    public function load(Request $request){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $params = $request->json()->all();
                $product = Dao::call_stored_procedure('SPC_PRODUCT_FND01',$params);

                return view('product.search')
                    -> with('products', $product[0])
                    -> with('paging', $product[1][0]);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }

    }

    //sua san pham
    public function edit($id){
        if(!session('users')){
            return redirect('/login');
        }else{
            $data   = array($id);
            try {
                $product  = Dao::call_stored_procedure('[SPC_PRODUCT_INQ2]',$data);
                return view('product.edit')
                    -> with('product', $product[0]);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }

    }

    //update san pham
    public function update(Request $request){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $param = $request->all();


                $data = Dao::call_stored_procedure('SPC_PRODUCT_ACT02', $param);

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

    // Add new product

    public function detail(){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $data  = Dao::call_stored_procedure('SPC_PRODUCT_INQ01');
                return view('product.detail')
                    -> with('categories', $data[0]);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
            }
        }

    }

    public function add(Request $request){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $param = $request->all();


                $data = Dao::call_stored_procedure('SPC_PRODUCT_ACT02', $param);

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

    public function delete(Request $request){
        if(!session('users')){
            return redirect('/login');
        }else{
            try {
                $param = $request->all();

                $data = Dao::call_stored_procedure('SPC_PRODUCT_ACT3', $param);

                if ($data[0][0]['Data'] == 'Exception' || $data[0][0]['Data'] == 'EXCEPTION') { //SQL Exception
                    $result = array(
                        'status' => '202',
                        'data' => $data[0],
                    );
                } else if ($data[0][0]['Data'] != '') {
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

}
