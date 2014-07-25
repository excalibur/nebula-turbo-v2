<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="application"/>
<c:set var="assets" value="${ctx}/assets" scope="application"/>
<!DOCTYPE html>
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
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

    <link rel="stylesheet" href="${assets}/components/animate.css/animate.min.css">
    <link rel="stylesheet" href="${assets}/components/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="${assets}/components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="${assets}/components/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css">
    <link rel="stylesheet" href="${assets}/css/login.css">
</head>
<body class="login">
<div id="login-container">
    <div id="login-logo">
        <a href="">
            <img src="${assets}/img/template/uadmin_logo.png" alt="logo">
        </a>
    </div>

    <form id="login-form" action="index.php" method="post" class="form-horizontal">
        <div class="form-group">
            <a href="javascript:void(0)" class="login-back"><i class="fa fa-arrow-down"></i></a>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <div class="input-group">
                    <input type="text" id="login-email" name="email" placeholder="Email.." class="form-control">
                    <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-12">
                <div class="input-group">
                    <input type="password" id="login-password" name="password" placeholder="密码.."
                           class="form-control">
                    <span class="input-group-addon"><i class="fa fa-asterisk fa-fw"></i></span>
                </div>
            </div>
        </div>
        <div class="clearfix">
            <div class="btn-group btn-group-sm pull-right">
                <a href="#" class="btn btn-warning" data-toggle="tooltip"
                        title="忘记密码了?"><i class="fa fa-lock"></i></a>
                <button type="submit" class="btn btn-success"><i class="fa fa-arrow-right"></i> 登录</button>
            </div>
            <div class="input-switch pull-left" data-toggle="tooltip" title="记住我一周" data-on="success" data-off="danger" data-on-label="<i class='fa fa-check fa-white'></i>" data-off-label="<i class='fa fa-times'></i>">
                <input type="checkbox" name="rememberMe" checked>
            </div>
        </div>
    </form>
    <div id="login-buttons">
        <h4 class="text-left">第三方帐号登录</h4>
        <a id="login-btn-qq" class="btn btn-primary" href="#"><i class="fa fa-qq"></i> 腾讯QQ</a>
        <a id="login-btn-weibo" class="btn btn-info" href="#"><i class="fa fa-weibo"></i> 新浪微博</a>
    </div>
</div>

<script src="//lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js"></script>
<script>!window.jQuery && document.write('<script src="${assets}/components/jquery/jquery.min.js">\x3C/script>');</script>
<script src="${assets}/components/bootstrap/js/bootstrap.min.js"></script>
<script src="${assets}/components/bootstrap-switch/js/bootstrap-switch.min.js"></script>
<script src="${assets}/js/login.js"></script>
</body>
</html>
