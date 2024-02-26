# Track1 Stage2

## ER Diagram
![Stage2ERDiagram](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/blob/main/assets/Stage2ERDiagram.png)

## Explaination of Each Entity and Relationship

- **User**
  - **Description**: The User table holds personal information about each user, including a unique UserID, the user's name (UserName), email address (Email), and password (Password). The UserID serves as the primary key of the User table.
  - **Assumption**: We assume that each user has a unique email address and that one user can follow multiple users and be followed by multiple users. Additionally, a user can have multiple statistical records but cannot be listed more than once within the User table.

- **Player**
  - **Description**: The Player table stores data related to individual players, including a unique PlayerID, a reference to their UserID, their position in the game (PlayerPosition), physical attributes like Height, and financial details such as AnnualSalary, LifeTimeEarned, CurrentContract, and Worthiness. The PlayerID is the primary key of the table.
  - **Assumption**: It is assumed that each player is associated with one user account and can have multiple positions and play for multiple teams over time. The financial attributes in the Player table reflect the current contract details.

- **Team**
  - **Description**: The Team table contains information about sports teams, such as the unique TeamID and the division they play in (TeamDivision). It also has a record attribute (Records) that stores the team's performance records.
  - **Assumption**: Each team has a unique identifier and can have multiple players associated with it over different time periods. The records are assumed to be updated as per the latest season or tournament.

- **Statistics**
  - **Description**: The Statistics table records different types of performance metrics for users, such as BasicStatistics, AccumulatedStatistics, and HighEndPerformance, with a unique StatID as the primary key.
  - **Assumption**: Users can have multiple statistical records, but each record is unique and time-stamped, representing different time periods or seasons.

- **SalaryContracts**
  - **Description**: The SalaryContracts table stores detailed contractual financial records for players, including terms like AnnualSalary, LifeTimeEarned, CurrentContract, and Worthiness, each identified by a unique ContractID.
  - **Assumption**: The SalaryContracts table holds historical and current contract data, allowing for multiple records per player to reflect changes over time. Each record represents a unique contract term.

## Normalize Database

The entire relational schema is already in BCNF. We opted for BCNF to guarantee strong data integrity and minimize redundancies, given our emphasis on accurately associating Statistics with each player and the need for frequent updates with match data. BCNF was chosen over 3NF due to its stricter standards, aligning with our data integrity objectives.

```
User (UserName, EmailAddress, Password)
FD: UserName → EmailAddress, Password

Player (PlayerID, PlayerPosition, Height)
FD: PlayerID → PlayerPosition, Height

Team (TeamID, TeamDivision, Records)
FD: TeamID → TeamDivision, Records

Statistics (BasicStatistics, AccumulatedStatistics, HighEndPerformance)
FD: PlayerID  → BasicStatistics, AccumulatedStatistics, HighEndPerformance

SalaryContracts (ContractID, AnnualSalary, LifeTimeEarned, CurrentContract, Worthiness)
FD: ContractID  → AnnualSalary, LifeTimeEarned, CurrentContract, Worthiness
```

## Convert to a Relational Schema

```
User (
    UserName: VARCHAR(100) [PK],
    EmailAddress: VARCHAR(255),
    Password: VARCHAR(255),
    PlayerID: VARCHAR(255)
)


Player (
    PlayerID: CHAR(100) [PK],
    PlayerPosition: VARCHAR(100),
    Height: VARCHAR(50),
    Team ID: VARCHAR(255)
    College: VARCHAR(255)
)

Team (
    TeamID: CHAR(8) [PK],
    TeamDivision: VARCHAR(100),
    Records: VARCHAR(255)
)

Statistics (
    BasicStatistics: VARCHAR(255),
    AccumulatedStatistics: VARCHAR(255),
    HighEndPerformance: VARCHAR(255)
)

SalaryContracts (
    AnnualSalary: VARCHAR(255),
    LifeTimeEarned: VARCHAR(255),
    CurrentContract: VARCHAR(255),
    Worthiness: VARCHAR(255)
)

```