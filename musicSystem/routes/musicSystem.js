var express = require('express');
var router = express.Router();
var mc=require('mongodb').MongoClient;
var cors = require('cors');
var alert = require('alert');

router.use(cors({origin: "*"}))
/* GET home page. */
router.get('/', function(req, res, next) { //here home page should come for our project
  res.render('index', { title: 'OMS Music System' });
});

//...........................................................................
//Customer- Regsitration page
router.get('/registerPage', function(req, res, next) {
    res.render('registerPage', { title: 'Registration Page' });// 1st parameter is used to search in views folder
});

router.post('/createProfile', function(req, res, next) {
     //use mongoclient for connecting to mongodb
     var r=req.body;
     mc.connect('mongodb://localhost:27017', function(err, msdb){ 
     if(err) throw err;
     else{
       msdb.db('musicSystem').collection('Customer').find({},{}).toArray(function(err, data){ 
         if(err) throw err
         else{
           var last_id = data[data.length-1].cust_id; 
           var last_id = last_id.substr(1);
           var new_id = parseInt(last_id) + 1;
           var new_id = 'c'+new_id.toString();
           var myobj = { cust_id: new_id, cust_name : r.name, email : r.emailId, phone: r.phoneNo, passwd : r.password};	//add details to insert into db
           msdb.db('musicSystem').collection('Customer').insertOne(myobj, function(err,res2){
             if(err) { throw err; }
             else{
              // res.render('registerResult');
              res.send(res2)
             }
           })
         }
       });
     }
   })
});
//.................................................................................
//msdb.db('musicSystem').collection('Customer').insertOne({cust_id:"c111",cust_name : r.name, email : r.emailId, phone: r.phoneNo, passwd : r.password });
//res.render('registerResult', r);
//.................................................................................
//Customer- Login Page
router.get('/loginPage', function(req, res, next) {
    res.render('loginPage', { title: 'Login Page' });//opens by default (searches in view folder)
});

router.post('/loginProfile', function(req, res, next) {
  var r= req.body;
  mc.connect('mongodb://localhost:27017',function(error,msdb){
    msdb.db('musicSystem').collection('Customer').find({'email':r.emailId, 'passwd':r.password}).toArray(function(err,res1){
      if(err){
        throw err; 
      }
      else{
          if(res1.length==0){
            res.send(false);
          }
          else{
            // res.render("customerDashboard",{v:res1[0]});
            res.send(res1[0]);
          }         
      }
    });
  });
});
//................................................................................

router.get('/getArtist', function(req,res,next){
	mc.connect('mongodb://localhost:27017',function(error,msdb){
    msdb.db('musicSystem').collection('Artists').find({}).toArray(function(err,res1){
		if(err) throw err;
		else{
			res.send(res1)
		}
	})
})
});
//...........................................................................
//Customer- View Profile page
router.get('/customerViewProfile', function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
    msdb.db('musicSystem').collection('Customer').find({'cust_id':req.query.cust_id}).toArray(function(err,res1){
      if(err){
        throw err; 
      }
      else{
          if(res1.length==0){
            res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>Login Failed</div></div>");
          }
          else{
            var name = res1[0].cust_name;
            var email = res1[0].email;
            var phone = res1[0].phone;
            // res.render('customerViewProfile', { title: 'View Profile Page', cust_name: name, cust_email: email,cust_phone: phone});
            res.send(res1)
          }         
      }
    });
  });
 
});
//...........................................................................

//...........................................................................
//Customer- View Profile page
router.get('/customerViewProfile', function(req, res, next) {
  res.render('customerViewProfile', { title: 'View Profile Page', cust_name: req.query.cust_name, cust_email: req.query.cust_email,cust_phone: req.query.cust_phone });
});
//...........................................................................

//................................................................................
//Admin- login Page
router.get('/adminLoginPage', function(req, res, next) {
  res.render('adminLoginPage', { title: 'Admin Login Page' });
});

router.post('/loginAdmin', function(req, res, next) {
var r= req.body;
mc.connect('mongodb://localhost:27017',function(error,msdb){
  msdb.db('musicSystem').collection('Admin').find({'admin_id':r.adminId, 'admin_password':r.password}).toArray(function(err,res1){
    if(err){
      throw err; 
    }
    else{
        if(res1.length==0){
          res.send(false);
        }
        else{
          //res.render("adminDashboard");
          res.send(res1[0])
        }
        
    }
  });
});
});
//.....................................................................................

//.....................................................................................
//Admin- view User Details
router.get('/viewUserDetails', function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
     msdb.db('musicSystem').collection('Customer').find().toArray(function(err,res1){
        if(err){
          throw err;
        }
        else if(res1.length==0){
          res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>No User Found</div></div>");
        }
        else{
          // res.render('viewUserDetails', {res1});
          res.send(res1)
        }
     });
  });
});

//......................................................................................
//.................................................................................
//Customer- Edit Profile


router.post('/editProfileDetails', function(req, res, next) {
  var r= req.body;
  console.log(r.cust_name, r.phone, r.password)
  mc.connect('mongodb://localhost:27017',function(error,msdb){
    msdb.db('musicSystem').collection('Customer').find({'cust_id':r.cust_id}).toArray(function(err,res1){
      if(err){
        throw err; 
      }
      else{
          if(res1.length==0){
            res.send("No Data found");
          }
          else{
            msdb.db('musicSystem').collection('Customer').updateOne({'cust_id':r.cust_id}, {$set: { 'cust_name':r.cust_name, 'passwd':r.password, 'phone':r.phone }}, function(err, res2){
				if(err){
					throw err;
				}
				else{
					res.send(true);
				}
			})
          }
          
      }
    });
  });
});
//................................................................................


//......................................................................................
//Admin- Songs dashboard
router.get('/songsPage', function(req, res, next) {
  res.render('songsPage');
});
//......................................................................................

//.....................................................................................
//Admin- view songs Details
router.get('/adminViewSongs', function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
     msdb.db('musicSystem').collection('Songs_Details').find().toArray(function(err,res1){
        if(err){
          throw err;
        }
        else if(res1.length==0){
          res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>No Song Found</div></div>");

        }
        else{
          // res.render('adminViewSongs', {res1});
          res.send(res1)
        }
     });
  });
});

//......................................................................................

//...........................................................................
//Admin- Add songs page
router.get('/adminAddSongs', function(req, res, next) {
  res.render('adminAddSongs', { title: 'Add Songs' });
});

router.post('/addSong', function(req, res, next) {
   //use mongoclient for connecting to mongodb
    var r=req.body;
    mc.connect('mongodb://localhost:27017', function(err, msdb){ 
    if(err) throw err;
    else{
      msdb.db('musicSystem').collection('Songs_Details').find({},{}).toArray(function(err, data){ 
        if(err) throw err
        else{
          var last_id = data[data.length-1].song_id; 
          var last_id = last_id.substr(1);
          var new_id = parseInt(last_id) + 1;
          var new_id = 's'+new_id.toString();
          //console.log(new_id);
          var myobj = { song_id: new_id, song_name: r.sName, genre:r.sGenre, song_duration:r.sDuration, album_name:r.sAlbum, release_date:r.sReleaseYear, artist_id:r.sArtistId};	//add details to insert into db
          msdb.db('musicSystem').collection('Songs_Details').insertOne(myobj, function(err,res2){
            if(err) { throw err; }
            else{
              res.send(res2);

            }
          })
        }
      });
    }
  })      
});
//.................................................................................

//...........................................................................
//Admin- Delete Songs
router.get('/adminDeleteSongs', function(req, res, next) {
  res.render('adminDeleteSongs', { title: 'Delete Profile Page' });
});

router.post('/deleteSong', function(req, res, next) {
  var r= req.body;
  mc.connect('mongodb://localhost:27017',function(error,msdb){
      msdb.db('musicSystem').collection('Songs_Details').find({song_id:r.sId, song_name:r.sName}).toArray(function(err,res1){
        if(err) throw err; 
        else{
            if(res1.length==0){
              res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>Song Not Found</div></div>");

            }
            else{
              var id = res1[0].song_id              
              msdb.db('musicSystem').collection('Songs_Details').deleteOne({song_id: res1[0].song_id}, function(err, data){
                if(err) throw err;
                else{
                  msdb.db('musicSystem').collection('Playlist').deleteMany({song_id: id}, function(err, data){
                    res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>Song Deleted</div></div>");
                  })
                  

                }
              });
            }            
        }
      });
  });
})
//...........................................................................

//......................................................................................
//Admin- Playlist dashboard
router.get('/playlistsPage', function(req, res, next) {
  res.render('playlistsPage');
});
//......................................................................................

//.....................................................................................
//Admin- view playlists
router.get('/adminViewPlaylists',function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
     msdb.db('musicSystem').collection('Playlists_Details').find().toArray(function(err,res1){
        if(err){
          throw err;
        }
        else if(res1.length==0){
          res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>No Playlist Found</div></div>");

        }
        else{
          // res.render('adminViewPlaylists', {res1});
          res.send(res1)
        }
     });
  });
});

//......................................................................................

//...........................................................................
//Admin- Add playlists
router.get('/adminCreatePlaylists', function(req, res, next) {
  res.render('adminCreatePlaylists', { title: 'Create Playlist' });
});

router.post('/createPlaylist', function(req, res, next) {
   //use mongoclient for connecting to mongodb
    var r=req.body;
    mc.connect('mongodb://localhost:27017', function(err, msdb){ 
    if(err) throw err;
    else{
      msdb.db('musicSystem').collection('Playlists_Details').find({},{}).toArray(function(err, data){ 
        if(err) throw err
        else{
          var last_id = data[data.length-1].playlist_id; 
          var last_id = last_id.substr(1);
          var new_id = parseInt(last_id) + 1;
          var new_id = 'p'+new_id.toString();
          console.log(new_id);
          var myobj = {playlist_id: new_id, playlist_name: r.pName, total_duration:0, no_of_songs:0, created_by_fr:r.creatorId};	//add details to insert into db
          msdb.db('musicSystem').collection('Playlists_Details').insertOne(myobj, function(err,res2){
            if(err) { throw err; }   
            else{
              res.send(true);

            }
          })
        }
      });
    }
  })      
});
//...........................................................................

//...........................................................................
//Admin- Delete Playlist
router.get('/adminDeletePlaylist', function(req, res, next) {
  res.render('adminDeletePlaylist', { title: 'Delete Profile Page' });
});

router.post('/deletePlaylist', function(req, res, next) {
  var r= req.body;
  mc.connect('mongodb://localhost:27017',function(error,msdb){
      msdb.db('musicSystem').collection('Playlists_Details').find({playlist_id:r.pId, playlist_name:r.pName}).toArray(function(err,res1){
        if(err) throw err; 
        else{
            if(res1.length==0){
              res.send("No Playlist Found");

            }
            else{
		var id = res1[0].playlist_id
              msdb.db('musicSystem').collection('Playlists_Details').deleteOne({playlist_id: id}, function(err, data){
                if(err) throw err;
                else{
		  msdb.db('musicSystem').collection('Playlist').deleteMany({playlist_id: id}, function(err, data){
				res.send("Playlist Deleted");
			})

                }
              });
            }            
        }
      });
  });
})
//...........................................................................

//.....................................................................................
//Customer- view songs Details
router.get('/customerViewSongs', function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
     msdb.db('musicSystem').collection('Songs_Details').find().toArray(function(err,res1){
        if(err){
          throw err;
        }
        else if(res1.length==0){
          res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>No Song Found</div></div>");

        }
        else{
          // res.render('customerViewSongs', {res1, v: req.query.cust_id});
          res.send(res1)
        }
     });
  });
});

//......................................................................................

//......................................................................................
//Customer Review Playlist

router.get('/selectPlaylist', function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
	  var r = req.query;
     msdb.db('musicSystem').collection('Playlists_Details').find({'created_by_fr': r.id}).toArray(function(err,res1){
        if(err){
          throw err;
        }
        else if(res1.length==0){
          res.send(false);

        }
        else{
          res.send(res1)
        }
     });
  });
});

//......................................................................................

//......................................................................................
//Customer Review Playlist
router.post('/addToPlaylist', function(req, res, next) {
  mc.connect('mongodb://localhost:27017',function(error,msdb){
	  var r = req.body;
     msdb.db('musicSystem').collection('Playlists_Details').find({'created_by_fr': r.cust_id, 'playlist_id': r.playlist_id}).toArray(function(err,res1){
        if(err){
          throw err;
        }
        else if(res1.length==0){
          res.send('0');

        }
        else{
			msdb.db('musicSystem').collection('Playlist').find({'playlist_id': r.playlist_id, 'song_id': r.song_id}).toArray(function(err,result){
			if(err)throw err
			else{
				if(result.length==0){
					var new_dur = res1[0].total_duration + parseInt(r.song_duration);
					var newNoOfSongs = res1[0].no_of_songs + 1;
					msdb.db('musicSystem').collection('Playlists_Details').updateOne({'playlist_id': r.playlist_id}, {$set: {'total_duration': new_dur, 'no_of_songs': newNoOfSongs}}, function(err, res2){
						if(err)throw err;
						else{
								msdb.db('musicSystem').collection('Playlist').insertOne({'playlist_id': r.playlist_id, 'song_id': r.song_id}, function(err, res3){
								if(err) throw err;
								else{
									res.send('1')
								}
							});
						}
					});
				}
				else{
					res.send('2')
				}
			}
		});
		}
	 });
  });
});
			
//......................................................................................

//......................................................................................
//Customer- Create playlist

router.post('/customerCreatePlaylist', function(req, res, next) {
   //use mongoclient for connecting to mongodb
    var r=req.body;
    mc.connect('mongodb://localhost:27017', function(err, msdb){ 
    if(err) throw err;
    else{
      msdb.db('musicSystem').collection('Playlists_Details').find({},{}).toArray(function(err, data){ 
        if(err) throw err
        else{
          var last_id = data[data.length-1].playlist_id; 
          var last_id = last_id.substr(1);
          var new_id = parseInt(last_id) + 1;
          var new_id = 'p'+new_id.toString();
          console.log(new_id);
          var myobj = {playlist_id: new_id, playlist_name: r.pName, total_duration:0, no_of_songs:0, created_by_fr:r.creatorId};	//add details to insert into db
          msdb.db('musicSystem').collection('Playlists_Details').insertOne(myobj, function(err,res2){
            if(err) { throw err; }
            else{
              res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>Playlist Created Successfully</div></div>");

            }
          })
        }
      });
    }
  })      
});


//Customer- Create Playlist only
router.get('/customerPlaylistsPage',function(req,res,next){
  res.render("customerPlaylistsPage",{id:req.query.cust_id});
})

router.get('/customerCreatePlaylists1',function(req,res,next){
  res.render("customerCreatePlaylists",{id:req.query.cust_id});
})
//---------------------------------------------------------------------------------------

//...........................................................................
//Customer- Delete Playlist
router.get('/customerDeletePlaylist', function(req, res, next) {
  res.render('customerDeletePlaylist', { title: 'Delete Playlist Page',id:req.query.cust_id });
});


router.post('/customerDeletePlaylist', function(req, res, next) {
  var r= req.body;
  mc.connect('mongodb://localhost:27017',function(error,msdb){
      msdb.db('musicSystem').collection('Playlists_Details').find({'created_by_fr':r.pId, 'playlist_name': r.pName}).toArray(function(err,res1){
        if(err) throw err; 
        else{
          console.log(res1)
            if(res1.length==0){
              res.send("<div style=' height: 100%; width: 100%; padding: 5%;background-image: linear-gradient(to top, rgba(244, 241, 187, 0.378), rgba(244, 241, 187, 0.878));align-items:center;')><div style='width: 10%; font-size: 20px; padding: 3%;border: 1px solid black;'>Playlist Not Found</div></div>");
            }
            else{
              msdb.db('musicSystem').collection('Playlists_Details').deleteOne({playlist_id: res1[0].playlist_id}, function(err, data){
                if(err) throw err;
                else{
                  res.send("<body background='url(../public/images/mic.jpg)'>Playlist Deleted</body>");
                }
              });
            }            
        }
      });
  });
})
//...........................................................................


router.get('/deleteProfile',function(req,res,next){
  var r = req.query;
  mc.connect('mongodb://localhost:27017',function(error,msdb){
      msdb.db('musicSystem').collection('Customer').deleteOne({'cust_id':r.id}, function(err, data){
		  if(err) throw err
		  else{
			  res.send(true);
		  }
	  })
  
})
})



//...........................................................................
//Customer- View songs in Playlist

router.post('/viewSongsOfPlaylist', function(req, res, next){
	var r = req.body;
	mc.connect('mongodb://localhost:27017', function(error, msdb){
		msdb.db('musicSystem').collection('Playlists_Details').aggregate([
		{
			'$lookup':
			{
				from: "Playlist",
				localField: "playlist_id",
				foreignField: "playlist_id",
				as: "Playlist"
			}
		},
		{
			'$lookup':
			{
				from: "Songs_Details",
				localField: "Playlist.song_id",
				foreignField: "song_id",
				as: "Songs_Details"	
			}
		},	
		{
			'$match': 
			{
				"playlist_name":r.playlist_name
			}
		},
		{
			'$project':
			{
				"_id":0,
				"Songs_Details.song_id":1,
				"Songs_Details.song_name":1
			}
		}
		]).toArray(function(err, res1){
			if(err){
				console.log("abc");
				throw err;
			}				
			else{
				console.log("else");
				res.send(res1);
			}
	
		})
})
})
//...........................................................................
//...........................................................................

//Customer- View songs according to Genre

router.post('/viewSongsGenreFilter', function(req, res, next){
	var r = req.body;
	mc.connect('mongodb://localhost:27017', function(error, msdb){
		msdb.db('musicSystem').collection('Songs_Details').find({"genre":r.genreName}).toArray(function(err, data){
			res.send(data);
		})
	})
})

//...........................................................................



module.exports = router;