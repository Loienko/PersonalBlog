<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<ul id="mobile-category-menu" class="categories dropdown menu align-right hide-for-large" data-dropdown-menu>
    <li><a href="javascript:void(0);">Категории</a>
        <ul class="menu" style="display: none;">
            <c:forEach var="categoryEntry" items="${CATEGORY_MAP }">
                <c:set var="cat" value="${categoryEntry.value}"/>
                <li class="${selectedCategory.id == categoryEntry.key ? 'selected ' : '' }sitem">
                    <a href="/news${cat.url }">${cat.name}</a>
                        <%--                    <span>(${cat.articles })</span>--%>
                </li>
            </c:forEach>
        </ul>
    </li>
</ul>