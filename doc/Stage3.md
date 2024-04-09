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

### Part 2:

Part 2:
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/73528230-1d11-4c63-8733-6a352409cc49">

1. 
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
This query is used to determine the relation for each individual team with a win-lost record >= 40 wins and see their 3 points percentage and their free throw percentage and we use this one to compare with the team with less than 40 wins. Notice that we have exactly 15 rows since there are only 30 teams in NBA, meanwhile, we also need to point out that the three percentage is lower than normal because there are some players in our database who played and retired before the three-point was invented, therefore their data for this column is 0, and significantly lowered our stats since a good 3 point shooter would usually have a 40% 3 point shot rate.

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





By analyzing the output of this query, we can identify which players are delivering value in terms of their on-field performance relative to their salary and how this fits our algorithm with the 'worthiness' rating in their contract, which is our key feature.
Please notice that some of our salary is generated since some players in the history didn’t share their detailed contracts with the public database. And we are only valued for one specific current season.

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




<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/77c0c500-0047-43f4-8a00-160260afe820">

For this query, we selected the player who scored the most points and analyzed his team and we also used another query that selected the players that played the most games, by Unioning these two queries for a set operation, we successfully found the player that played many games while have contributed a lot to his team(By selecting his teamID), we used these statistics to analysis his contact worthiness because the points he scored in a season can represent the most influence than other statistics such as rebound and blocks (blks and reb in our database, which we will do a similar query for this two).
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

Union

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

For this query, we aimed to analyze the player’s performance with the Users who have followed him, and this can determine a business potential for the commercial market value for a team and a player, which should be an important factor to value since that we need to focus on what beyond the traditional stats. These commercial values are also important for a contract while the player’s performance is important. (For example, a handsome player with fewer points per game may be more worthiness of his contract because he has many followers compared with a player 
that have higher points per game with less followers because fans tend to buy commercials from the handsome player)




SELECT 
    p.playerID,
    p.name AS PlayerName,
    s.PTS AS TotalPoints,
    (COUNT(ufp.Emailaddress)) AS Followers,
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
 Limit 15;


<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/671ddcb1-322f-4cb6-9a0b-05aacc3d5741">


1.
EXPLAIN ANALYZE
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


Before adding indexes:
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/8c9baf1b-502e-4701-aaed-a8899a72a49e">

Cost of nested loop inner join is 1554.8 and 1207.95 respectively.

After adding index to Team.Records only
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/2fd12919-8f57-4b31-8b94-278e6c87f4bd">

Cost of nested loop inner join is 811.55 and 464.70 respectively.

The table shows that the cost in the nested loop inner join has indeed reduced from 1207.95 to 464.70, indicating an improvement. The reduction in cost in the nested loop inner join is likely due to a combination of filter pushdown optimization, effective index usage, and optimized join strategies by the database optimizer. This improvement signifies that the indexing strategy and query optimization techniques are indeed making a positive impact on the query performance.




After adding index to Team.TeamName only

Cost of nested loop inner join is 1554.8 and 1207.95 respectively.

After indexing the Records column in the Team table, there was no significant change in the cost of the join in the provided query. While indexing can often improve query performance, its effectiveness depends on various factors such as selectivity, cardinality, index size, statistics, and query hints. In this case, indexing the “TeamName” column did not lead to noticeable performance gains, suggesting that further optimization strategies may be necessary or that the query itself may not be well-suited for index usage.

<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/f8131385-a99a-4972-bd87-4d5bd2d5dcc4">








After adding index to Team.Records and Team.TeamName
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/fe15c44a-d0a6-48e0-9651-69538af9cfa7">


Cost of nested loop inner join is 811.55 and 464.70 respectively.

The table shows that the cost in the nested loop inner join has indeed reduced from 1207.95 to 464.70, indicating an improvement. The reduction in cost in the nested loop inner join is likely due to a combination of filter pushdown optimization, effective index usage, and optimized join strategies by the database optimizer. This improvement signifies that the indexing strategy and query optimization techniques are indeed making a positive impact on the query performance.



2.
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

I attempted to optimize the query by indexing non-primary key attributes in 'GROUP BY' and 'ORDER BY'. Creating indexes on the players(name), SalaryContracts(AnnualSalary), and SalaryContracts(Worthiness) columns can potentially optimize the query. Since the query groups by sc.AnnualSalary, an index on this column can facilitate faster grouping operations. 
Before adding indexes:
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/270d5b4a-1183-4b64-b576-89f4dd1389dd">

Cost of nested loop inner join is 811.55 and 464.70 respectively.

After adding index to Players.Name only
CREATE INDEX idx_player_name ON players(name);
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/7e6dea29-cea5-4857-aaf7-21696f87404f">

The cost did not change significantly.The reason might be the index is overly large or includes numerous columns, it might exceed memory capacity or generate more I/O operations compared to a full table scan.

CREATE INDEX idx_salary_annual ON SalaryContracts(AnnualSalary);
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/06483e14-5fea-48f9-8ac1-f4906f27d424">

The cost did not change significantly.Given that an index possesses a wide array of distinct values, its likelihood of being employed is greater compared to an index characterized by a scarcity of unique values or a prevalence of repetitive entries.

CREATE INDEX idx_stats_pts ON stats(PTS);
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/60869c0c-2b93-493b-b333-895931eaf6c7">

The cost did not change significantly. This might be due to the use of PTS in the SUM function, leading to index invalidation. This occurs because the database needs to perform a full table scan first to obtain the data, and then proceed with filtering and calculation, causing the index to become ineffective. Additionally, this is accompanied by performance issues.
3.
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

Union

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
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/29d7495f-6937-48a6-9e9f-cffd7b740918">

Before adding indexes, After adding index to stats.G only, After adding index to stats.PTS only and After adding index to stats.G and stats.PTS all have the same results as shown below using EXPLAIN ANALYZE command. Four cost of nested loop inner join are all 811.55.


After indexing the G and/or PTS column in the stats table, there was no significant change in the cost of the join in the provided query. While indexing can often improve query performance, its effectiveness depends on various factors such as selectivity, cardinality, index size, statistics, and query hints. In this case, indexing the stats.G and/or stats.PTS  column did not lead to noticeable performance gains, suggesting that further optimization strategies may be necessary or that the query itself may not be well-suited for index usage.




4.
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
 Limit 15;
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/840abe56-c601-4174-8295-34ef7f6bccc6">

I attempted to optimize the query by indexing non-primary key attributes in 'GROUP BY' and 'ORDER BY'. 
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/fc0fdb98-8eb0-41f1-b188-f849e63d9481">

CREATE INDEX idx_stats_pts ON stats(PTS);
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/8b869f9c-1c38-4cee-8423-0bba699f5515">

CREATE INDEX idx_ufp_email ON UserFollowsPlayer(Emailaddress);
<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/6a6bf5ed-6294-44d7-a076-99fd0b5896dc">

CREATE INDEX idx_salary_annualsalary ON SalaryContracts(AnnualSalary);


there was no significant change in the cost of the join in the provided query. While indexing can often improve query performance, its effectiveness depends on various factors such as selectivity, cardinality, index size, statistics, and query hints. In this case, indexing the ufp.Emailaddress and/or stats.PTS  column did not lead to noticeable performance gains, suggesting that further optimization strategies may be necessary or that the query itself may not be well-suited for index usage.

