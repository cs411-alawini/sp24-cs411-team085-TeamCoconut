var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
            host: '35.193.146.201',
            // socketPath: "/cloudsql/sqlproject:us-central1-a:NBAstats",
            user: 'root',
            password: '',
            database: 'NBAstats'
            // host: '34.72.44.127',
            // user: 'root',
            // password: 'abc123',
            // database: 'db'
});

connection.connect;


var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'Attendance marked successfully!'});
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



// Route to handle user unfollowing a player
app.post('/unfollowPlayer', (req, res) => {
    const userEmail = req.body.email;
    const playerID = req.body.playerID;

    // First, verify that the user and player exist
    const userCheckQuery = `SELECT * FROM User WHERE EmailAddress = ?`;
    const playerCheckQuery = `SELECT * FROM players WHERE playerID = ?`;

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

            // Both exist, proceed to delete
            const unfollowQuery = `DELETE FROM UserFollowsPlayer WHERE EmailAddress = ? AND playerID = ?`;
            connection.query(unfollowQuery, [userEmail, playerID], (err, results) => {
                if (err) {
                    res.status(500).send("Failed to unfollow player");
                    return;
                }
                res.send("Successfully unfollowed player!");
            });
        });
    });
});
// app.post('/mark', function(req, res) {
//   var netid = req.body.netid;
   
//   var sql = `INSERT INTO attendance (netid, present) VALUES ('${netid}',1)`;



// console.log(sql);
//   connection.query(sql, function(err, result) {
//     if (err) {
//       res.send(err)
//       return;
//     }
//     res.redirect('/success');
//   });
// });

// app.get('/api/attendance', function(req, res) {
//   var sql = 'SELECT * FROM attendance';

//   connection.query(sql, function(err, results) {
//     if (err) {
//       console.error('Error fetching attendance data:', err);
//       res.status(500).send({ message: 'Error fetching attendance data', error: err });
//       return;
//     }
//     res.json(results);
//   });
// });

// app.post('/api/attendance/modify/:id', function(req, res) {
//   var id = req.params.id;
//   var present = req.body.present; // Assuming 'present' is sent in the request body

//   var sql = 'UPDATE attendance SET present = ? WHERE netid = ?';

//   connection.query(sql, [present, id], function(err, result) {
//     if (err) {
//       console.error('Error modifying attendance record:', err);
//       res.status(500).send({ message: 'Error modifying attendance record', error: err });
//       return;
//     }
//     if(result.affectedRows === 0) {
//       // No rows were affected, meaning no record was found with that ID
//       res.status(404).send({ message: 'Record not found' });
//     } else {
//       res.send({ message: 'Attendance record modified successfully' });
//     }
//   });
// });

// app.delete('/api/attendance/delete/:id', function(req, res) {
//   var id = req.params.id;

//   var sql = 'DELETE FROM attendance WHERE netid = ?';

//   connection.query(sql, [id], function(err, result) {
//     if (err) {
//       console.error('Error deleting attendance record:', err);
//       res.status(500).send({ message: 'Error deleting attendance record', error: err });
//       return;
//     }
//     if(result.affectedRows === 0) {
//       // No rows were affected, meaning no record was found with that ID
//       res.status(404).send({ message: 'Record not found' });
//     } else {
//       res.send({ message: 'Attendance record deleted successfully' });
//     }
//   });
// });


app.listen(80, function () {
    console.log('Node app is running on port 80');
});