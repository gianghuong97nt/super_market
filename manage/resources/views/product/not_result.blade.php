<div class="row" >
    <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12">
        <label class="form-control label-info">Số trang hiển thị</label>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <select id="page_size">
            <option value="5" style="text-align: center">5</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
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
    <tr>
        <td colspan="12" style="text-align: center; color: red"> Không có bản ghi nào phù hợp</td>

    </tr>
    </tbody>
</table>
