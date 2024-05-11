package dev.project.FitnessApplication;

import com.mongodb.DuplicateKeyException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String username, String description, String workoutId, String reviewId) {
        // Check if reviewId already exists
        if (reviewRepository.existsByReviewId(reviewId)) {
            throw new IllegalArgumentException("Review ID already exists");
        }

        try {
            // Attempt to insert the review
            Review review = reviewRepository.insert(new Review(username, description, workoutId, reviewId));

            // Update associated workout document
            mongoTemplate.update(Workout.class)
                    .matching(Criteria.where("workoutId").is(workoutId))
                    .apply(new Update().push("reviewIds").value(review))
                    .first();

            return review;
        } catch (DuplicateKeyException e) {
            // This block may not be reached since we're checking beforehand,
            // but it's kept here for robustness
            throw new IllegalArgumentException("Review ID already exists");
        }
    }

    @Autowired
    private WorkoutRepository workoutRepository;

    public void deleteReviewAndRemoveFromWorkout(String reviewId) {

        Review review = reviewRepository.findByReviewId(reviewId);
        if (review == null) {

            return;
        }

        List<Workout> workouts = workoutRepository.findByReviewIdsContaining(review);
        for (Workout workout : workouts) {
            workout.getReviewIds().remove(review);
            workoutRepository.save(workout);
        }
        reviewRepository.delete(review);
    }



    public Optional<Review> singleReview(String reviewId) {
        return Optional.ofNullable(reviewRepository.findByReviewId(reviewId));

    }
}
