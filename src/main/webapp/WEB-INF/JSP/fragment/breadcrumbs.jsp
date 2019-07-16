<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<ul class="breadcrumbs">
    <c:choose>
        <c:when test="${article != null }">
            <c:set var="category" value="${CATEGORY_MAP[article.idCategory] }"/>
            <li><a href="${pageContext.request.contextPath}/news">Home</a></li>
            <li><a href="/news${category.url }">${category.name}</a></li>
            <li>${article.shortTitle}</li>
        </c:when>
        <c:when test="${selectedCategory != null }">
            <li><a href="${pageContext.request.contextPath}/news">Home</a></li>
            <li>${selectedCategory.name}</li>
        </c:when>
        <jsp:useBean id="isNewsPage" scope="request" type=""/>
        <c:when test="${isNewsPage}">
            <li>Home</li>
        </c:when>
        <c:otherwise>
            <li><a href="${pageContext.request.contextPath}/news">Home</a></li>
        </c:otherwise>
    </c:choose>
</ul>