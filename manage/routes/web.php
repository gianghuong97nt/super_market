<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts/glance');
})->name('home');


//Route::get('/login', function () {
//    return view('auth/login');
//});



// Route cho phần đổi chức năng thông tin người dùng

Route::get('/personalInfo', function (){
   return view('personalInfo/info');
});

Route::get('/product', function (){
    return view('product/index')-> with('paging',2);
});

// chi tiết sản phẩm
Route::get('/product/detail', function (){
    return view('product/detail');
});

// Sửa sản phẩm
Route::get('/product/edit', function (){
    return view('product/edit');
});


/**
 * --------------------------Route cho phần login, logout---------------------------------------
 */

//Route login

Route::get('/login', 'LoginController@login')->name('login');

//Check login
Route::post('/checkLogin', 'LoginController@checkLogin')->name('checkLogin');

// Route logout

Route::get('/logout', 'LoginController@logout')->name('logout');
