<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Incre Sci</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="${social_googleplus_clientId }">

    <link rel="stylesheet" type="text/css" href="/static/css/foundation.css">
    <link rel="stylesheet" type="text/css" href="/static/css/app.css">
    <link rel="stylesheet" type="text/css"
          href="http://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css">

    <!-- Main Stylesheet File -->
    <link href="/static/css/style.css" rel="stylesheet">

    <!-- Bootstrap CSS File -->
    <link href="/static/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Libraries CSS Files -->
    <%--    <link href="/static/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">--%>
    <link href="/static/lib/animate/animate.min.css" rel="stylesheet">
    <link href="/static/lib/ionicons/css/ionicons.min.css" rel="stylesheet">
    <link href="/static/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="/static/lib/lightbox/css/lightbox.min.css" rel="stylesheet">

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>

<!--==========================
  Header
============================-->
<header id="header">
    <jsp:include page="fragment/header.jsp"/>
</header><!-- #header -->

<!--==========================
    Intro Section
  ============================-->
<section id="intro">
    <c:if test="${currentPage == 'page/news.jsp'}">
        <jsp:include page="fragment/navigation.jsp"/>
    </c:if>
</section><!-- #intro -->

<!--==========================
    Categories Section
  ============================-->
<div class="row">
    <%-- <nav role="navigation" class="large-12 small-6 medium-8 columns">
         <jsp:include page="fragment/breadcrumbs.jsp"/>
     </nav>--%>

    <div class="small-6 medium-4 columns">
        <jsp:include page="fragment/categories-dropdown.jsp"/>
    </div>
</div>

<!--==========================
    Main Section
  ============================-->
<section class="row">
    <div class="large-1"></div>
    <div id="mainContent" class="large-10 columns" style="min-height: 600px;">
        <jsp:include page="${currentPage }"/>
    </div>
    <div class="columns large-1 show-for-large right" data-sticky-container style="margin-top: 75px">
        <div class="sticky categories show-for-large" data-sticky data-anchor="mainContent">
            <jsp:include page="fragment/categories-table.jsp"/>
        </div>
    </div>
</section>

<!--==========================
    Footer Section
  ============================-->
<footer class="footer">
    <jsp:include page="fragment/footer.jsp"/>
</footer>


<!--==========================
    Script
  ============================-->
<script src="/static/js/jquery.js"></script>
<script src="/static/js/what-input.js"></script>
<script src="/static/js/foundation.js"></script>
<script src="/static/js/messages.jsp"></script>
<script src="/static/js/app.js"></script>

<!-- JavaScript Libraries -->
<script src="/static/lib/jquery/jquery.min.js"></script>
<script src="/static/lib/jquery/jquery-migrate.min.js"></script>
<script src="/static/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/static/lib/easing/easing.min.js"></script>
<script src="/static/lib/superfish/hoverIntent.js"></script>
<script src="/static/lib/superfish/superfish.min.js"></script>
<script src="/static/lib/wow/wow.min.js"></script>
<script src="/static/lib/waypoints/waypoints.min.js"></script>
<script src="/static/lib/counterup/counterup.min.js"></script>
<script src="/static/lib/owlcarousel/owl.carousel.min.js"></script>
<script src="/static/lib/isotope/isotope.pkgd.min.js"></script>
<script src="/static/lib/lightbox/js/lightbox.min.js"></script>
<script src="/static/lib/touchSwipe/jquery.touchSwipe.min.js"></script>

<!-- Template Main Javascript File -->
<script src="/static/js/main.js"></script>

<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

</body>
</html>