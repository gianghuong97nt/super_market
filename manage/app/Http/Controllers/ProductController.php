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
        $params = $request->all();
        try {
            $product  = Dao::call_stored_procedure('SPC_PRODUCT_FND01',$params);
            return view('product.search')
                -> with('products', $product[0])
                -> with('paging', $product[1][0]);
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
    }
}
