@extends('layouts.glance')


@section('content')
    <div class="forms">
        <h2 class="title1">Personal Information</h2>
        <button type="submit" class="btn btn-primary submit2">Update</button>
        <div class="form-grids row widget-shadow" data-example-id="basic-forms">
            <div class="form-body">
                <form>
                    <div class="form-group">
                            <label for="userID" class="inline">User ID</label>
                            <input  type="text" class="form-control inline" id="userID" value="{{'112'}}">
                    </div>
                    <div class="form-group">
                        <label for="username" class="inline">Username</label>
                        <input  type="text" class="form-control inline" id="username" value="{{'Giang'}}">
                    </div>
                    <div class="form-group">
                        <label for="email" class="inline">Email address</label>
                        <input type="email" class="form-control inline" id="email" value="{{'giang@gmail.com'}}">
                    </div>
                    <div class="form-group">
                        <label for="phone" class="inline">Phone Number</label>
                        <input type="text" class="form-control inline" id="phone" value="{{'0969344759'}}">
                    </div>

                    <div class="form-group">
                        <label for="address" class="inline">Birthday</label>
                        <input type="date" class="form-control inline" id="birthday" value="{{'04/14/1997'}}">
                    </div>

                    <div class="form-group">
                        <label for="password" class="inline">Password</label>
                        <input type="password" class="form-control inline" id="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="repassword" class="inline">Confirm Password</label>
                        <input type="password" class="form-control inline" id="repassword" placeholder="Confirm Password">
                    </div>
                    <div class="form-group">
                        <label for="address" class="inline">Address</label>
                        <input type="text" class="form-control inline" id="address" value="{{'Thái Bình'}}">
                    </div>
                    <div class="form-group">
                        <label class="inline">Gender</label>
                        <select class="inline">
                                <option>Male</option>
                                <option>Female</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <div class="inline "><label for="avatar">Avatar</label></div>
                        <div class="inline ">
                            <img src="{{'asset/images/cuc.png'}}" style="height: 25%; width: 25%">
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>

@endsection


