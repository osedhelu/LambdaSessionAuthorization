 // convertToResponse(event)
    const newUsers = JSON.parse(event.body);
    const users = new User(newUsers); 
        users.save().then((value) => {
            let myResponse = {
                'statusCode': 200,
                'body': JSON.stringify({
                   users:{
                    users
                }

            })};
            callback(null, myResponse)

        }).catch((err) => {

            callback(err, null)

        });