### Connection and Set Up Database on GCP


<img width="468" alt="image" src="https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/05861f08-f8b2-4c36-9f1f-85c6309d6cd8">


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
