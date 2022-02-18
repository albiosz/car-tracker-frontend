# Car tracker

This project is a frontend of service which was created for a bachelor thesis. The whole service allows a user to track vehicles.

<p align="center">
  <img src="https://drive.google.com/uc?id=10IMmolpQ4r1U04XHfmTZHQiao_gLDbiM" alt="Main screen"/> 
</p>


## Main parts of the project

### Live location of vehicles
User see live location of chosen vehicles.
<p align="center">
  <img src="https://drive.google.com/uc?id=16I7jyyj13eXGW3hluPcg3tT9gCcBJ4TQ" alt="Current position of vehicles"/> 
</p>


### Panel of a vehicle
User see details of a chosen vehicle by him/herself and have three actions: "Show history", "Follow" and "Show More".
<p align="center">
  <img src="https://drive.google.com/uc?id=1svga4DifwVrp_4k3EYP7aY2yuYdpfKTN" alt="Panel of a vehicle"/> 
</p>


#### Show history
User is able to see history of location of a vehicle. There are two types of history - long and short time history. 
<p align="center">
  <img src="https://drive.google.com/uc?id=1m5f8-ivuS2cJYuLVOoGxCxjcFBmWnefK" alt="History panel"/> 
</p>

Long time history can be chosen from interval and is displayed in a form of points.
<p align="center">
  <img src="https://drive.google.com/uc?id=1jQf4OenLneygWSoh4vghUURdYlsWLFmZ" alt="History panel"/> 
</p>

Short time history shows newest 35 locations points of a vehicle.
<p align="center">
  <img src="https://drive.google.com/uc?id=1M59YzO0y6WD8gRvAO_51HxjZKc3ovezL" alt="History panel"/> 
</p>

#### Follow
Functionality which allow user to follow a chosen vehicle, what means that view will be centered on the vehicle every time there is an update of location.
<p align="center">
  <img src="https://drive.google.com/uc?id=Plp6ETJVH21bA4QLRddIN34EywL0pg" alt="Follow"/> 
</p>

#### Show More
Another screen which shows more details of a chosen vehicle.
<p align="center">
  <img src="https://drive.google.com/uc?id=1ddnpTgr6s_oNcQ2Bor5kuiNI2-HZn7Xq" alt="Details screen"/> 
</p>

### Changing of a view
App react on actions of a user by changing view to relevant information according to taken action, e. g. when a user selects vehicles on a list, view change to show them all. 
<p align="center">
  <img src="https://drive.google.com/uc?id=1Ump4qBmqjS0EFRLIKva4etfAKRIjHlAP"/> 
</p>

The aim of these actions is to make using of the app more pleasant.

## Used technologies
* Frontend library - React (https://reactjs.org/)
* Central state - Redux (https://redux.js.org/)
* UI framework - MUI (https://mui.com/)
* Map - React Leaflet (https://react-leaflet.js.org/)

## How to run a project?

0. Prerequisite - NodeJs 14.17.0 or higher
1. Go to directory with the project.
2. Install dependencies - `npm install`
3. Run the app - `npm start`


