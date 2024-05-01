var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
            host: '35.193.146.201',
            user: 'root',
            password: '',
            database: 'NBAstats'
});

connection.connect;


var app = express();
var session = require('express-session');
var bcrypt = require('bcrypt');

app.use(session({
  secret: 'your_secret_key', // Replace with a real secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true if you're using HTTPS
}));

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

//get the detailed information for a player

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.redirect(`/home`); // Redirect to 
});


app.get('/home', function(req, res) {
  console.log(req.session.user)
  if (req.session.user) {
    res.render('home', { 
      title: 'Home Page', 
      EmailAddress: req.session.user // Pass the username to the EJS template
    });
  } else {
    res.render('home', { 
      title: 'Home Page',
      EmailAddress: null // No username if not logged in
    });
  }
});

app.get('/playerlist', (req, res) => {
  if (req.session.user) {
  res.render('playerlist', { // Ensure you have a 'playerlist' view set up
    title: 'Player List',
    EmailAddress: req.session.user
  });
} else {
  res.render('playerlist', { // Ensure you have a 'playerlist' view set up
    title: 'Player List',
    EmailAddress: null
  });
}
});


app.post('/login', (req, res) => {
  const { EmailAddress, password } = req.body;
  if (!EmailAddress || !password) {
      return res.status(400).send('Email and password are required');
  }

  const sql = 'SELECT EmailAddress  FROM User WHERE EmailAddress = ? AND Password = ?;';
  connection.query(sql, [EmailAddress, password], (err, results) => {
      if (err) {
          return res.status(500).send('Database error');
      }
      console.log(results)
      if (results.length === 0) {
          return res.status(401).send('Invalid email or password');
      }

      console.log("successfully log in!");
      req.session.user = results[0].EmailAddress; // Store EmailAddress in session
      res.redirect('/home');
  });
});

// function checkAuthentication(req, res, next) {
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect('/login'); // Redirect to login if not authenticated
//   }
// }

// // Apply this middleware to routes that require authentication
// app.get('/home', checkAuthentication, function(req, res) {
//   res.render('home', { 
//     title: 'Home Page',
//     username: req.session.user 
//   });
// });


// Example of handling logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    // req.session.user = null;
    res.redirect('/');
  });
});

app.post('/register', (req, res) => {
  const { UserName, EmailAddress, Password } = req.body;

  const sql = 'CALL RegisterUser(?, ?, ?)';

  connection.query(sql, [UserName, EmailAddress, Password], (err, results) => {
      if (err) {
          console.error('Error during registration:', err.message);
          res.status(500).send(err.message);
          return;
      }
      res.redirect('/?success=Registration Successful');
  });
});


app.delete('/deleteUser', function(req, res) {
  const userEmail = req.body.EmailAddress; // Adjust to receive an email address from the body
  console.log(userEmail)
  // Call the stored procedure
  connection.query('CALL DeleteUserAndLog(?)', [userEmail], (err, results) => {
      if (err) {
          console.error('SQL Error:', err);
          res.status(500).send('Failed to execute the operation');
          return;
      }
      console.error('Successfully deleted');
      res.send({
          message: 'Account successfully Deleted',
          results: results
      });
  });
});



// Route to get player data
app.get('/followedplayers', (req, res) => {
  const email = req.session.user;
  const sql = `
  SELECT p.playerID, p.name, p.position, p.birth_date 
  FROM players p 
  JOIN UserFollowsPlayer f ON f.playerid = p.playerid
  WHERE f.EmailAddress = ?;
  `;

  connection.query(sql,[email], (err, result) => {
      if (err) {
        res.status(500).send('Error fetching player data');
      } else {
        res.json(result);
      }
      
  });
});



app.get('/search', function(req, res) {
  // res.render('home', { title: 'Home page' }); 
  res.render('search', { title: 'search player' }); 
});


app.post('/search', (req, res) => {
  // Use 'req.body.playerID' if you're getting the ID from a form post
  const playerID = req.body.playerID;

  const sql = `
    SELECT 
      p.name, 
      p.year_start, 
      p.year_end, 
      p.position, 
      p.height, 
      p.weight, 
      p.birth_date, 
      p.college, 
      p.TeamID, 
      sc.AnnualSalary, 
      sc.Worthiness
    FROM 
      players p
    LEFT JOIN 
      SalaryContracts sc ON p.ContractID = sc.ContractID
    WHERE 
      p.playerID = ?;
  `;

  connection.query(sql, [playerID], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching player data');
    } else if (results.length > 0) {
      // Redirect to the player's profile page with the player ID
      console.log("Redirecting to player profile.");
      res.redirect(`/profile/${playerID}`);
    } else {
      // res.status(404).send('Player not found');
      res.redirect(`search`);

    }
  });
});




// Route to get all players
app.get('/api/players', (req, res) => {
  const sql = `
    SELECT 
      *
    FROM 
      players p
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send('Error fetching player data');
    }

    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No players found');
    }
  });
});


app.get('/profile/:playerID', (req, res) => {
  const playerID = req.params.playerID;

  const sql = `
    SELECT 
      p.name, 
      p.year_start, 
      p.year_end, 
      p.position, 
      p.height, 
      p.weight, 
      p.birth_date, 
      p.college, 
      p.TeamID, 
      sc.AnnualSalary, 
      sc.Worthiness,
      s.PTS,        
      s.TRB,        
      s.PER,
      s.Year        
    FROM 
      players p
    LEFT JOIN 
      SalaryContracts sc ON p.ContractID = sc.ContractID
    JOIN 
      stats s ON p.playerID = s.playerID
    WHERE 
      p.playerID = ?;
  `;

  connection.query(sql, [playerID], (err, results) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).send('Error fetching player data');
    }

    if (results.length > 0) {
      if (req.session.user) {
        res.render('profile', { 
          title: results[0].name + ' - Player Profile', // More descriptive title using player's name
          player: results[0], 
          EmailAddress: req.session.user // Pass the username to the EJS template
        });
      } else {
        res.render('profile', { 
          title: results[0].name + ' - Player Profile', // More descriptive title using player's name
          player: results[0], 
          EmailAddress: null
        });
      }
      
    } else {
      res.status(404).send('Player not found!');
    }
  });
});


// Start server
app.listen(80, () => {
  console.log('Server is running on port 80');
});


 
// this code is executed when a user clicks the form submit button
// Route to handle user following a player
app.post('/followPlayer', (req, res) => {
    const userEmail = req.body.email;
    const playerID = req.body.playerID;

    // First, verify that the user and player exist
    const userCheckQuery = `SELECT * FROM User WHERE EmailAddress = ?`;
    const playerCheckQuery = `SELECT * FROM players WHERE playerid = ?`;

    // Check user exists
    connection.query(userCheckQuery, [userEmail], (err, userResults) => {
        if (err) {
            res.status(500).send("Database error");
            return;
        }
        if (userResults.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        // Check player exists
        connection.query(playerCheckQuery, [playerID], (err, playerResults) => {
            if (err) {
                res.status(500).send("Database error");
                return;
            }
            if (playerResults.length === 0) {
                res.status(404).send("Player not found");
                return;
            }

            // Both exist, proceed to insert
            const followQuery = `INSERT INTO UserFollowsPlayer (EmailAddress, playerid) VALUES (?, ?)`;
            connection.query(followQuery, [userEmail, playerID], (err, results) => {
                if (err) {
                    res.status(500).send("Failed to follow player");
                    return;
                }
                res.send("Successfully followed player!");
            });
        });
    });
});



// // Route to handle user unfollowing a player
// app.post('/unfollowPlayer', (req, res) => {
//     const userEmail = req.body.email;
//     const playerID = req.body.playerID;

//     // First, verify that the user and player exist
//     const userCheckQuery = `SELECT * FROM User WHERE EmailAddress = ?`;
//     const playerCheckQuery = `SELECT * FROM players WHERE playerid = ?`;

//     // Check user exists
//     connection.query(userCheckQuery, [userEmail], (err, userResults) => {
//         if (err) {
//             res.status(500).send("Database error");
//             return;
//         }
//         if (userResults.length === 0) {
//             res.status(404).send("User not found");
//             return;
//         }

//         // Check player exists
//         connection.query(playerCheckQuery, [playerID], (err, playerResults) => {
//             if (err) {
//                 res.status(500).send("Database error");
//                 return;
//             }
//             if (playerResults.length === 0) {
//                 res.status(404).send("Player not found");
//                 return;
//             }

//             // Both exist, proceed to delete
//             const unfollowQuery = `DELETE FROM UserFollowsPlayer WHERE EmailAddress = ? AND playerid = ?`;
//             connection.query(unfollowQuery, [userEmail, playerID], (err, results) => {
//                 if (err) {
//                     res.status(500).send("Failed to unfollow player");
//                     return;
//                 }
//                 res.send("Successfully unfollowed player!");
//             });
//         });
//     });
// });
