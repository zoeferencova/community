# CommUnity
Bringing communities together in a time of need

Live app: https://comm-unity.vercel.app/

## Summary

During the pandemic, I was living in Woodside, Queens, where we were hit particularly hard by Covid. While it is heartbreaking to see the damage and loss that was caused, it was great to see my community come together to support each other. I started to see a lot of hand written signs around my apartment building and on the streets offering help to those who are in high risk categories. This inspired me to create an app that simplifies the process of getting in touch with neighbors to offer a hand or request help.  

Users can post offers to help or requests for help across a number of categories such as picking up supplies, dog walking, running errands, or a friendly chat. Each user sets their location and radius and can view and respond to posts from other users in their area. This initiates a private chat where the users can work out the details.

## Technologies Used

* React with CSS Modules, Context API, and React Router
* Socket.io for live chat web sockets
* Google Maps API for maps
* Jest and Enzyme for frontend testing

## Demo Account

To access the demo account, click on the "See a demo" button on the landing page. You will be automatically logged in as a demo user and able to use the app as a regular user.

## API

Server side repository can be found [here](https://github.com/zoeferencova/community-api).

## To-do

- [ ] Update tests (currently learning new methods for testing)
- [ ] Transition from Context API to Redux
- [ ] Transition AuthenticatedApp component to a functional component
- [ ] Make Google Maps script load from single source
- [ ] Add chat functionality: online status, typing, image messages, group chatrooms
- [ ] Look into caching/memoization methods that could increase performance
- [ ] Add search and filtering to post list
