package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoItemService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoItemRepository todoItemRepository;

    public List<TodoItem> getAllTodoItems() {
        return todoItemRepository.findAll();
    }

    public Optional<TodoItem> getTodoItemById(ObjectId id) {
        return todoItemRepository.findById(id);
    }

    public TodoItem createOrUpdateTodoItem(TodoItem todoItem) {
        Optional<Todo> optionalTodo = todoRepository.findByTodoId(todoItem.getTodoId());
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.getTodo().add(todoItem); // Adding TodoItem to Todo's list
            todoRepository.save(todo); // Saving updated Todo object
            return todoItemRepository.save(todoItem); // Saving TodoItem separately
        } else {
            // Handle case where no matching Todo is found with the given todoId
            // For example, throw an exception or return null
            return null; // or throw new TodoNotFoundException("Todo not found with todoId: " + todoItem.getTodoId());
        }
    }


    public void deleteTodoItem(String taskId) {
        // Find the TodoItem by its taskId
        TodoItem deletedItem = (TodoItem) todoItemRepository.findByTaskId(taskId).orElse(null);
        if (deletedItem != null) {
            // Delete the TodoItem
            todoItemRepository.delete(deletedItem);

            // Fetch the corresponding Todo object
            Optional<Todo> optionalTodo = todoRepository.findByTodoId(deletedItem.getTodoId());

            if (optionalTodo.isPresent()) {
                Todo todo = optionalTodo.get();

                // Remove the TodoItem from the Todo object
                todo.getTodo().removeIf(item -> item.getTaskId().equals(taskId));

                // Save the updated Todo object
                todoRepository.save(todo);
            }
        }

    }

    public TodoItem updateTodoItem(String taskId, String task, String description) throws ChangeSetPersister.NotFoundException {
        Optional<TodoItem> optionalTodoItem = todoItemRepository.findByTaskId(taskId);
        if (((Optional<?>) optionalTodoItem).isPresent()) {
            TodoItem todoItem = optionalTodoItem.get();
            todoItem.setTask(task);
            todoItem.setDescription(description);
            return todoItemRepository.save(todoItem);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }



    public Optional<TodoItem> getTodoItemByTaskId(String taskId) {
        return todoItemRepository.findByTaskId(taskId);
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    public TodoItem createOrUpdateTodoItem(String taskId, String todoId, String task, String description) {
        TodoItem todoItem = todoItemRepository.insert(new TodoItem(taskId,todoId,task,description));

        mongoTemplate.update(Todo.class)
                .matching(Criteria.where("todoId").is(todoId))
                .apply(new Update().push("todo").value(todoItem))
                .first();

        return todoItem;
    }
}