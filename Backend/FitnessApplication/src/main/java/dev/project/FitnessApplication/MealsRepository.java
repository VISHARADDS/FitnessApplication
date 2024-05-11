package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealsRepository extends MongoRepository<Meals, ObjectId> {
    Optional<Meals> findMealsByMealRef(String mealRef);

    void deleteByMealRef(String mealRef);

}
