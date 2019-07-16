<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="${currentPage != 'page/contact.jsp'}">
    <c:if test="${currentPage != 'page/about.jsp'}">
        <%--<table>
            <tbody>
            <tr>
                <th style="width: 270px;">Категории</th>
            </tr>
            <c:forEach var="categoryEntry" items="${CATEGORY_MAP }">
                <c:set var="cat" value="${categoryEntry.value}"/>
                <tr>
                    <td class="${selectedCategory.id == categoryEntry.key ? 'selected ' : '' }item">
                        <a href="/news${cat.url }">${cat.name} <span>(${cat.articles })</span></a>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>--%>

        <div class="tablesOut" style="margin-top: 75px">
            <div class="categoryBtn">Категории</div>
            <div class="btn-group-vertical" role="group" aria-label="Basic example">
                <c:forEach var="categoryEntry" items="${CATEGORY_MAP }">
                    <c:set var="cat" value="${categoryEntry.value}"/>
                    <a id="buttonAll" class="${selectedCategory.id == categoryEntry.key ? 'selected ' : '' }item "
                       href="/news${cat.url }">
                            ${cat.name}
                    </a>
                </c:forEach>
            </div>
        </div>
    </c:if>
</c:if>

