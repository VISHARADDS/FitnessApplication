package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface WorkoutRepository extends MongoRepository<Workout, ObjectId> {

    Optional<Workout> findByWorkoutId(String workoutId);


    List<Workout> findByReviewIdsContaining(Review review);

    Optional<Workout> findByUsername(String username);


    ;
}
