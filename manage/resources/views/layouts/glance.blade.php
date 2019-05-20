<!--
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>
<head>
    @yield('title')
    @include('partials.head')
    @yield('link')
</head>

<body class="cbp-spmenu-push">
<div class="main-content">
@include('partials.sidebar')
<!--left-fixed -navigation-->

    <!-- header-starts -->
@include('partials.header')
<!-- //header-ends -->
    <!-- main content start-->
    <div id="page-wrapper">
        <div class="main-page">
            @yield('content')
        </div>
    </div>
    <!--footer-->
@include('partials.footer')
<!--//footer-->
</div>

<!-- new added graphs chart js-->

@include('partials.main')
@yield('tag')

</body>
</html>