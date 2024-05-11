package dev.project.FitnessApplication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoItem {


    @Id
    private ObjectId id;
    private String taskId;
    private String todoId;
    private String task;
    private String description;

    public TodoItem(String taskId, String todoId, String task, String description) {
        this.taskId = taskId;
        this.todoId = todoId;
        this.task = task;
        this.description = description;
    }


}
