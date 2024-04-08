

# Track1 Stage2

## ER Diagram
![Stag2FinalVer](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/86a707eb-2035-4311-be33-090f1c66a4fa)


## Explaination of Each Entity and Relationship

The proposed relational schema is designed for NBA players and teams’ sports statistics system that stores information about users, players, teams, statistics, and salary contracts. The database schema consists of five tables: User, Player, Team, and SalaryContracts. We aligned our schema data types using datasets on NBA current and historical players we found on Kaggle. 


- **User**
  - **Description**: The ```User``` table holds personal information about each user, including a unique Email Address (```EmailAddress```), the user's name (```UserName```), and password (```Password```). The ```EmailAddress``` serves as the primary key of the User table.
  - **Assumption**: We assume that each user has a unique email address and that one user can follow multiple players. 

- **Player**
  - **Description**: The ```Player``` table stores data related to individual players, including a unique PlayerID, a reference to their UserID, their position in the game (```PlayerPosition```), physical attributes like ```Height```. The ```PlayerID``` is the primary key of the table.
  - **Assumption**: It is assumed that each player is associated with one user account and can have multiple positions and play for multiple teams over time. The financial attributes in the Player table reflect the current contract details.

- **Team**
  - **Description**: The ```Team``` table contains information about sports teams, such as the unique ```TeamID``` and the division they play in ```TeamDivision```. It also has a record attribute ```Records``` that stores the team's performance records.
  - **Assumption**: Each team has a unique identifier and can have multiple players associated with it over different time periods. The records are assumed to be updated as per the latest season or tournament.

- **Statistics**
  - **Description**: The ```Statistics``` table records different types of performance metrics for users, such as ```BasicStatistics```, ```AccumulatedStatistics```, and ```HighEndPerformance```, with a unique StatID as the primary key.
  - **Assumption**: Users can have multiple statistical records, but each record is unique and time-stamped, representing different time periods or seasons.

- **SalaryContracts**
  - **Description**: The ```SalaryContracts``` table stores detailed contractual financial records for players, including terms like ```AnnualSalary```, ```LifeTimeEarned```, ```CurrentContract```, and ```Worthiness```, each identified by a unique ```ContractID```.
  - **Assumption**: The ```SalaryContracts``` table holds historical and current contract data, allowing for multiple records per player to reflect changes over time. Each record represents a unique contract term.

## Normalize Database

The entire relational schema is already in BCNF. We opted for BCNF to guarantee strong data integrity and minimize redundancies, given our emphasis on accurately associating Statistics with each player and the need for frequent updates with match data. BCNF was chosen over 3NF due to its stricter standards, aligning with our data integrity objectives.

```
User (UserName, EmailAddress, Password, PlayerID)
FD: UserName → EmailAddress, Password, PlayerID

Player (PlayerID, PlayerPosition, Height, TeamID, College)
FD: PlayerID → PlayerPosition, Height, TeamID, College

Team (TeamID, TeamDivision, Records)
FD: TeamID → TeamDivision, Records

Statistics (CombinedID, BasicStatistics, AccumulatedStatistics, HighEndPerformance)
FD: CombinedID → BasicStatistics, AccumulatedStatistics, HighEndPerformance

SalaryContracts (ContractID, AnnualSalary, LifeTimeEarned, CurrentContract, Worthiness)
FD: ContractID → AnnualSalary, LifeTimeEarned, CurrentContract, Worthiness
```

Our relational structure meets the BCNF criteria because each functional dependency $X\to Y$ has $X$ as a superkey. Each entity possesses its own ID (like ```UserName, PlayerID, TeamID, and ContractID```) enabling identification and access to other attributes, thus avoiding redundancies. 

## Convert to a Relational Schema

```
User (
    UserName: VARCHAR(100),
    EmailAddress: VARCHAR(255)[PK],
    Password: VARCHAR(255),
)

Player (
    PlayerID: CHAR(100) [PK],
    PlayerPosition: VARCHAR(100),
    Height: VARCHAR(50),
    College: VARCHAR(255)
    Combined ID: VARCHAR(255)[FK],
    Team ID: CHAR(8)[FK]
)

Team (
    TeamID: CHAR(8) [PK],
    TeamDivision: VARCHAR(100),
    Records: VARCHAR(255)
)

Statistics (
    Combined ID: VARCHAR(255) [PK],
    BasicStatistics: VARCHAR(255),
    AccumulatedStatistics: VARCHAR(255),
    HighEndPerformance: VARCHAR(255)
)

SalaryContracts (
    Contract ID: VARCHAR(255) [PK],
    AnnualSalary: VARCHAR(255),
    LifeTimeEarned: VARCHAR(255),
    CurrentContract: VARCHAR(255),
    Worthiness: VARCHAR(255)
)

Follows (
    User.EmailAdress: VARCHAR(255) [PK][FK]
    Players.PlayerID: CHAR(100) [PK][FK]
)

Has (
    SalaryContracts.ContractID: VARCHAR(255) [PK][FK]
    Players.PlayerID: CHAR(100) [PK][FK]
)
```
