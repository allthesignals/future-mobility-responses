//gl program attribute locations
const OFFSET_LOCATION = 0;
const ROTATION_LOCATION = 1;
const POSITION_LOCATION = 2;
const COLOR_LOCATION = 3;
const AGE_LOCATION = 4;
const INIT_OFFSET_LOCATION = 5;
const PICKING_COLOR_LOCATION = 6;

export {
  OFFSET_LOCATION,
  ROTATION_LOCATION,
  POSITION_LOCATION,
  COLOR_LOCATION,
  AGE_LOCATION,
  INIT_OFFSET_LOCATION,
  PICKING_COLOR_LOCATION
}

//Global constants for the visualization
const COLOR_RAMP = [
  125, 0, 46,  // cars
  213, 29, 82,  // equity (scale)
  0, 65, 107,  // time
  51, 114, 169,  // people
  241, 93, 42,  // robot
  223, 199, 35,  // bus driver
  0, 122, 102,  // ???
  77, 183, 72,  // money
  105, 44, 122,  // landscape
  220, 100, 156, // 
].map(d => d/255);

export {
  COLOR_RAMP
}
