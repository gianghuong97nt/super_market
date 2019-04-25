@extends('layouts.glance')

@section('link')
    <link href="{{asset('asset/css/edit_pro.css')}}" rel='stylesheet' type='text/css' />
@endsection
@section('content')
    <div class="forms tables">
        <h2 class="title1">Sửa sản phẩm</h2>
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-2 btn-btn">
                <button type="button" class="btn btn-success btn-2">Save</button>
                <a href="{{'http://localhost:8005/product'}}"><button type="button" class="btn btn-success btn-2">Back</button></a>
            </div>
        </div>
        <div class="panel-body bs-example widget-shadow" >
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-body">
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Mã sản phẩm</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="product_id" disabled/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Tên sản phẩm</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="product_name"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Danh mục</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select class="category">
                                <option>Ti vi</option>
                                <option>Tủ lạnh</option>
                                <option>Điều hòa nhiệt độ</option>
                            </select>
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
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Số lượng</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="quantity"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giá nhập</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="price_core"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giá bán</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="price_sale"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ghi chú</label>
                        </div>
                        <div class="col-md-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="note"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


