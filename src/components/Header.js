import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({ title , onAdd, showAdd}) => {
  /**Destructuring - (props) to ({title}) */

  return (
    <header className="header">
      {/* <h1 style={{color:'red', backgroundColor:'black'}}>{title}</h1> */}
      {/* <h1 style={headingStyle}>{title}</h1> */}
      <h1>{title}</h1>
      {/* <button className='btn'>Add</button> */}
      <Button color={showAdd? 'red': "green"} text={showAdd?  'Close': 'Add'} onClick={onAdd}  />
    </header>
  );
};

/**
 * This is useful for writing default props
 */
Header.defaultProps = {
  title: "Default Tracker",
};

/**
 * Prop types - impt
 */
Header.prototypes = {
  title: PropTypes.string,
  // let's say if you require it:
  // PropTypes.string.required.
};

// const headingStyle = {
//     color:'red',
//     backgroundColor: 'black'
// }


export default Header;
