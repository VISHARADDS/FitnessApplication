package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {

    void deleteByWorkoutId(String workoutId);

    boolean existsByReviewId(String reviewId);

    Review findByReviewId(String reviewId);



}
