@extends('layouts.glance')
@section('link')
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link href="{{asset('asset/css/table_product.css')}}" rel='stylesheet' type='text/css' />
    <link href="{{asset('asset/css/form_search_pro.css')}}" rel='stylesheet' type='text/css' />
@endsection
@section('tag')
    <script src="{{ asset('js/searchProduct.js') }}"></script>
@endsection
@section('content')
    <div class="forms tables">
        <div class="row">
            <div class="d-inline">
                <h2 class="title1">Danh sách sản phẩm</h2>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 btn-btn d-inline">
                <button type="button" class="btn btn-success btn-2" id="btn-search">Search</button>
                <a href="{{'http://localhost:8005'}}"><button type="button" class="btn btn-success btn-2 btn-back">Back</button></a>
            </div>
        </div>
            <div class="panel-body bs-example widget-shadow" >
                {{--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">--}}
                    <div class="form-grids row widget-shadow" >
                        <div class="condition">
                            <p style="color: white">Điều kiện tìm kiếm</p>
                        </div>
                        <div class="form-body">
                            <div class="row">
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Mã sản phẩm</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="product_id_search" />
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Hãng</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="brand_search"/>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Danh mục</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <select id="category_search">
                                        <option value="0"></option>
                                        @foreach($categories as $category )
                                        <option value="{{$category['category_id']}}">{{$category['name']}}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Cỡ</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="size_search"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Tên sản phẩm</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="product_name_search"/>
                                </div>
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Màu sắc</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="color_search"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                                    <label class="form-control label-info">Nhà cung cấp</label>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" class="form-control" id="supplier_search"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="table-result">
                        <table class="table table-bordered tbl_product">
                            <thead>
                            <tr class="product">
                                <th>Mã </th>
                                <th>Tên SP </th>
                                <th>Danh mục</th>
                                <th>Hãng</th>
                                <th>Nhà CC</th>
                                <th>SL </th>
                                <th>Màu</th>
                                <th>Cỡ</th>
                                <th>Giá nhập</th>
                                <th>Giá bán</th>
                                <th>Note</th>
                                <th class="action"><a class="btn btn-primary" id="btn-add-row-1" href="{{url('/product/detail')}}"><i class="fa fa-plus" aria-hidden="true"></i></a></th>
                            </tr>
                            </thead>
                        </table>
                    </div>
            </div>
    </div>
@endsection