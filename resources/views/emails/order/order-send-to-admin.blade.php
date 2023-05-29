@extends('emails.mail.order')
@section('content')
    <table align="center" cellspacing="0" cellpadding="6" width="95%"
        style="border: 0; color: #000000; line-height: 150%; text-align: left; font: 300 14px/30px 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        border=".5px">
        <thead>
            <tr style="background: #efefef">
                <th scope="col" style="text-align: center; border: 1px solid #eee">Customer Detail</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align: left; border: 1px solid #eee">
                    <p style="margin: 0; margin-bottom: 10px; padding: 0;">
                        <strong>Name:</strong> {{ $data['userInfo']['name'] }}
                    </p>
                    <p style="margin: 0; margin-bottom: 10px; padding: 0;"><strong>Email:</strong> <a
                            href="mailto:{{ $data['userInfo']['email'] }}"
                            target="_blank">{{ $data['userInfo']['email'] }}</a>
                    </p>
                    <p style="margin: 0; margin-bottom: 10px; padding: 0;"><strong>Shipping
                            Phone:</strong> {{ $data['OrderAddress']['phone_number'] }}</p>
                    <p style="margin: 0; margin-bottom: 10px; padding: 0;"><strong>Shipping
                            Address:</strong> {{ $data['OrderAddress']['address'] }}</p>
                </td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <table border="0" cellpadding="20" cellspacing="0" width="100%"
        style="color:#000000;line-height:150%;text-align:left;font:200 16px &#39;Helvetica Neue&#39;,Helvetica,Arial,sans-serif">
        <tbody>
            <tr>
                <td valign="top" style="font-size:18px;">
                    <span style="text-decoration:underline;">Order No: {{ $data['order']['id'] }}</span>
                    <!--                         <h2 style="display:inline-block;font-family:Arial;font-size:24px;font-weight:bold;margin-top:5px;margin-right:0;margin-bottom:5px;margin-left:0;text-align:left;line-height:100%">(April 25, 2016)</h2> -->
                </td>
            </tr>
        </tbody>
    </table>
    <table align="center" cellspacing="0" cellpadding="6" width="95%"
        style="border:0;color:#000000;line-height:150%;text-align:left;font:300 14px/30px &#39;Helvetica Neue&#39;,Helvetica,Arial,sans-serif;"
        border=".5px">
        <thead>
            <tr style="background:#efefef">
                <th scope="col" width="30%" style="text-align:left;border:1px solid #eee">Product
                </th>
                <th scope="col" width="15%" style="text-align:right;border:1px solid #eee">ASIN
                </th>
                <th scope="col" width="15%" style="text-align:right;border:1px solid #eee">Quantity
                </th>
                <th scope="col" width="20%" style="text-align:right;border:1px solid #eee">Price
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data['order']['orderItem'] as $item)
                <tr width="100%">
                    <td width="30%"
                        style="text-align:left;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0;word-wrap:break-word">
                        {{ $item['product_name'] ?? 0 }}
                    </td>
                    <td width="15%"
                        style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                        {{ $item['product']['asin'] ?? '-' }}
                    </td>
                    <td width="15%"
                        style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                        {{ $item['qty'] ?? 0 }}
                    </td>
                    <td width="20%"
                        style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                        <span>
                            $ {{ number_format((float) $item['product']['price'], 2, '.', '') }}
                        </span>
                    </td>
                </tr>
            @endforeach
        </tbody>

        <tfoot>
            <tr>
                <th scope="row" colspan="3"
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                    Estimated Delivery Day
                </th>
                <th
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                    <span>{{ $data['orderDetail']['estimate_day'] }}</span>
                </th>
            </tr>
            <tr>
                <th scope="row" colspan="3"
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                    Delivery Price
                </th>
                <td
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                    <span>$ {{ number_format((float) $data['orderDetail']['shipment_amount'], 2, '.', '') }}</span>
                </td>
            </tr>
            <tr>
                <th scope="row" colspan="3"
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                    Total Quantity
                </th>
                <td
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                    <span>{{ $data['orderDetail']['item_qty'] }}</span>
                </td>
            </tr>

            <tr>
                <th scope="row" colspan="3"
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                    Sub Total
                </th>
                <td
                    style="text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0">
                    <span>$ {{ number_format((float) $data['orderDetail']['sub_total'], 2, '.', '') }}</span>
                </td>
            </tr>

            <tr>
                <th scope="row" colspan="3"
                    style="text-align:right;background:#efefef;text-align:right;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:0;border-top:0">
                    Order Total
                </th>
                <td
                    style="background:#efefef;text-align:right;vertical-align:middle;border-left:1px solid #eee;border-bottom:1px solid #eee;border-right:1px solid #eee;border-top:0;color:#7db701;font-weight:bold">
                    <span>$ {{ number_format((float) $data['orderDetail']['total_amount'], 2, '.', '') }}</span>
                </td>
            </tr>
        </tfoot>
    </table>
    <br>
    <br>
@endsection
