package devPilot.Backend.model;


import jakarta.persistence.Table;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Table
@Data
@RequiredArgsConstructor
public class User {

    private int id;
    private String name;
    private String username;
}
