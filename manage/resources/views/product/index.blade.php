@extends('layouts.glance')
@section('link')
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link href="{{asset('asset/css/table_product.css')}}" rel='stylesheet' type='text/css' />
    <link href="{{asset('asset/css/form_search_pro.css')}}" rel='stylesheet' type='text/css' />
@endsection
@section('content')
    <div class="tables">
        <h2 class="title1">Danh sách sản phẩm</h2>
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-2 btn-btn">
                <button type="button" class="btn btn-success btn-2">Search</button>
                <a href="{{'http://localhost:8005'}}"><button type="button" class="btn btn-success btn-2">Back</button></a>
            </div>
        </div>
            <div class="panel-body bs-example widget-shadow" >
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <span class="condition">Điều kiện tìm kiếm</span>
                    <div class="form-grids row widget-shadow" data-example-id="basic-forms">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Mã sản phẩm</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="product_id" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Tên sản phẩm</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="product_name" value="{{'Tu lanh Sharp'}}"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Danh mục</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="category"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Nhà cung cấp</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="supplier"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Hãng</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="brand"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Màu sắc</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="color"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Cỡ</label>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="size"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                        <tr class="product">
                            <th>Mã </th>
                            <th>Tên SP </th>
                            <th>Danh mục</th>
                            <th>Nhà CC</th>
                            <th>Hãng</th>
                            <th>SL </th>
                            <th>Màu</th>
                            <th>Cỡ</th>
                            <th>Giá nhập</th>
                            <th>Giá bán</th>
                            <th>Note</th>
                            <th><a class="btn btn-primary" id="btn-add-row-1" href="{{'http://localhost:8005/product/detail'}}"><i class="fa fa-plus" aria-hidden="true"></i></a></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="id" scope="row">001</td>
                            <td class="product_name">Mark</td>
                            <td class="category">Tivi</td>
                            <td class="brand">SAM SUNG</td>
                            <td class="supplier">TH</td>
                            <td class="quantity">12</td>
                            <td class="color">Đỏ</td>
                            <td class="size">Nhỏ</td>
                            <td class="price_core">11,000,000</td>
                            <td class="price_sale">13,000,000</td>
                            <td class="note"></td>
                            <td class="action">
                                <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                                <a href="{{'http://localhost:8005/product/edit'}}" class="btn btn-warning btn-update-row-1"><i class="fas fa-edit"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td class="id" scope="row">001</td>
                            <td class="product_name">Mark</td>
                            <td class="category">Tivi</td>
                            <td class="brand">SAM SUNG</td>
                            <td class="supplier">TH</td>
                            <td class="quantity">12</td>
                            <td class="color">Đỏ</td>
                            <td class="size">Nhỏ</td>
                            <td class="price_core">11,000,000</td>
                            <td class="price_sale">13,000,000</td>
                            <td class="note"></td>
                            <td class="action">
                                <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                                <a href="{{'http://localhost:8005/product/edit'}}" class="btn btn-warning btn-update-row-1"><i class="fas fa-edit"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td class="id" scope="row">001</td>
                            <td class="product_name">Mark</td>
                            <td class="category">Tivi</td>
                            <td class="brand">SAM SUNG</td>
                            <td class="supplier">TH</td>
                            <td class="quantity">12</td>
                            <td class="color">Đỏ</td>
                            <td class="size">Nhỏ</td>
                            <td class="price_core">11,000,000</td>
                            <td class="price_sale">13,000,000</td>
                            <td class="note"></td>
                            <td class="action">
                                <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                                <a href="{{'http://localhost:8005/product/edit'}}" class="btn btn-warning btn-update-row-1"><i class="fas fa-edit"></i></a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        <div class="col-md-12">
            <div class="mt-15 panel-footer-search pull-right">
                {!!Paging::show($paging,0)!!}
            </div>
        </div>
    </div>
@endsection