<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Dao;

class ProductController extends Controller
{
    //
    public function index(){
        try {
            $data  = Dao::call_stored_procedure('SPC_PRODUCT_INQ01');
            return view('product.index')
                -> with('categories', $data[0]);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
    }
    //
    public function search(Request $request){
        //$params = $request->all();
        $params = $request->json()->all();
        try {
            $product  = Dao::call_stored_procedure('SPC_PRODUCT_FND01',$params);
            return view('product.search')
                -> with('products', $product[0])
                -> with('paging', $product[1][0]);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
    }

    //phan trang cho san pham
    public function load(Request $request){
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

    //sua san pham
    public function edit($id){
        $data   = array($id);
        try {
            $product  = Dao::call_stored_procedure('[SPC_PRODUCT_INQ2]',$data);
            return view('product.edit')
                -> with('product', $product[0]);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
    }

    //update san pham
    public function update(){

    }
}
