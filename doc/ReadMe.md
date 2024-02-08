# Project Summary

Disappointed by the limitations in traditional sports databases like ESPN, we aimed to create a unique NBA player statistics application. Our platform offers an independent and intuitive evaluation of every NBA player, from legends to rookies. It combines high-end stats and salary data to assess a player's value, filling a gap left by official sports websites.

Our application not only provides basic features such as player searches and team analysis but also introduces advanced metrics and composite ratings for deeper insights. It stands out by integrating social media debates and expert opinions into our evaluations, offering a comprehensive tool for fans, analysts, and enthusiasts to explore NBA data in a way that's never been done before.

## Features

- **Login/Sign up-User interactive interface**: Login/Sign up by Email/Google Account
- **Team Exploration/Selection**: Select users’ favorite team or explore a team that you might like. In this section, we divide the team logo into two different divisions like the NBA official based on their geographic location. (West and East)
- **Detailed Team Selection Page**: After selecting users’ favorite team, they now can see the team’s details. This includes the history performance like W/L ratio their history Team formation and their highest title(Division Champion/National Champion, how many all-stars they had)
- **Player Performance Page**: The "Player Performance Page" is a key feature of our application, offering users an in-depth look at NBA players' statistical data and performance metrics. This page presents an array of information, including points per game, rebounds, assists, field goal percentage, and other key stats that basketball fans care. It's designed to provide a comprehensive overview of a player's impact on the court, allowing users to explore detailed profiles and gain insights into their favorite athletes' performances.
- **Detailed Player Performance Page with Advanced analysis**: After the user clicks on the player performance page, we offer a detailed player performance analysis that is only provided in our application. Where we evaluate the performance along with high-end stats to evaluate the player’s contribution to the team and whether he deserves his salary.

## A Good Creative Component

A creatively challenging and technically sophisticated function to enhance the Contract Evaluation and Worthiness Assessment aspect of our application could be the integration of machine learning algorithms for predictive modeling of player performance and contract value. This feature would involve leveraging historical player statistics, team dynamics, market trends, and external factors to develop predictive models that forecast player performance trajectories and evaluate the potential worthiness of player contracts. To achieve this, we would employ techniques such as supervised learning algorithms (e.g., regression, random forests, neural networks) to analyze large datasets of player performance metrics, contract details, and market dynamics. By training the machine learning models on historical data and continuously refining them with real-time updates, our application can provide valuable insights into the expected return on investment for player contracts, enabling teams, agents.

## Usefulness

The proposed NBA Player Statistics Application aims to provide basketball enthusiasts, analysts, and fans with a comprehensive platform to explore and analyze data related to NBA players. Its usefulness lies in its ability to provide comprehensive insights, facilitate informed decision-making, and enhance the overall understanding of player performance and team dynamics within the NBA ecosystem.

### Basic Functions:

- **Player Search and Profiles**: Users can search for NBA players by name, team, position, or statistical criteria. Each player profile includes detailed statistics such as points per game, rebounds, assists, field goal percentage, and other relevant metrics.
- **Team Analysis**: Users can analyze team statistics, including win-loss records, points scored, points allowed, and team efficiency ratings. Comparative analysis tools allow users to compare teams across various metrics.
- **Seasonal Trends**: The application provides insights into seasonal trends, player performance over time, streaks, and slumps. Users can visualize statistical trends through graphs, charts, and historical data.

### Advanced Analytics:

- **Advanced statistical metrics**: such as player efficiency rating (PER), true shooting percentage (TS%), usage rate, and defensive rating are available for in-depth analysis and comparison.

## Similar Websites/Applications and Our Creative features:

While platforms such as ESPN NBA Statistics, Basketball-Reference, and NBA.com Stats have long provided invaluable resources, our application stands poised to redefine the landscape through groundbreaking features. With the integration of advanced analytics, composite player ratings, and contract evaluation functionalities, our platform promises to revolutionize the way users interact with NBA data. Through customizable dashboards, users can explore nuanced player statistics, decipher emerging trends, and make informed decisions regarding player contracts and team strategies. By championing a fusion of traditional statistical analysis and forward-thinking tools, our application not only enriches the analytical experience but also fosters a deeper connection between enthusiasts, analysts, team managers, and fans, ultimately elevating the appreciation and understanding of the game to new heights.

### Advanced Metrics and Composite Ratings:

- **Composite Player Rating**: Introduce advanced statistical models to calculate composite player ratings that consider multiple performance metrics, such as player efficiency rating (PER), true shooting percentage (TS%), defensive rating, usage rate, and other relevant factors. This composite rating provides users with a holistic view of a player's overall impact on the game.
- **Filtering and Sorting**: This allows users to filter and sort players based on their composite ratings, enabling them to identify top performers, emerging talents, and players who excel in specific areas of the game. Users can customize filters based on their preferences and analytical requirements.

### Contract Evaluation and Worthiness Assessment:

- **Contract Performance Analysis**: Implement algorithms to evaluate player contracts based on performance metrics, player contributions to team success, injury history, age, and other relevant factors. Users can input contract details, including duration and monetary value, to assess the worthiness and cost-effectiveness of player contracts.
- **Comparative Analysis**: Enable users to compare player contracts within and across teams, leagues, and player positions. The application provides insights into the value provided by each player relative to their contract terms, helping teams, agents, and analysts make informed decisions regarding player acquisitions, trades, and salary negotiations.

## Data Sources:

### Data Source 1: NBA Players stats since 1950

The dataset contains aggregate individual statistics for 67 NBA seasons. from basic box-score attributes such as points, assists, rebounds, etc., to more advanced money-ball-like features such as Value Over Replacement.

- **Source**: Kaggle. Original data was scraped from Basketball-reference.
- **Format**: CSV
- **Data Size**: 3000+ Players over 60+ Seasons, and 50+ features per player. To be more specific, there are 3,137 rows and 53 columns, which means there are 3,137 players and 53 features for each player.
- **Information Captured**: names, positions, teams, seasons, games played, minutes, points, rebounds, assists, steals, blocks, turnovers, fouls, field goal percentage, free throw percentage, three point percentage, win shares, value over replacement player, and more.

### Data Source 2: NBA data from 1996-2021

This is a dataset that contains information about NBA games, players, and salaries from seasons 1996-97 to 2020-21.

- **Source**: Kaggle. Original data was scraped from Basketball-reference.
- **Format**: CSV
- **Data Size**: For the salary part, there are 11584 records for 2266 players.
- **Information Captured**: games, play-by-play, player stats, and salary data.

## Low Fidelity UI

![3u8Gcr7hZsKjEZjhVQhfk_UBEnp4K7SGBuCIPTHKwhPDU1lFpp9D9b1CoKFa-vJpDE7diO3P9Onjf-BN03NFBz5of1sEOUSqFm50y9qb5GumZOcg84XU9j6aHqRj](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/9108a58d-4e97-4519-acdf-1deff71b52c7)


![hX_KYb1rQbPMk3t1bLybekKUBv4sDdGFuS-AwPrl-il7ai6lSYc6QF-S_HIPXtpfDZjWLOrapzZDqeEhpvvUtJN4It-THYi3Z4evgWxCae_cyCZKbTN9tuHTXzEU](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/6d6cb5be-f5d9-4c8c-a7f9-ad6542bb2c38)

![vXuRM6a5nnf5gcrLb7ii3PCHnM7K2dWDOI1kn3hJkb83h3wc8n8nXbxx1vAOErfI0Z50fJmASz9epX-7mAcLxDaAxR3cZzu3Sl76OcRwA9QWmYq2BMEnLWsHKHud](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/b6d19ee5-e080-4703-9a0a-3fdef2ce3a68)

![4uc2KGB2u4eaTs6VcxZI3PZDImDehsGIrEe37jyWKvwsDlCjH7SbswS9udsBJPUNjIAcwn3cg1fRmbNqDfIi0fGStoKsgoHCwTr70KQYnQyhbREgC6TyAZx7dmoV](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/f2b51584-010d-428d-a25f-79520a779694)

![2IJ83JZ2oImCSCywaDDuK-XtiQ1ARknz7SOOHL8Xhh1qZ_f5aWmYSOlARVHYjoBnvVqCbCNMsvJUdV7zh5GB3Bpgcy0uCCqtg-ukX5dQZGGisCZJhpOzVLGWF3k4](https://github.com/cs411-alawini/sp24-cs411-team085-TeamCoconut/assets/102498463/9e4f576f-d8f5-49c5-bd4e-27796b5f1b46)







