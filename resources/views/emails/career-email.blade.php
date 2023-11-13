@extends('emails.mail.email-template')
@section('content')
    <h1>Hello</h1>

    <p>You have just received a new Curriculum Vitae (CV) from a candidate applying for the role
        of {{$jobTitle}}.</p>

    <p>Please see the attached CV.</p>

    <p style="padding-top:10px;">Best regards,</p>
    <p>SJ Computers LLC</p>
@endsection
