@extends('emails.mail.email-template')
@section('content')
    <tr>
        <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi "John Doe"</h2>
        </td>
    </tr>
    <tr>
        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
            <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">{{$data['subject_name']}}</h4>
        </td>
    </tr>
    <tr>
        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                <tbody>
                <tr>
                    <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                        <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> {{$data['message']}}</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
                <tbody>
                <tr>
                    <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" align="center">
                            <tbody>
                            <tr>
                                <td style="background-color: rgb(0, 210, 244); padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href="{{ $otp }}" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Confirm Email</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
@endsection
