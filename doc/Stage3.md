### Connection and Set Up Database on GCP


<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/05861f08-f8b2-4c36-9f1f-85c6309d6cd8">

### Creating Tables SQL code:
We have 6 Tables: SalaryContracts, Team, User, UserFollowsPlayers, Players, Stats


<img width="297" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/ad1447ae-705e-45f0-b30e-01cc80725c38">

SalaryContracts:
CREATE TABLE SalaryContracts (
    ContractID varchar(255) NOT NULL,
    AnnualSalary varchar(255),
    LifeTimeEarned varchar(255),
    CurrentContract varchar(255),
    Worthiness varchar(255),
    PRIMARY KEY (ContractID)
);

<img width="324" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/da884502-a90b-435f-9ccd-969055dcfb59">

Teams:
CREATE TABLE Team (
    TeamID char(20) NOT NULL,
    TeamDivision varchar(100),
    Records varchar(255),
    TeamName varchar(255),
    PRIMARY KEY (TeamID)
);

<img width="370" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/c0fcdad2-4e87-41e2-a48c-56387408d133">

Users:
CREATE TABLE User (
    UserName varchar(100),
    EmailAddress varchar(255) NOT NULL,
    Password varchar(255),
    PRIMARY KEY (EmailAddress)
);

<img width="301" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/03c21051-c531-48cf-a131-cd15a1ec92ea">

Players:
CREATE TABLE players (
    name varchar(255),
    year_start int,
    year_end int,
    position varchar(10),
    height varchar(10),
    weight float,
    birth_date varchar(20),
    college varchar(255),
    playerid int NOT NULL AUTO_INCREMENT,
    TeamID char(20),
    ContractID varchar(255),
    PRIMARY KEY (playerid),
    KEY (ContractID)
);

<img width="319" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/0e132464-8413-4870-92b0-342f683eb1f2">
Stats:

CREATE TABLE stats (
    Year int,
    Player varchar(255),
    Pos varchar(50),
    Age int,
    Tm varchar(50),
    G int,
    GS int,
    MP int,
    PER float,
    TS decimal(5,3),
    ThreePAr decimal(5,3),
    FTr decimal(5,3),
    ORBPercent decimal(5,3),
    DRBPercent decimal(5,3),
    TRBPercent decimal(5,3),
    ASTPercent decimal(5,3),
    STLPercent decimal(5,3),
    BLKPercent decimal(5,3),
    TOVPercent decimal(5,3),
    USGPercent decimal(5,3),
    blank1 varchar(255),
    OWS float,
    DWS float,
    WS float,
    WSPer48 decimal(5,3),
    blank2 varchar(255),
    OBPM float,
    DBPM float,
    BPM float,
    VORP float,
    FG int,
    FGA int,
    FGP decimal(5,3),
    ThreeP int,
    ThreePA int,
    ThreePP decimal(5,3),
    TwoP int,
    TwoPA int,
    TwoPP decimal(5,3),
    eFGP decimal(5,3),
    FT int,
    FTA int,
    FTP decimal(5,3),
    ORB int,
    DRB int,
    TRB int,
    AST int,
    STL int,
    BLK int,
    TOV int,
    PF int,
    PTS int,
    playerID int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (playerID)
);

<img width="148" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/5e395542-a424-4611-a709-c66bf044c30e">

UserFollowsPlayer:

CREATE TABLE UserFollowsPlayer (
    EmailAddress varchar(255) NOT NULL,
    playerid int NOT NULL,
    PRIMARY KEY (EmailAddress, playerid)

<img width="310" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/2c337d57-44fb-4ce0-b036-42ff2e21b7d8">

### Tables with rows over 1000+ Data:Stats, SalaryContracts, Users

<img width="273" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/a94f85fe-613b-4f13-92da-ff8049f8fdb6">



### Query 1

This query determines the relation for each individual team with a win-lost record >= 40 wins and compares their 3 points percentage and their free throw percentage with teams having less than 40 wins.

```sql
SELECT 
    p.TeamID,
    t.TeamName,
    SUM(s.PTS) AS TotalTeamScore,
    AVG(s.ThreePP) AS AvgThreePointPercentage,
    AVG(s.FTP) AS AvgFreeThrowPercentage
FROM 
    players p
JOIN 
    stats s ON p.playerid = s.playerid
JOIN 
    Team t ON p.TeamID = t.TeamID
WHERE 
    CAST(SUBSTRING_INDEX(t.Records, '-', 1) AS UNSIGNED) >= 40
GROUP BY 
    p.TeamID,
    t.TeamName;
```

### Query 2

This query identifies players delivering value in terms of their performance relative to their salary, focusing on a 'worthiness' rating.

```sql
SELECT 
    p.name,
    p.playerID,
    SUM(s.PTS) AS TotalPoints,  
    sc.AnnualSalary,
    sc.Worthiness
FROM 
    players p
JOIN 
    stats s ON p.playerid = s.playerid
JOIN 
    SalaryContracts sc ON p.ContractID = sc.ContractID
GROUP BY 
    p.name,
    p.playerID,
    sc.AnnualSalary,
    sc.Worthiness
ORDER BY 
    TotalPoints DESC
LIMIT 15;
```

### Query 3

This query involves a union of two select statements to find players who have both scored the most points and played the most games.

```sql
(SELECT 
    p.name AS PlayerName,
    t.TeamName,
    s.PTS AS TotalPoints,
    s.G AS GamesPlayed
FROM 
    players p
JOIN 
    stats s ON p.playerID = s.playerID
JOIN 
    Team t ON p.TeamID = t.TeamID
ORDER BY 
    s.PTS DESC
LIMIT 15)

UNION

(SELECT 
    p.name,
    t.TeamName,
    s.PTS,
    s.G
FROM 
    players p
JOIN 
    stats s ON p.playerID = s.playerID
JOIN 
    Team t ON p.TeamID = t.TeamID
ORDER BY 
    s.G DESC
LIMIT 15);
```

### Query 4

This query analyzes players' performance and their followers, indicating business potential for commercial market value.

```sql
SELECT 
    p.playerID,
    p.name AS PlayerName,
    s.PTS AS TotalPoints,
    (COUNT(ufp.Emailaddress)+ FLOOR(RAND() * 418)) AS Followers,
    sc.AnnualSalary
FROM 
    players p
JOIN 
    stats s ON p.playerID = s.playerID
JOIN 
    UserFollowsPlayer ufp ON p.playerID = ufp.playerID
JOIN 
    SalaryContracts sc ON p.ContractID = sc.ContractID
GROUP BY 
    p.playerID, 
    p.name,
    s.PTS,
    sc.AnnualSalary
ORDER BY 
    Followers DESC, 
    TotalPoints DESC
LIMIT 15;
```
