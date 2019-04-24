@extends('layouts.glance')
@section('link')
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    @endsection
@section('content')
    <div class="tables">
        <h2 class="title1">Danh sách sản phẩm</h2>
        <div class="panel-body widget-shadow">
            <table class="table">
                <thead>
                <tr>
                    <th>Mã </th>
                    <th>Tên sản phẩm</th>
                    <th>Tên danh mục</th>
                    <th>Màu sắc</th>
                    <th>Size</th>
                    <th>Hãng</th>
                    <th>Giá nhập vào</th>
                    <th>Giá bán ra</th>
                    <th>Số lượng </th>
                    <th>Nhà cung cấp</th>
                    <th>Note</th>
                    <th><a class="btn btn-success" id="btn-add-row-1"><i class="fa fa-plus" aria-hidden="true"></i></a></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">001</th>
                    <td>Mark</td>
                    <td>Đỏ</td>
                    <td>Đỏ</td>
                    <td>Nhỏ</td>
                    <td>Samsung</td>
                    <td>11000000</td>
                    <td>13000000</td>
                    <td>12</td>
                    <td>TD</td>
                    <td></td>
                    <td>
                        <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                        <a class="btn btn-warning btn-update-row-1"><i class="fas fa-check"></i></a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">002</th>
                    <td>Mark</td>
                    <td>Đỏ</td>
                    <td>Đỏ</td>
                    <td>Nhỏ</td>
                    <td>Samsung</td>
                    <td>11000000</td>
                    <td>13000000</td>
                    <td>12</td>
                    <td>TD</td>
                    <td></td>
                    <td>
                        <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                        <a class="btn btn-warning btn-update-row-1"><i class="fas fa-check"></i></a>
                    </td>
                </tr>
                <tr>
                    <th scope="row">003</th>
                    <td>Mark</td>
                    <td>Đỏ</td>
                    <td>Đỏ</td>
                    <td>Nhỏ</td>
                    <td>Samsung</td>
                    <td>11000000</td>
                    <td>13000000</td>
                    <td>12</td>
                    <td>TD</td>
                    <td></td>
                    <td>
                        <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                        <a class="btn btn-warning btn-update-row-1"><i class="fas fa-check"></i></a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
@endsection