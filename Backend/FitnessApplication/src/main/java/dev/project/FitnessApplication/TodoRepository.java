package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<Todo, ObjectId> {
    Optional<Todo> findByTodoId(String todoId);

    @Query("{'todo.taskId': ?0}")
    Optional<Todo> findByTaskId(String taskId);


    List<Todo> findByUserName(String userName);
}
