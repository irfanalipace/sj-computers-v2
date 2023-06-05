<!DOCTYPE html>
<html>

<head>

    <meta charset=“UTF-8” />

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href={{ asset('favicon.png') }} />
    <!-- <link href={{ asset('/css/bootstrap.css') }}> -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5KJ773M');</script>
<!-- End Google Tag Manager -->


    <title>SJ-Computers</title>

</head>


<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5KJ773M"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
    <div id="root"></div>

    <noscript>

        You need to enable JavaScript to run this app.

    </noscript>
    <script>
        let times = window.localStorage.getItem('cacheCleared')
        if(!times || times === 1){
                    window.location.reload(true);
                    window.localStorage.setItem('cacheCleared', times +1)
        }  

    </script>

    <script src={{ asset(mix('/js/app.js')) }}></script>

    


</body>


</html>
