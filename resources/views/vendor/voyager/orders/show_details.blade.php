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
                            <h3 class="panel-title">name</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{$invoiceOrder->user->shippingAddress->full_name ?? '' }}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Phone Number</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{$invoiceOrder->user->shippingAddress->phone_number ?? ''}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Email</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->email ?? ''}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Address</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <p>{{ $invoiceOrder->user->shippingAddress->address ?? ''}}</p>
                    </div>
                    <hr style="margin:0;">

                    <div class="panel-heading" style="border-bottom:0;">
                        <h3 class="panel-title">Order items</h3>
                    </div>
                    <div class="panel-body" style="padding-top:0;">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Product quantity</th>
                                <th>Product price</th>
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
@endsection
