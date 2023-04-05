@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <p>Your Email has been successfully verified, please login to continue</p>
                        <a class="btn btn-success" href="{{ route('home') }}">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
