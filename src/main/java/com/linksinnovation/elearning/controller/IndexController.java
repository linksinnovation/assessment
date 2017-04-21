package com.linksinnovation.elearning.controller;

import com.linksinnovation.elearning.service.CommentService;
import com.linksinnovation.elearning.service.jsengine.ReactRenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Controller
@RequestMapping("/")
public class IndexController {

    private final CommentService commentService;
    private final ReactRenderService reactRenderService;

    @Autowired
    public IndexController(CommentService commentService, ReactRenderService reactRenderService) {
        this.commentService = commentService;
        this.reactRenderService = reactRenderService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        return "index";
    }

    @RequestMapping(value = {"{path:(?!oauth|api|assets|error|images|ViewerJS|files|flowplayer).*$}", "{path:(?!oauth|api|assets|error|images|ViewerJS|files|flowplayer).*$}/**"}, method = RequestMethod.GET)
    public String index(@PathVariable("path") String path, Model model) {
        //String content = reactRenderService.render("renderServer", commentService.findAll());
        //model.addAttribute("content", content);
        return "index";
    }

}
