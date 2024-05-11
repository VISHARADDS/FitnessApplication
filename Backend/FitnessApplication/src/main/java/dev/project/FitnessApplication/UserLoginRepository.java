package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserLoginRepository extends MongoRepository<UserLogin, ObjectId> {
    Optional<UserLogin> findByUserName(String userName);

    Optional<UserLogin> findByEmail(String email);
}
