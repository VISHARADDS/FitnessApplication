package dev.project.FitnessApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class CommentsService {

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    public Comments createComment(String commentBody, String author, String mealRef) {
        Comments comment = commentsRepository.insert(new Comments(commentBody, author, mealRef));

        Update update = new Update().push("commentIds", comment.getCommentId());
        mongoTemplate.updateFirst(
                Query.query(Criteria.where("mealRef").is(mealRef)),
                update,
                Meals.class
        );

        return comment;
    }

}
