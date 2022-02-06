- [x] Conditional redenring of a component (line 54). I want to wait with rendering Routing.js until this.state.vehicles are populated. I'm checking this.state.vehicles !== undefined, but I still get an error in Routing.js that prop.vehicle undefined
	- [] I was checking if array is undefined. The array was defined but length of it was equal to 0. After checking length of the array problem was solved.

- [] Routing.js. Even if createRoutineMachine returns proper instance of L.Routing.control with all elements the component is not displayed
	- check how function createControlComponent works https://react-leaflet.js.org/docs/core-api/. Maybe the problem is that when it creates component it cannot be changed??? From the console.log(instance) in 45. line it appears as proper component with waypoints was created.

- [] how to get rid of the warnings we have


- mail to Borowski
- read about server send events flux po stronie backendu
- osobny json dla każdego pojazdu


- 