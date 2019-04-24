<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <title>Login</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">

    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'>

    <link rel="stylesheet" href="{{asset('login/css/style.css')}}">
</head>

<body>

<div class="form">
    <div class="form-toggle"></div>
    <div class="form-panel one">
        <div class="form-header">
            <h1>Login</h1>
        </div>
        <div class="form-content">
            <form>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required="required"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required="required"/>
                </div>
                <div class="form-group">
                    <label class="form-remember">
                        <input type="checkbox"/>Remember Me
                    </label><a class="form-recovery" href="#">Forgot Password?</a>
                </div>
                <div class="form-group">
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    </div>
</div>
{{--<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>--}}


{{--<script  src="{{asset('login/js/index.js')}}"></script>--}}

</body>

</html>
