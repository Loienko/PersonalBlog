package net.ukr.dreamsicle.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class AbstractFilter implements Filter {
    protected final Logger LOGGER = LoggerFactory.getLogger(getClass());

    public abstract void doFilter(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }


    public final void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        doFilter(req, res, chain);
    }

    @Override
    public void destroy() {

    }
}
