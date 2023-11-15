# FirebaseWebpushReact
How to use Firebase Webpush notification with React. All the frontend code is in App.js

## PLEASE NOTE THAT IS WORK PROPERLY ON HTTPS.

## How it works
The first thing you need to do is
<ol>
    <li>Install firebase npm package and define it in your project you can see <a href="./website//src/App.js">App.js</a></li>
    <li>
        Request for notification permission
        <pre>
        async function requestPermission() {
            console.log('Requesting permission...');
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                return true;
            }
        }
        </pre>
    </li>
    <li>
        If the permission is granted the called the 'getToken' method to get the notification token. This token is what you use to send the notification to that user. Usually saved on the database.
    </li>
    <li>
        The last piece of code you need is the service worker. When the browser is close or window are closed. The notification should still pop up. <a href="./website/public/firebase-messaging-sw.js">firebase-messaging-sw.js</a> is responsible for that. AND IT HAS TO BE NAME <b>firebase-messaging-sw.js</b>, because that is what firebase looks for. It should be located in the public folder. The code to put in it is found in their docs <a href="https://firebase.google.com/docs/cloud-messaging/js/receive">here.</a>
    </li>
    <li>
        Use Firebase Cloud Message or an API to send Notification
        <pre>
            POST - https://fcm.googleapis.com//v1/projects/{FIREBASE-PROJECT-ID}/messages:send
            AUTHORIZATION - Bearer {access_token}
            BODY - {
                    "message": {
                        "token": "{NOTICATION-TOKEN}",
                        "notification": {
                        "title": "Background Message Title",
                        "body": "Background message body"
                        },
                        "webpush": {
                            "fcm_options": {
                                "link": "https://dummypage.com"
                                }
                            }
                        }
                    }
        </pre>
        <br/>
        You can get the access_token from here <a href="https://developers.google.com/oauthplayground/">Google Developer Playground</a>
        Add <b>https://www.googleapis.com/auth/firebase.messaging</b> as a scope.
    </li>
<ol>


## PLEASE NOTE THAT IS WORK PROPERLY ON HTTPS.