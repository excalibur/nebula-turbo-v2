<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title>登录</title>
</head>
<body>
<c:if test="${fn:contains(crequestScope.shiroLoginFailure,'AuthenticationException')}">
    登录错误
</c:if>


<form action="/login" method="post">
    <input name="username">
    <input name="password">
    <button>登录</button>
</form>
</body>
</html>
