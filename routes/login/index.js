/**
 * Created by Bharath on 9/3/15.
 */

exports.loginsuccess = function(req, res){

    try {
        var uname1;
        var pwd1;
        var uname = req.body.username;
        console.log(uname);
        var temp = '\'' + uname + '\'';
        var temprole = '\'normal\'';
        var pwd = req.body.password;
        console.log(pwd);

        var sess = req.session;
        sess.username = uname;

        console.log('sessionID  ' + sess.id);
        console.log(sess.cookie.maxAge);
        var date = new Date();

        var size;
        // Connect to Database
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Pop123465.',
            database: 'Project2'
        });

        connection.connect(function (err) {
            if (!err) {
                console.log("Database is connected ... \n\n");
                connection.query('SELECT * from user_details where uname=' + temp, function (err, rows) {
                    if (!err&&rows.length == 0)
                        res.render('error', {error: 'Invalid Credentials. Please login again'});
                    else if (!err && rows.length > 0) {
                        console.log('The solution is: ', rows);
                        uname1 = rows[0].uname;
                        pwd1 = rows[0].pwd;
                        var role = rows[0].role;
                        sess.role = role;

                        if (uname1 == uname && pwd1 == pwd && role == 'admin' && sess.username) {// Admin user; fetch details of normal users

                            res.send(JSON.stringify({
                                menu: '{Update Information, Logout, View Products, View Users, Modify Products}'
                            }));

                        }

                        else if (uname1 == uname && pwd1 == pwd && role == 'normal' && sess.username) {
                            res.send(JSON.stringify({
                                menu: '{Update Information, Logout, View Products,}'
                            }));
                        }
                        else
                            res.send(JSON.stringify({err_message: 'That username and password combination was not available'}));
                    }
                    else{
                        res.send(JSON.stringify({err_message: 'Error while performing query'}));
                    console.log(err);
                    }

                    connection.end();
                });

            } else {
                console.log("Error connecting database 1 \n\n");



            }


        });


    }
    catch(ex){
        console.log('Exception Occured'+ex);
    }

};
