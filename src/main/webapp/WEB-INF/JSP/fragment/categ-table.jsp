<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<c:forEach var="categoryEntry" items="${CATEGORY_MAP }">
    <c:set var="cat" value="${categoryEntry.value}"/>
    <tr>
        <td class="${selectedCategory.id == categoryEntry.key ? 'selected ' : '' }item">
            <a href="/news${cat.url }">${cat.name} </a>
                <%--            <span>(${cat.articles })</span>--%>
        </td>
    </tr>
</c:forEach>
