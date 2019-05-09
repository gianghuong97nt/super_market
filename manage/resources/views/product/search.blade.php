<table class="table table-bordered tbl_product">
    <thead>
        <tr class="product">
            <th>Mã </th>
            <th>Tên SP </th>
            <th>Danh mục</th>
            <th>Hãng</th>
            <th>Nhà CC</th>
            <th>SL </th>
            <th>Màu</th>
            <th>Cỡ</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Note</th>
            <th class="action"><a class="btn btn-primary" id="btn-add-row-1" href="{{'http://localhost:8005/product/detail'}}"><i class="fa fa-plus" aria-hidden="true"></i></a></th>
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
            <td class="action">
                <a class="btn btn-danger btn-remove-row-1"><i class="fas fa-trash-alt" aria-hidden="true"></i></a>
                <a href="{{ url('/product/'.$product['id'].'/edit') }}" class="btn btn-warning btn-update-row-1"><i class="fas fa-edit"></i></a>
                {{--<a href="{{'http://localhost:8005/product/edit'}}" class="btn btn-warning btn-update-row-1"><i class="fas fa-edit"></i></a>--}}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
<div class="col-md-12">
    <div class="mt-15 panel-footer-search pull-right pagination_product" id="loadProduct">
        {!!Paging::show($paging,0)!!}
    </div>
</div>