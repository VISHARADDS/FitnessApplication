package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;


    public Todo createOrUpdateTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteTodo(ObjectId id) {
        todoRepository.deleteById(id);
    }

    public Optional<Todo> getTodoByTodoId(String todoId) {
        return todoRepository.findByTodoId(todoId);
    }


    public List<Todo> getTodosByUserName(String userName) {
        return todoRepository.findByUserName(userName);
    }
}