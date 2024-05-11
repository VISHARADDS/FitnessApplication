package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/todo-items")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoItemController {

    @Autowired
    private TodoItemService todoItemService;

    @GetMapping
    public List<TodoItem> getAllTodoItems() {
        return todoItemService.getAllTodoItems();
    }

    @GetMapping("/item/{taskId}")
    public ResponseEntity<TodoItem> getTodoItemByTaskId(@PathVariable("taskId") String taskId) {
        Optional<TodoItem> todoItem = todoItemService.getTodoItemByTaskId(taskId);
        return todoItem.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    //add
//    @PostMapping("/addItem")
//    public ResponseEntity<TodoItem> createOrUpdateTodoItem(@RequestBody TodoItem todoItem) {
//        TodoItem savedTodoItem = todoItemService.createOrUpdateTodoItem(todoItem);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodoItem);
//    }

    @PostMapping("/addItem")
    public ResponseEntity<TodoItem> createOrUpdateTodoItem(@RequestBody Map<String,String> payload) {
        return new ResponseEntity<TodoItem>(todoItemService.createOrUpdateTodoItem(payload.get("taskId"),payload.get("todoId"),payload.get("task"),payload.get("description")), HttpStatus.CREATED);
    }
    //delete
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<Void> deleteTodoItemById(@PathVariable("taskId") String taskId) {
        todoItemService.deleteTodoItem(taskId);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/update/{taskId}")
    public ResponseEntity<TodoItem> updateTodoItem(@PathVariable String taskId, @RequestBody Map<String, String> payload) {
        try {
            TodoItem updatedTodoItem = todoItemService.updateTodoItem(taskId, payload.get("task"), payload.get("description"));
            return ResponseEntity.ok(updatedTodoItem);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


}
