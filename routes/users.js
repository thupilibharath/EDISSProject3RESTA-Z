

/* GET users listing. */
exports.list = function(req, res){
  try {
    var sess = req.session;

    var fname, lname;

    console.log(req.query.texta);
    console.log(req.query.textb);


    if (typeof req.query.texta == 'undefined')
      fname = '\'\%\'';
    else
      fname = '\'\%' + req.query.texta + '\%\'';

    if (typeof req.query.textb == 'undefined')
      lname = '\'\%\'';
    else
      lname = '\'\%' + req.query.textb + '\%\'';

    console.log('fname is ' + fname);
    console.log('lname is ' + lname);
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
      } else {
        console.log("Error connecting database ... \n\n");
      }
    });


    if (sess.username && sess.role == 'admin') {
      connection.query('SELECT uname, fname, lname from user_details where fname like ' + fname + ' and lname like ' + lname, function (err, rows) {
            if(!err)
            res.send(JSON.stringify({user_list: rows}));
            else
            {

              }
          }
      );
    }
    else
      res.send(JSON.stringify({message: 'You are not authorized to perform this operation'}));
  }
  catch(ex){
    res.send(JSON.stringify({message: 'Error occured'}));
  }

};
