@extends('voyager::master')

@section('page_header')
    <h1 class="page-title">
        Order details
    </h1>
    @include('voyager::multilingual.language-selector')
@stop

@section('content')
    <div class="page-content read container-fluid">
        <div class="row">
            <div class="col-md-12">

                <div class="panel panel-bordered" style="padding-bottom:5px;">
                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Name</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{$invoiceOrder->user->shippingAddress->full_name ?? $invoiceOrder->guest->full_name }}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Phone Number</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{$invoiceOrder->user->shippingAddress->phone_number ?? $invoiceOrder->guest->phone_number}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Email</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->email ?? $invoiceOrder->guest->email}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Address</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->address ?? $invoiceOrder->guest->address}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Country</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->country ?? $invoiceOrder->guest->country}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">City</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->city ?? $invoiceOrder->guest->city}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">State</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->state ?? $invoiceOrder->guest->state}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Zipcode</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->zip_code ?? $invoiceOrder->guest->zip_code}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Order items</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Quantity</th>
                                <th>Product Price</th>
                            </tr>
                            </thead>
                            @foreach($invoiceOrder->orderItem as $orderItem)
                                <tr>
                                    <td>{{$orderItem->product_name}}</td>
                                    <td>{{$orderItem->qty}}</td>
                                    <td>{{$orderItem->price}}</td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
