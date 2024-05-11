package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService todoService;


    //display
    @GetMapping("/{todoId}")
    public ResponseEntity<Todo> getTodoByTodoId(@PathVariable("todoId") String todoId) {
        Optional<Todo> todo = todoService.getTodoByTodoId(todoId);
        return todo.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

//add
    @PostMapping("/addTodo")
    public ResponseEntity<Todo> createOrUpdateTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoService.createOrUpdateTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable("id") ObjectId id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/username/{userName}")
    public ResponseEntity<List<Todo>> getTodosByUserName(@PathVariable("userName") String userName) {
        List<Todo> todos = todoService.getTodosByUserName(userName);
        if (!todos.isEmpty()) {
            return ResponseEntity.ok().body(todos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
