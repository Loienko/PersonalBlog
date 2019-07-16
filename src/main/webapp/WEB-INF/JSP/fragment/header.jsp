<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>

<div class="container-fluid">
    <div id="logo" class="pull-left">
        <h1><a href="/news" class="scrollto">Incre Sci</a></h1>
    </div>
    <nav id="nav-menu-container">
        <ul class="nav-menu">
            <li class="menu-active"><a href="/news">Домой</a></li>
            <li class="menu-has-children"><a href="">Категории</a>
                <ul>
                    <li><a href="/news/quasiScience">Квазинаука</a></li>
                    <li><a href="/news/future">Будущее</a></li>
                    <li><a href="/news/universe">Вселенная</a></li>
                    <li><a href="/news/medicine">Медицина</a></li>
                    <li><a href="/news/heroesInScience">Супер герои в науке</a></li>
                    <li><a href="/news/interestingFacts">Интересные факты</a></li>
                </ul>
            </li>
            <li><a href="/about">Обо мне</a></li>
            <li><a href="/contact">Обратная связь</a></li>
            <li>
                <div class="container">
                    <form action="/search" method="get">
                        <input id="search" class="search-txt" name="query" placeholder="Поиск"
                               type="text" value="${searchQuery }">
                        <span class="search-box-addon">
                            <i class="fa fa-search"></i>
                        </span>
                    </form>
                </div>
            </li>
        </ul>
    </nav>
</div>