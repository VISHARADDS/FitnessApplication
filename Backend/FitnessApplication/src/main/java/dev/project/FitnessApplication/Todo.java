package dev.project.FitnessApplication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Todo")
public class Todo {

    @Id
    private ObjectId id;
    private String todoId;
    private String userName;


    @DocumentReference
    private List<TodoItem> todo = new ArrayList<>();




}