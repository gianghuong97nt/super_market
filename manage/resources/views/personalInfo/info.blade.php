@extends('layouts.glance')

@section('link')
    <link href="{{asset('asset/css/form_info_personal.css')}}" rel='stylesheet' type='text/css' />
@endsection
@section('content')
    <div class="forms tables">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-2 btn-btn">
                <h2 class="title1">Personal Information</h2>
                <button type="button" class="btn btn-success btn-2">Save</button>
                <a href="{{'http://localhost:8005'}}"><button type="button" class="btn btn-success btn-2">Back</button></a>
            </div>
        </div>
        <div class="panel-body bs-example widget-shadow" data-example-id="basic-forms">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-body">
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info" >User ID</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="userID" disabled value="{{'112'}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Tên</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="username" value="{{'Giang'}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Email</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="email" value="{{'giang@gmail.com'}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">SĐT</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="phone" value="{{'0969344759'}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ngày sinh</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="date" class="form-control" id="birthday" value="{{'04/14/1997'}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Mật khẩu</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="password" class="form-control" id="password" placeholder="Password"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Xác nhận MK</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="password" class="form-control" id="repassword" placeholder="Confirm Password"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Địa chỉ</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="address" value="{{'Thái Bình'}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giới tính</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" id="gender">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ảnh</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <img src="{{'asset/images/cuc.png'}}" id="avatar">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


