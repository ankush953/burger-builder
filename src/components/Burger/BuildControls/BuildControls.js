import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => <div className={classes.BuildControls}>
    <BuildControl></BuildControl>
</div>;

export default BuildControls;
