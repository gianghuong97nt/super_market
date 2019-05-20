@extends('layouts.glance')
@section('title')
    <title>Thông tin cá nhân</title>
@endsection
@section('link')
    <link href="{{asset('asset/css/form_info_personal.css')}}" rel='stylesheet' type='text/css' />
@endsection
@section('tag')
    <script src="{{ asset('js/personalInfo.js') }}"></script>
@endsection
@section('content')
    <div class="forms tables">
        <div class="row">
            <div class="d-inline">
                <h2 class="title1">Thông tin cá nhân</h2>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 btn-btn d-inline">
                <a href="{{'http://localhost:8005'}}"><button type="button" class="btn btn-success btn-2 btn-back">Back</button></a>
                <button type="button" class="btn btn-success btn-2" id="save_info" name="btn-save-info">Save</button>
            </div>
        </div>
        <div class="form-grids row widget-shadow">
            {{--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">--}}
            <div>
                <div class="form-body">
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info" >User ID</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="userID" disabled value="{{$user[0]['user_id']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Tên</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="userName" disabled value="{{$user[0]['user_name']}}" maxlength="20"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Email</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" name="email" class="form-control" id="email" value="{{$user[0]['email']}}" maxlength="50"/>
                            <span class="error display_view" id="invalid_email"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">SĐT</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="tel" class="form-control" id="phone" value="{{$user[0]['phone']}}" maxlength="12"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ngày sinh</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="date" class="form-control" id="birthday" value="{{$user[0]['birthday']}}"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Mật khẩu</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="password" class="form-control" id="passwordInfo" value="{{$user[0]['password']}}" maxlength="20"/>
                            <span class="error display_view" id="invalid_password"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Xác nhận</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="password" class="form-control" id="repassword" value="{{$user[0]['password']}}" maxlength="20"/>
                            <span class="error display_view" id="invalid_repassword"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Địa chỉ</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" class="form-control" id="address" value="{{$user[0]['address']}}" maxlength="50"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Giới tính</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select class="form-control" id="gender">
                                <option {{$user[0]['gender']==0?'selected':''}} value="0">Male</option>
                                <option {{$user[0]['gender']==1?'selected':''}} value="1">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
                            <label class="form-control label-info">Ảnh</label>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div style="" id="avatar">
                                <img style="width: 100%; height: 100%; margin-left: 0px" id="preview_image" src="{{isset($user[0]['avata'])&&$user[0]['avata']!=''?'uploads/'.$user[0]['avata']:'uploads/cuc.jpg'}}" />
                                <i id="loading" class="fa fa-spinner fa-spin fa-3x fa-fw" style="position: absolute;left: 40%;top: 40%;display: none"></i>
                            </div>
                            <p>
                                <a href="javascript:changeProfile()" style="text-decoration: none;">
                                    <i class="glyphicon glyphicon-edit"></i> Change
                                </a>&nbsp;&nbsp;
                                <a href="javascript:removeFile()" style="color: red;text-decoration: none;">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            </p>
                            <input type="file" id="file" style="display: none"/>
                            <input type="hidden" id="file_name"/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


