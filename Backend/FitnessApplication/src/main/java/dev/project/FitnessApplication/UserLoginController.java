package dev.project.FitnessApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserLoginController {

    @Autowired
    private UserLoginService userLoginService;


    @PostMapping("/addUser")
    public ResponseEntity<UserLogin> addWorkout(@RequestBody UserLogin userLogin) {
        UserLogin savedUser = userLoginService.addUser(userLogin);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        String email = userLoginDTO.getEmail();
        String password = userLoginDTO.getPassword();

        // Validate email and password
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        // Authenticate user
        boolean isAuthenticated = userLoginService.authenticateUser(email, password);
        if (isAuthenticated) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);

            // Retrieve the username from the database based on the email
            Optional<UserLogin> userOptional = userLoginService.singleUserbyEmail(email);
            if (userOptional.isPresent()) {
                UserLogin user = userOptional.get();
                response.put("username", user.getUserName());
            } else {
                // Handle case where user is not found
            }

            // Other data if needed
            return ResponseEntity.ok(response.toString());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }


    @GetMapping
    public ResponseEntity<List<UserLogin>> getAllUsers(){
        return  new ResponseEntity<List<UserLogin>>(userLoginService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{userName}")
    public ResponseEntity<Optional<UserLogin>> getSingleUser(@PathVariable String userName){
        return  new ResponseEntity<Optional<UserLogin>>(userLoginService.singleUser(userName), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Optional<UserLogin>> getSingleUserByEmail(@PathVariable String email){
        return  new ResponseEntity<Optional<UserLogin>>(userLoginService.singleUserbyEmail(email), HttpStatus.OK);
    }


}
