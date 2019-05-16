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

//Route::get('/product', function (){
//    return view('product/index')-> with('paging',2);
//});

// chi tiết sản phẩm
//Route::get('/product/detail', function (){
//    return view('product/detail');
//});

// Sửa sản phẩm
//Route::get('/abc', function (){
//    return view('auth/index');
//});
//
//Route::post('/upload', function (){
//    return view('auth/upload');
//});


/**
 * --------------------------Route cho phan login, logout---------------------------------------
 */


//Route login

Route::get('/login', 'LoginController@login')->name('login');

//Check login
Route::post('/checkLogin', 'LoginController@checkLogin')->name('checkLogin');

// Route logout

Route::get('/logout', 'LoginController@logout')->name('logout');



/**
 * ---------------------------------------------------------------------------------------------
 * --------------------------Route cho thong tin ca nhan ---------------------------------------
 * ---------------------------------------------------------------------------------------------
 */
// Route thong tin ca nhan
Route::get('/personalInfo', 'UserController@personalInfo')->name('personalInfo');


//Route update thong tin ca nhan
Route::post('/updatePersonalInfo', 'UserController@updatePersonalInfo')->name('updatePersonalInfo');


/**
 * ---------------------------------------------------------------------------------------------
 * --------------------------Route cho san pham ---------------------------------------
 * ---------------------------------------------------------------------------------------------
 */

// Route san pham
Route::get('/product', 'ProductController@index')->name('product');

// Route tim kiem san pham
Route::post('/product/search', 'ProductController@search')->name('product.search');

//Route phan trang
Route::post('/product/load', 'ProductController@load')->name('product.load');

//Route edit san pham
//Route::get('/product/{id}/edit', 'ProductController@edit')->name('product.edit');
Route::post('/product/edit', 'ProductController@edit')->name('product.edit');
Route::get('/product/edit', 'ProductController@edit')->name('product.edit');



// Route tim kiem san pham
Route::post('/product/update', 'ProductController@update')->name('product.update');


// Add new product
Route::get('/product/detail', 'ProductController@detail')->name('product.detail');


// Route store san pham da the,
Route::post('/product/add', 'ProductController@add')->name('product.add');


//Route delete product
Route::post('/product/delete', 'ProductController@delete')->name('product.delete');


////Back product
//Route::post('/product/back', 'ProductController@back')->name('product.back');


//Route Anh
Route::post('/upload', 'UserController@uploadImage');

Route::post('/deleteImage', 'UserController@deleteImage')->name('deleteImage');


//Tim kiếm theo key
Route::post('/search', 'SearchController@search')->name('search');

