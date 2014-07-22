<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="application"/>
<c:set var="assets" value="${ctx}/assets" scope="application"/>
<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>

    <meta charset="utf-8">
    <title>网校通后台管理—登录</title>
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="${assets}/img/favicon.ico">
    <link rel="apple-touch-icon" href="${assets}/img/icon57.png" sizes="57x57">
    <link rel="apple-touch-icon" href="${assets}/img/icon72.png" sizes="72x72">
    <link rel="apple-touch-icon" href="${assets}/img/icon76.png" sizes="76x76">
    <link rel="apple-touch-icon" href="${assets}/img/icon114.png" sizes="114x114">
    <link rel="apple-touch-icon" href="${assets}/img/icon120.png" sizes="120x120">
    <link rel="apple-touch-icon" href="${assets}/img/icon144.png" sizes="144x144">
    <link rel="apple-touch-icon" href="${assets}/img/icon152.png" sizes="152x152">
    <link rel="stylesheet" href="${assets}/components/bootstrap/css/bootstrap.min.css">

</head>
<body class="login">
<div id="login-container">
    <div id="login-logo">
        <a href="">
            <img src="${assets}/img/template/uadmin_logo.png" alt="logo">
        </a>
    </div>
    <div id="login-buttons">
        <h5 class="page-header-sub">Login with..</h5>
        <button id="login-btn-facebook" class="btn btn-primary"><i class="fa fa-facebook"></i> Facebook</button>
        <button id="login-btn-twitter" class="btn btn-info"><i class="fa fa-twitter"></i> Twitter</button>
        <button id="login-btn-email" class="btn btn-default">or Email <i class="fa fa-envelope"></i></button>
    </div>
    <form id="login-form" action="index.php" method="post" class="form-horizontal">
        <div class="form-group">
            <a href="javascript:void(0)" class="login-back"><i class="fa fa-arrow-left"></i></a>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <div class="input-group">
                    <input type="text" id="login-email" name="login-email" placeholder="Email.." class="form-control">
                    <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <div class="input-group">
                    <input type="password" id="login-password" name="login-password" placeholder="Password.." class="form-control">
                    <span class="input-group-addon"><i class="fa fa-asterisk fa-fw"></i></span>
                </div>
            </div>
        </div>
        <div class="clearfix">
            <div class="btn-group btn-group-sm pull-right">
                <button type="button" id="login-button-pass" class="btn btn-warning" data-toggle="tooltip" title="Forgot pass?"><i class="fa fa-lock"></i></button>
                <button type="submit" class="btn btn-success"><i class="fa fa-arrow-right"></i> Login</button>
            </div>
            <label id="topt-fixed-header-top" class="switch switch-success pull-left" data-toggle="tooltip" title="Remember me"><input type="checkbox"><span></span></label>
        </div>
    </form>
</div>

<script src="//lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js"></script>
<script>!window.jQuery && document.write('<script src="${assets}/components/jquery/jquery.min.js">\x3C/script>');</script>
<script src="${assets}/components/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>
