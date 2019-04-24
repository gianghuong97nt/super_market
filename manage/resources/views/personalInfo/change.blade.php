<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <title>Personal Information</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <style>
        .form {
            margin: 0 auto;
            width: 500px;
            height: 650px;
            background: #fffeec;
        }
        .avat {
            width: 100%;
            height: 120px;
            background-image: linear-gradient(to right, #00B8F0, #007DD6);
        }
        .avat img {
            width: 120px;
            height: 120px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            border-radius: 50%;

        }
        .user {
            margin-top: 20px;
        }
        .user p {
            text-align: center;
            font-size: 25px;
            color: black;
            margin-left: 200px;
            font-weight: bold
        }
        .user i {
            float: right;
            margin-top: 10px;
            margin-right: 20px;
        }

        .info_detail {
            margin-left: 20px;
            margin-right: 20px;
        }

        .share_profile{
            margin-top: 20px;
            border-bottom: 1px solid gray;
        }

        .share_profile p {
            font-weight: bold;
            margin-left: 10px;
        }

        .profile {
            margin-top: 30px;
        }

        .profile .email {
            margin-top: 10px;
            border-bottom: 1px solid gray;
        }

        .profile .email p {
            font-weight: bold;
            margin-left: 10px;
        }

        .change_pass {
            margin-top: 30px;
        }

        .password {
            margin-top: 10px;
            border-bottom: 1px solid gray;
        }

        .password p {
            font-weight: bold;
            margin-left: 10px;
        }

        .other {
            margin-top: 30px;
        }
        .other .feedback {
            margin-top: 10px;
            border-bottom: 1px solid gray;
        }
        .other p {
            font-weight: bold;
            margin-left: 10px;
        }

    </style>
</head>

<body>


<!-- Form-->
<div class="form">
    <div class="info">
        <div class="avat">
            <img src="{{'asset/images/cuc.png'}}">
        </div>
        <div class="user">
            <p class="d-inline">Username</p>
            <i class="fas fa-edit d-inline"></i>
        </div>

    </div>
    <div class="info_detail">
        <div class="share_profile">
            <i class="fas fa-share-alt d-inline"> </i>
            <p class="d-inline">  Share Profile</p>
        </div>
        <div class="profile">
            PROFILE
            <div class="email">
                <i class="fas fa-envelope-square"></i>
                <p class="d-inline">Email</p>
            </div>
            <div class="email">
                <i class="fas fa-phone-square"></i>
                <p class="d-inline">Phone number</p>
            </div>
            <div class="email">
                <i class="fas fa-birthday-cake"></i>
                <p class="d-inline">Birthday</p>
            </div>

        </div>
        <div class="change_pass">CHANGE PASSWORD
            <div class="password">
                <i class="fas fa-unlock-alt d-inline"></i>
                <p class="d-inline">Password</p>
            </div>
        </div>
        <div class="other">OTHER
            <div class="feedback">
                <i class="fas fa-question d-inline"></i>
                <p class="d-inline">Help and feedback</p>
            </div>
        </div>
    </div>
</div>
</body>

</html>
