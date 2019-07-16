<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<section id="contact" class="section-bg wow fadeInUp">
    <div class="container">

        <div class="section-header">
            <h3>Contact Us</h3>
            <p>Напишите сообщение для связи с автором!</p>
        </div>

        <div class="d-none d-sm-block mb-5 pb-4" align="center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6988.896732958344!2d36.344373278680244!3d50.017384173015984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sru!2sua!4v1562678895930!5m2!1sru!2sua"
                    width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>

        <div class="row contact-info">
            <div class="col-md-4">
                <div class="contact-address">
                    <i class="ion-ios-location-outline"></i>
                    <h3>Адрес</h3>
                    <address><p>A108 Adam Street, NY 535022, USA</p></address>
                </div>
            </div>

            <div class="col-md-4">
                <div class="contact-phone">
                    <i class="ion-ios-telephone-outline"></i>
                    <h3>Телефонный номер</h3>
                    <p><a href="tel:+380635881641">+38(063)-588-16-41</a></p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="contact-email">
                    <i class="ion-ios-email-outline"></i>
                    <h3>Email</h3>
                    <p><a href="mailto:info@example.com">incre.sci@gmail.com</a></p>
                </div>
            </div>

        </div>

        <form action="/contact" method="post" data-abide novalidate class="contact-form">
            <c:if test="${success }">
                <div class="small-12 medium-8 columns small-centered" style="padding:0 5px;">
                    <div class="success callout">
                        <p><i class="fi-info success"></i> Your request sent! Thank you for your message</p>
                    </div>
                </div>
            </c:if>

            <div data-abide-error class="small-12 medium-8 columns small-centered"
                 style="padding: 0 5px; display: none;">
                <div class="alert callout">
                    <p>
                        <i class="fi-alert alert"></i> There are some errors in your form.
                    </p>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" name="name" class="form-control" id="name"
                           placeholder="Ваше Имя" data-rule="minlen:4"
                           data-msg="Please enter at least 4 chars"/>
                    <div class="validation"></div>
                </div>

                <div class="form-group col-md-6">
                    <input type="email" class="form-control" name="email" id="email"
                           placeholder="Ваш Email" data-rule="email"
                           data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                </div>
            </div>

            <div class="form-group">
                <textarea class="form-control" name="text" rows="5" data-rule="required"
                          data-msg="Please write something for us" placeholder="Ваше сообщение"></textarea>
                <div class="validation"></div>
            </div>

            <div class="row  columns">
                <button class="button float-center" type="submit" value="Submit">Отправить</button>
            </div>
        </form>
    </div>
</section>