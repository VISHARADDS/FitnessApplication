package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TodoItemRepository extends MongoRepository<TodoItem, ObjectId> {
    Optional<TodoItem> findByTaskId(String taskId);
}
