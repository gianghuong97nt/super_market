<div class="row" style="margin: 0">
    <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
        <label class="form-control label-info">Số trang hiển thị</label>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <select   id="page_size">
            <option value="5" style="text-align: center">5</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="mt-15 panel-footer-search pull-right pagination_product"  id="loadProduct">
            {!!Paging::show($paging,0)!!}
        </div>
    </div>
</div>

<table class="table table-bordered tbl_product">
    <thead>
        <tr class="product">
            <th class="tbl_id">Mã </th>
            <th class="tbl_name">Tên SP </th>
            <th class="tbl_category">Danh mục</th>
            <th class="tbl_brand">Hãng</th>
            <th class="tbl_supplier">Nhà CC</th>
            <th class="tbl_quantity">SL </th>
            <th class="tbl_color">Màu</th>
            <th class="tbl_size">Cỡ</th>
            <th class="tbl_price_core">Giá nhập</th>
            <th class="tbl_price_sale">Giá bán</th>
            <th class="tbl_note">Note</th>
            <th class="action tbl_action"><a class="btn btn-primary" id="btn-add-row-1" href="{{url('/product/detail')}}"><i class="fa fa-plus" aria-hidden="true"></i></a></th>
        </tr>
    </thead>
    <tbody>
    @foreach($products as $product)
        <tr>
            <td class="id" scope="row">{{$product['id']}}</td>
            <td class="product_name">{{$product['name']}}</td>
            <td class="category">{{$product['category_name']}}</td>
            <td class="brand">{{$product['brand']}}</td>
            <td class="supplier">{{$product['supplier']}}</td>
            <td class="quantity">{{$product['quantity']}}</td>
            <td class="color">{{$product['color']}}</td>
            <td class="size">{{$product['size']}}</td>
            <td class="price_core">{{$product['price_core']}}</td>
            <td class="price_sale">{{$product['price_sale']}}</td>
            <td class="note">{{$product['note']}}</td>
            <td class="tbl_action">
                {{--href="{{ url('/product/'.$product['id'].'/edit') }}"--}}
                <a productID = "{{$product['id']}}" id="btn-delete" class="btn btn-danger btn-remove-row-1"><i class="fa fa-trash"></i></a>
                <a proID = "{{$product['id']}}" class="btn btn-warning btn-update-row-1" id="btn_update"><i class="fa fa-pencil"></i></a>
                {{--<a href="{{'http://localhost:8005/product/edit'}}" class="btn btn-warning btn-update-row-1"><i class="fas fa-edit"></i></a>--}}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
