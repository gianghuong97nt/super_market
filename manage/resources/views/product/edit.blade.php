@extends('layouts.glance')

@section('link')
    <link href="{{asset('asset/css/edit_pro.css')}}" rel='stylesheet' type='text/css' />
@endsection
@section('tag')
    <script src="{{ asset('js/updateProduct.js') }}"></script>
@endsection
@section('content')
    <div class="forms tables">
        <div class="row">
            <div class="d-inline">
                <h2 class="title1">Sửa sản phẩm</h2>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 btn-btn d-inline">
                <button type="button" class="btn btn-success btn-2" id="btn-update">Update</button>
                <a href="{{url('/product')}}"><button type="button" class="btn btn-success btn-2 btn-back">Back</button></a>
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
                            <input type="text" class="form-control" id="product_id_update" disabled value="{{$product[0]['product_id']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Tên sản phẩm</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="product_name_update" value="{{$product[0]['product_name']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Danh mục</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select class="category" id="category_update">
                                <option value="{{$product[0]['category_id']}}">{{$product[0]['name']}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Nhà cung cấp</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="supplier_update" value="{{$product[0]['supplier']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Hãng</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="brand_update" value="{{$product[0]['brand']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Màu sắc</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="color_update" value="{{$product[0]['color']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Cỡ</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="size_update" value="{{$product[0]['size']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Số lượng</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="quantity_update" value="{{$product[0]['quantity']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giá nhập</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="price_core_update" value="{{$product[0]['price_core']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giá bán</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="price_sale_update" value="{{$product[0]['price_sale']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ghi chú</label>
                        </div>
                        <div class="col-md-6 col-md-6 col-sm-6 col-xs-12">
                            <textarea class="form-control" id="note_update">{{$product[0]['note']}}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


