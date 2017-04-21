package com.linksinnovation.elearning.service;

import com.linksinnovation.elearning.model.Comment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Service
public class CommentService {

    private static final List<Comment> comments = new ArrayList<>();

    public List<Comment> findAll() {
        return CommentService.comments;
    }

    public Comment save(Comment comment) {
        CommentService.comments.add(comment);
        return comment;
    }

    public List<Comment> save(List<Comment> comments) {
        CommentService.comments.addAll(comments);
        return CommentService.comments;
    }
}
