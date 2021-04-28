var mc=require('mongodb').MongoClient;

customerData= [
		{"cust_id":"c101","cust_name":"Tom","email":"tom@gmail.com","phone":1234567890,"passwd":"tomtom"},
		{"cust_id":"c102","cust_name":"Ross","email":"ross@ymail.com","phone":2345678910,"passwd":"rosros"},
		{"cust_id":"c103","cust_name":"Ron","email":"ron@rediff.com","phone":3456789123,"passwd":"ronron"},
		{"cust_id":"c104","cust_name":"Harry","email":"harry@gmail.com","phone":4567891234,"passwd":"harhar"},
		{"cust_id":"c105","cust_name":"Patrick","email":"patrick@gmail.com","phone":5678912345,"passwd":"patpat"},
		{"cust_id":"c106","cust_name":"Monica","email":"monica@gmail.com","phone":6789123456,"passwd":"monmon"},
		{"cust_id":"c107","cust_name":"Rachel","email":"rachel@ymail.com","phone":7894561231,"passwd":"racrac"},
		{"cust_id":"c108","cust_name":"Phoebe","email":"phoebe@gmail.com","phone":8945612378,"passwd":"phopho"},
		{"cust_id":"c109","cust_name":"John","email":"john@rediff.com","phone":9987456321,"passwd":"jonjon"},
		{"cust_id":"c110","cust_name":"Joey","email":"joey@gmail.com","phone":8528529637,"passwd":"joeyyy"}

	]
adminData=[ 
		{"admin_id":"1001","admin_name":"Himanshu","admin_password":"Himanshu@1001"},
		{"admin_id":"1002","admin_name":"Srushti","admin_password":"Srushti@1002"},
		{"admin_id":"1003","admin_name":"Rishabh","admin_password":"Rishabh@1003"},
		{"admin_id":"1004","admin_name":"Srishti","admin_password":"Srishti@1004"},
		{"admin_id":"1005","admin_name":"Siddharth","admin_password":"Siddharth@1005"}

	]
artistData=[
		{"artist_id":"101","artist_name":"Arijit Singh","recordLabel":"T-Series"},
		{"artist_id":"102","artist_name":"Atif Aslam","recordLabel":"T-Series"},
		{"artist_id":"103","artist_name":"Rahat Fateh Ali Khan","recordLabel":"T-Series"},
		{"artist_id":"104","artist_name":"Alka Yagnik","recordLabel":"P-Series"},
		{"artist_id":"105","artist_name":"Honey Singh","recordLabel":"P-Series"},
		{"artist_id":"106","artist_name":"Nucleya","recordLabel":"SpinningTv"},
		{"artist_id":"107","artist_name":"Alan Walker","recordLabel":"SpinningTv"},
		{"artist_id":"108","artist_name":"Martin Garrix","recordLabel":"SpinningTv"},
		{"artist_id":"109","artist_name":"DJ Snake","recordLabel":"SpinningTv"},
		{"artist_id":"110","artist_name":"Shreya Goshal","recordLabel":"T-Series"}

	]
playlistDetailsData=[
		{"playlist_id":"p101","playlist_name":"Phod denge","total_duration":25,"no_of_songs":5,"created_by_fr":"c101"},
		{"playlist_id":"p102","playlist_name":"Kya hua tera wada","total_duration":40,"no_of_songs":9,"created_by_fr":"c104"},
		{"playlist_id":"p103","playlist_name":"Dekhte Dekhte","total_duration":35,"no_of_songs":8,"created_by_fr":"c106"},
		{"playlist_id":"p104","playlist_name":"Woh Din","total_duration":20,"no_of_songs":4,"created_by_fr":"c108"},
		{"playlist_id":"p105","playlist_name":"Badtameez Dil","total_duration":30,"no_of_songs":10,"created_by_fr":"c110"},

		{"playlist_id":"p106","playlist_name":"Romance","total_duration":20,"no_of_songs":5,"created_by_fr":"1001"},
		{"playlist_id":"p107","playlist_name":"Party","total_duration":25,"no_of_songs":5,"created_by_fr":"1002"},
		{"playlist_id":"p108","playlist_name":"Hip-Hop","total_duration":15,"no_of_songs":5,"created_by_fr":"1003"},
		{"playlist_id":"p109","playlist_name":"90s & Early 2000s ", "total_duration":16, "no_of_songs":5 , "created_by_fr":"1004"},
		{"playlist_id":"p110","playlist_name":"Rock","total_duration":18,"no_of_songs":5,"created_by_fr":"1005"}

	]
songDetails=[
		{"song_id":"s01","song_name":"Khairiyat","genre":"Indian Pop","song_duration":5,"album_name": "Chhichhore","release_date":2019,"artist_id":"101"},
		{"song_id":"s02","song_name":"Dil Diyan Gallan","genre":"Indian Pop","song_duration":3,"album_name":"Tiger Zinda  Hai","release_date":2017,"artist_id":"102"},
		{"song_id":"s03","song_name":"Afreen Afreen","genre":"Bollywood folk","song_duration":7,"album_name":"Coke Studio","release_date":2016,"artist_id":"103"},
		{"song_id":"s04","song_name":"Brown Rang","genre":"Punjabi Pop","song_duration":3,"album_name":"International Villager","release_date":2011,"artist_id":"105"},
		{"song_id":"s05","song_name":"There For You","genre":"Big Room House","song_duration":4,"album_name":"There for You","release_date":2017,"artist_id":"108"},
		{"song_id":"s06","song_name":"Taki Taki","genre":"Big Room House","song_duration":4,"album_name":"Taki Taki","release_date":2018,"artist_id":"109"},
		{"song_id":"s07","song_name":"Agar Tum sath ho","genre":"Bollywood folk","song_duration":6,"album_name":"Tamasha","release_date":2015,"artist_id":"104"},
		{"song_id":"s08","song_name":"Bhayanak Aatma","genre":"Deep House","song_duration":4,"album_name":"Raja Baja","release_date":2016,"artist_id":"106"},
		{"song_id":"s09","song_name":"Faded","genre":"House Music","song_duration":4,"album_name":"Faded","release_date":2017,"artist_id":"107"},
		{"song_id":"s10","song_name":"Is Qadar", "genre":"Indian Pop","song_duration":4,"album_name": "Is Qadar","release_date":2020,"artist_id":"101"},
		{"song_id":"s11","song_name":"Baarish ki Jaaye", "genre":"Indian Pop","song_duration":4,"album_name":"Baarish ki Jaaye","release_date":2017,"artist_id":"102"},
		{"song_id":"s12","song_name":"Tum Pe Hum Toh", "genre":"Indian Pop","song_duration":4,"album_name":"Tiger Zinda  Hai","release_date":2018,"artist_id":"102"},
		{"song_id":"s13","song_name":"Mazaa","genre":"Bollywood Folk","song_duration":4,"album_name":"Jaane De","release_date":2015,"artist_id":"103"},
		{"song_id":"s14","song_name":"Tum Hi Aana","genre":"Bollywood folk","song_duration":4,"album_name":"Marjawaan", "release_date":2018,"artist_id":"105"},
		{"song_id":"s15","song_name":"Abhi Toh Party Shuru Hui","genre":"Indian Pop","song_duration":5,"album_name":"There for You","release_date":2017,"artist_id":"108"},
		{"song_id":"s16","song_name":"Kar Gayi Chull","genre":"Indian Pop","song_duration":5,"album_name":"Taki Taki","release_date":2018,"artist_id":"109"},
		{"song_id":"s17","song_name":"Kala Chasma","genre":"Indian Pop","song_duration":5,"album_name":"Tamasha","release_date":2015,"artist_id":"104"},
		{"song_id":"s18","song_name":"Cheap Thrills","genre":"Electropop","song_duration":5,"album_name":"Raja Baja","release_date":2016,"artist_id":"106"},
		{"song_id":"s19","song_name":"Shape Of You", "genre":"Pop", "song_duration":5, "album_name":"Faded","release_date":2017,"artist_id":"107"},
		{"song_id":"s20","song_name":"Chote Chote Peg","genre":"Indian Pop","song_duration":5,"album_name": "Sonu Ki Titu Ki Sweety", "release_date":2019,"artist_id":"101"},
		{"song_id":"s22","song_name":"Ghungroo","genre":"Indian Pop","song_duration":3,"album_name":"War","release_date":2019,"artist_id":"102"},
		{"song_id":"s23","song_name":"Tum Se Hi","genre":"Bollywood folk","song_duration":7,"album_name":"Jab We Met","release_date":2006,"artist_id":"103"},
		{"song_id":"s24","song_name":"Phir Mohabbat","genre":"Indian Pop","song_duration":3,"album_name":"Murder 2", "release_date":2011,"artist_id":"105"},
		{"song_id":"s25","song_name":"Kal Ho Na Ho","genre":"Indian Pop","song_duration":4,"album_name":"Kal Ho Na Ho","release_date":2003,"artist_id":"104"}

	]
	playlistData=[
		{"playlist_id":"p106","song_id":"s01"},
		{"playlist_id":"p106","song_id":"s02"},
		{"playlist_id":"p106","song_id":"s10"},
		{"playlist_id":"p106","song_id":"s13"},
		{"playlist_id":"p106","song_id":"s14"},


		{"playlist_id":"p107","song_id":"s15"},
		{"playlist_id":"p107","song_id":"s16"},
		{"playlist_id":"p107","song_id":"s17"},
		{"playlist_id":"p107","song_id":"s18"},
		{"playlist_id":"p107","song_id":"s19"},

		{"playlist_id":"p108","song_id":"s04"},
		{"playlist_id":"p108","song_id":"s08"},
		{"playlist_id":"p108","song_id":"s09"},
		{"playlist_id":"p108","song_id":"s11"},
		{"playlist_id":"p108","song_id":"s12"},

		{"playlist_id":"p109","song_id":"s05"},
		{"playlist_id":"p109","song_id":"s06"},
		{"playlist_id":"p109","song_id":"s23"},
		{"playlist_id":"p109","song_id":"s24"},
		{"playlist_id":"p109","song_id":"s25"},

		{"playlist_id":"p110","song_id":"s03"},
		{"playlist_id":"p110","song_id":"s07"},
		{"playlist_id":"p110","song_id":"s20"},
		{"playlist_id":"p110","song_id":"s21"},
		{"playlist_id":"p110","song_id":"s22"},


		{"playlist_id":"p101","song_id":"s04"},
		{"playlist_id":"p101","song_id":"s07"},
		{"playlist_id":"p101","song_id":"s08"},
		{"playlist_id":"p101","song_id":"s11"},
		{"playlist_id":"p101","song_id":"s14"},

		{"playlist_id":"p102","song_id":"s24"},
		{"playlist_id":"p102","song_id":"s07"},
		{"playlist_id":"p102","song_id":"s08"},
		{"playlist_id":"p102","song_id":"s11"},
		{"playlist_id":"p102","song_id":"s15"},
		{"playlist_id":"p102","song_id":"s16"},
		{"playlist_id":"p102","song_id":"s17"},
		{"playlist_id":"p102","song_id":"s08"},
		{"playlist_id":"p102","song_id":"s11"},


		{"playlist_id":"p103","song_id":"s14"},
		{"playlist_id":"p103","song_id":"s07"},
		{"playlist_id":"p103","song_id":"s08"},
		{"playlist_id":"p103","song_id":"s11"},
		{"playlist_id":"p103","song_id":"s15"},
		{"playlist_id":"p103","song_id":"s16"},
		{"playlist_id":"p103","song_id":"s17"},
		{"playlist_id":"p103","song_id":"s08"},

		{"playlist_id":"p104","song_id":"s17"},
		{"playlist_id":"p104","song_id":"s02"},
		{"playlist_id":"p104","song_id":"s11"},
		{"playlist_id":"p1024","song_id":"s24"},

		{"playlist_id":"p105","song_id":"s24"},
		{"playlist_id":"p105","song_id":"s07"},
		{"playlist_id":"p105","song_id":"s08"},
		{"playlist_id":"p105","song_id":"s11"},
		{"playlist_id":"p105","song_id":"s15"},
		{"playlist_id":"p105","song_id":"s16"},
		{"playlist_id":"p105","song_id":"s17"},
		{"playlist_id":"p105","song_id":"s08"},
		{"playlist_id":"p105","song_id":"s11"},
		{"playlist_id":"p105","song_id":"s01"}

	]

	mc.connect('mongodb://localhost:27017', function(err, msdb){ 
     if(err) throw err;
     else{
       msdb.db('musicSystem').collection('Customer').insertMany(customerData);
	   msdb.db('musicSystem').collection('Admin').insertMany(adminData);
	   msdb.db('musicSystem').collection('Artists').insertMany(artistData);
	   msdb.db('musicSystem').collection('Playlists_Details').insertMany(playlistDetailsData);
	   msdb.db('musicSystem').collection('Songs_Details').insertMany(songDetails);
	   msdb.db('musicSystem').collection('Playlist').insertMany(playlistData);
	 }
	});
