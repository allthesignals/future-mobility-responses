//gl program attribute locations
const OFFSET_LOCATION = 0;
const ROTATION_LOCATION = 1;
const POSITION_LOCATION = 2;
const COLOR_LOCATION = 3;
const AGE_LOCATION = 4;
const INIT_OFFSET_LOCATION = 5;
const PICKING_COLOR_LOCATION = 6;
const PICKING_POSITION_LOCATION = 7;

export {
  OFFSET_LOCATION,
  ROTATION_LOCATION,
  POSITION_LOCATION,
  COLOR_LOCATION,
  AGE_LOCATION,
  INIT_OFFSET_LOCATION,
  PICKING_COLOR_LOCATION,
  PICKING_POSITION_LOCATION
}

//Global constants for the visualization
const COLOR_RAMP = [
  0, 122, 102,  // ???
  125, 0, 46,  // cars

  51, 114, 169,  // people
  105, 44, 122,  // environ
  220, 100, 156, // 
  213, 29, 82,  // ethics
  77, 183, 72,  // money
  0, 65, 107,  // time
  241, 93, 42,  // equity
  223, 199, 35,  // jobs
].map(d => d/255);

export {
  COLOR_RAMP
}
