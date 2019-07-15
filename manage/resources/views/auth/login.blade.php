<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>

    <script src="{{ asset('asset/js/jquery-1.11.1.min.js') }}"></script>
    <link rel="stylesheet" href="{{asset('asset_login/css/style.css')}}">
</head>
<body>
<div class="form">
    <div class="form-toggle"></div>
    <div class="form-panel one">
        <div class="form-header">
            <h1>Login</h1>
            <span class="error display_view" id="checkLogin"></span>
        </div>
        <div class="form-content">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required="required" value="<?php if(isset($_COOKIE['username'])){
                    echo($_COOKIE['username']);
                } ?>"/>
                <span class="error display_view" id="invalid_username"></span>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required="required" value="<?php if(isset($_COOKIE['password'])){
                    echo($_COOKIE['password']);
                } ?>"/>
                <span class="error display_view" id="invalid_password"></span>
            </div>
            <div class="form-group">
                <label class="form-remember">
                    <input type="checkbox" <?php if(isset($_COOKIE['password'])){
                        echo 'checked';
                    } ?>  id="remember_me"/>Remember Me
                </label><a class="form-recovery" href="#" id="forgot_password">Forgot Password?</a>
            </div>
            <div class="form-group">
                <button type="submit" id="login">Log In</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{asset('js/common.js')}}"></script>
<script type="text/javascript" src="{{ asset('js/login.js') }}"></script>

</body>

</html>
