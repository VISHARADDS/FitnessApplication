package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, ObjectId> {



    Optional<WorkoutPlan> findByExerciseId(String exerciseId);

    void deleteByWorkoutId(String workoutId);
}
