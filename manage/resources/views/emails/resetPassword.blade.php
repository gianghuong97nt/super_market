<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>

    <script src="{{ asset('asset/js/jquery-1.11.1.min.js') }}"></script>
    <link rel="stylesheet" href="{{asset('asset_login/css/style.css')}}">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>
<body>
<div class="container" style="margin-top: 200px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="text-center">
                        <h3><i class="fa fa-lock fa-4x"></i></h3>
                        <h2 class="text-center">Forgot Password?</h2>
                        <p>You can reset your password here.</p>
                        <div class="panel-body">
                            <div class="form-group">
                                <div class="input-group" style="width: 298px">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                    <input id="email_address" placeholder="email address" class="form-control"  type="email">
                                </div>
                            </div>
                            <div class="form-group">
                                <input id="btn_reset_password" class="btn btn-primary"
                                       value="Reset Password" type="submit">
                            </div>
                            <input type="hidden" class="hide" name="token" id="token" value="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/mail.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/common.js') }}"></script>
</body>
</html>