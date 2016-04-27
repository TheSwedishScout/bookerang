activity([	
			{id:1,Name:"aktivitet1", Description: "en rolig aktivitet för folket", min:10, max:50},
			{id:2,Name:"aktivitet2", Description: "en mycket rolig aktivitet för folket", min:10, max:50, occurrence:[
				{id:102, Activity:2, Status:"activ", date: "2016-07-19", startTime: "19:00", endTime: "20:00", place:"marken", BookingWindow: "?", Priority: "Black"},
				{id:103, Activity:2, Status:"activ", date: "2016-07-18", startTime: "15:00", endTime: "23:00", place:"marken", BookingWindow: "?", Priority: "Black"},
				{id:104, Activity:2, Status:"activ", date: "2016-07-20", startTime: "16:00", endTime: "17:30", place:"marken", BookingWindow: "?", Priority: "Black"},
				]
			}
		]);
/*occurrence([
	{id:101, Activity:1, Status:"activ", date: "2016-07-18", startTime: "10:00", endTime: "12:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:101, Activity:1, Status:"activ", date: "2016-07-19", startTime: "16:00", endTime: "18:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:102, Activity:2, Status:"activ", date: "2016-07-19", startTime: "19:00", endTime: "20:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:103, Activity:2, Status:"activ", date: "2016-07-18", startTime: "15:00", endTime: "23:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:104, Activity:2, Status:"activ", date: "2016-07-20", startTime: "16:00", endTime: "17:30", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:105, Activity:1, Status:"activ", date: "2016-07-21", startTime: "20:00", endTime: "23:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:106, Activity:1, Status:"activ", date: "2016-07-19", startTime: "16:00", endTime: "23:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:107, Activity:1, Status:"activ", date: "2016-07-20", startTime: "10:00", endTime: "11:00", place:"marken", BookingWindow: "?", Priority: "Black"},
	{id:108, Activity:1, Status:"activ", date: "2016-07-18", startTime: "18:00", endTime: "19:00", place:"marken", BookingWindow: "?", Priority: "Black"}
	])

/*
Activity:
    - ID
    - Name
    - Description text
    - Min participants
    - Max participants
Occurrence:
    - ID
    - Activity
    - Status
    - Date
    - Start time
    - End time
    - Place
    - Booking window
    - [Priority]
*/