@extends('emails.mail.email-template')
@section('content')
    <tr>
        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
            <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Subject Name: Order Placed</h4>
        </td>
    </tr>
    <tr>
        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                <tbody>
                <tr>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order ID:  {{$data['id']}}</p>
                    </td>
                    @foreach ($data['orderItem'] as $item)
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Product Name:  {{$item['product_name']}}</p>
                    </td>
                    @endforeach
                   
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Quantity:  {{$data['item_qty']}}</p>
                    </td>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">shipment days:  {{$data['shipment_days']}}</p>
                    </td>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">shipment price:  {{$data['shipment_price']}}</p>
                    </td>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order status:  {{$data['status']}}</p>
                    </td>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order Sub Total:  {{$data['sub_total']}}</p>
                    </td>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order Total Amount:  {{$data['total_amount']}}</p>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
@endsection
