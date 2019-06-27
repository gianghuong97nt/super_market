@extends('layouts.glance')
@section('title')
    <title>Chi tiết sản phẩm</title>
@endsection
@section('link')
    <link href="{{asset('asset/css/detail_pro.css')}}" rel='stylesheet' type='text/css' />
@endsection

@section('tag')
    <script src="{{ asset('js/detailProduct.js') }}"></script>
@endsection
@section('content')
    <div class="forms tables">
        <div class="row">
            <div class="d-inline">
                <h2 class="title1">Chi tiết sản phẩm</h2>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 btn-btn d-inline">
                <button type="button" class="btn btn-success btn-2" id="btn-detail">Save</button>
                <a><button type="button" class="btn btn-success btn-2 btn-back">Back</button></a>
{{--                <a href="{{'http://localhost:8005/product'}}"><button type="button" class="btn btn-success btn-2 btn-back">Back</button></a>--}}
            </div>
        </div>
        <div class="form-grids row widget-shadow" >
            {{--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">--}}
            <div>
                <div class="form-body">
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Mã sản phẩm</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="product_id" disabled/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Tên sản phẩm</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="product_name" maxlength="20"/>
                            <span class="error display_view" id="invalid_product_name"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Danh mục</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select id="category">
                                <option value="0"></option>
                                @foreach($categories as $category )
                                    <option value="{{$category['category_id']}}">{{$category['name']}}</option>
                                @endforeach
                            </select>
                        </div>

                    </div>
                    <div class="row display_view" id="div_category">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <span  class="error display_view" id="invalid_category"></span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Nhà cung cấp</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="supplier" maxlength="20"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Hãng</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="brand" maxlength="20"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Màu sắc</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="color" maxlength="20"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Cỡ</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="size" maxlength="20"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Số lượng</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="number" min="0" max="100" step="1" class="form-control" id="quantity"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giá nhập</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="number" min="0" max="900000000" step="100000" class="form-control" id="price_core"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giá bán</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="number" min="0" max="900000000" step="100000" class="form-control" id="price_sale"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ghi chú</label>
                        </div>
                        <div class="col-md-6 col-md-6 col-sm-6 col-xs-12">
                            <textarea class="form-control" id="note" maxlength="50"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


