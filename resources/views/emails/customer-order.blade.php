@extends('emails.mail.email-template')
@section('content')
    <tr>
        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top"
            class="subTitle">
            <h4 class="text"
                style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">
                Subject Name: Order Placed</h4>
        </td>
    </tr>
    <tr>
        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
            {{--            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style=""> --}}
            {{--                <tbody> --}}
            {{--                <tr> --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order ID:  {{$data['id']}}</p> --}}
            {{--                    </td> --}}
            {{--                    @foreach ($data['orderItem'] as $item) --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Product Name:  {{$item['product_name']}}</p> --}}
            {{--                    </td> --}}
            {{--                    @endforeach --}}

            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Quantity:  {{$data['item_qty']}}</p> --}}
            {{--                    </td> --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">shipment days:  {{$data['shipment_days']}}</p> --}}
            {{--                    </td> --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">shipment price:  {{$data['shipment_price']}}</p> --}}
            {{--                    </td> --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order status:  {{$data['status']}}</p> --}}
            {{--                    </td> --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order Sub Total:  {{$data['sub_total']}}</p> --}}
            {{--                    </td> --}}
            {{--                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> --}}
            {{--                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Order Total Amount:  {{$data['total_amount']}}</p> --}}
            {{--                    </td> --}}
            {{--                </tr> --}}
            {{--                </tbody> --}}
            {{--            </table> --}}








            <table border="0" align="center" cellpadding="0" cellspacing="0" width="100%"
                style="max-width:600px;background:#ffffff;padding:0px 25px">
                <tbody>
                    <tr>
                        <td style="margin:0;padding:0">
                            <br>
                            <table border="0" cellpadding="20" cellspacing="0" width="100%"
                                style="color:#000000;line-height:150%;text-align:left;font:300 16px &#39;Helvetica Neue&#39;,Helvetica,Arial,sans-serif">
                                <tbody>
                                    <tr>
                                        <td valign="top" style="font-size:24px;">
                                            <span style="text-decoration:underline;">Order ID: {{ $data['id'] }}</span>
                                            <h2
                                                style="display:inline-block;font-family:Arial;font-size:24px;font-weight:bold;margin-top:5px;margin-right:0;margin-bottom:5px;margin-left:0;text-align:left;line-height:100%">
                                                {{ $data['shipment_days'] }}</h2>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" cellspacing="0" cellpadding="6" width="95%"
                                style="border:0;color:#000000;line-height:150%;text-align:left;font:300 14px/30px &#39;Helvetica Neue&#39;,Helvetica,Arial,sans-serif;"
                                border=".5px">
                                <thead>
                                    <tr style="background:#efefef">
                                        <th scope="col" width="30%" style="text-align:left;border:1px solid #eee">
                                            Product</th>
                                        <th scope="col" width="15%" style="text-align:right;border:1px solid #eee">
                                            Quantity</th>
                                        <th scope="col" width="20%" style="text-align:right;border:1px solid #eee">
                                            Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($data['orderItem'] as $item)
                                        <tr width="100%">
                                            <td width="30%"
                                                style="text-align:left;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0;word-wrap:break-word">
                                                {{ $item['product_name'] }}
                                            </td>
                                            <td width="15%"
                                                style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                                                {{ $item['product']['qty'] }}
                                            </td>
                                            <td width="20%"
                                                style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                                                <span>Rs.190</span></td>
                                        </tr>
                                </tbody>
                                @endforeach
                                <tfoot>
                                    <tr>
                                        <th scope="row" colspan="2"
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                                            Order Subtotal </th>
                                        <th
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                                            <span>{{ $data['sub_total'] }}</span></th>
                                    </tr>
                                    <tr>
                                        <th scope="row" colspan="2"
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                                            Shipment Days</th>
                                        <td
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                                            <span>{{ $data['shipment_days'] }}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colspan="2"
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                                            Order status </th>
                                        <td
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                                            <span>{{ $data['status'] }}</span></td>
                                    </tr>

                                    <tr>
                                        <th scope="row" colspan="2"
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                                            Shipment Price </th>
                                        <td
                                            style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                                            <span>{{ $data['shipment_price'] }}</span></td>
                                    </tr>

                                    <tr>
                                        <th scope="row" colspan="2"
                                            style="text-align:right;background:#efefef;text-align:right;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                                            Order Total Amount</th>
                                        <td
                                            style="background:#efefef;text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0;color:#7db701;font-weight:bold">
                                            <span>{{ $data['total_amount'] }}</span></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <br>
                            <br>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
@endsection
