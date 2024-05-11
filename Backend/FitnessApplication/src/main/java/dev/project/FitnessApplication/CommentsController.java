package dev.project.FitnessApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


    @RestController
    @RequestMapping("/api/v1/comments")
    public class CommentsController {

        @Autowired
        private CommentsService commentsService;

        @PostMapping
        public ResponseEntity<Comments> createComment(@RequestBody Map<String, String> payload) {
            return new ResponseEntity<Comments>(commentsService.createComment(payload.get("commentBody"), payload.get("author"), payload.get("mealRef")), HttpStatus.CREATED);
        }

    }


