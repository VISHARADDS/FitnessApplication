package dev.project.FitnessApplication;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserLoginService {

    @Autowired
    private UserLoginRepository userLoginRepository;

    public UserLogin addUser(UserLogin userLogin) {
        // Check if a user with the provided email exists
        Optional<UserLogin> existingUserByEmail = userLoginRepository.findByEmail(userLogin.getEmail());
        if (existingUserByEmail.isPresent()) {
            // Email already exists, handle the case (throw exception, return null, etc.)
            // For example, you can throw an exception indicating that the email is already in use
            throw new IllegalArgumentException("Email already exists");
        }

        // Check if a user with the provided username exists
        Optional<UserLogin> existingUserByUsername = userLoginRepository.findByUserName(userLogin.getUserName());
        if (existingUserByUsername.isPresent()) {
            // Username already exists, handle the case (throw exception, return null, etc.)
            // For example, you can throw an exception indicating that the username is already in use
            throw new IllegalArgumentException("Username already exists");
        }

        // If both email and username are unique, save the user
        return userLoginRepository.save(userLogin);
    }

    public List<UserLogin> allUsers() {
        return userLoginRepository.findAll();
    }

    public Optional<UserLogin> singleUser(String userName) {
        return userLoginRepository.findByUserName(userName);
    }

    public boolean authenticateUser(String email, String password) {
        Optional<UserLogin> userOptional = userLoginRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            UserLogin user = userOptional.get();
            // Here you would typically compare the password provided by the user with the stored password hash
            // For simplicity, let's assume direct comparison for demonstration
            return user.getPassword().equals(password);
        }
        return false; // User with the provided email doesn't exist
    }

    public Optional<UserLogin> singleUserbyEmail(String email) {
        return userLoginRepository.findByEmail(email);
    }
}
