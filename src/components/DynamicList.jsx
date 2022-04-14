import React from "react";
import {
  Typography,
  Box,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Check } from "@mui/icons-material";

export class DynamicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theList: props.list,
    };
  }
  onTodoBlur = (index) => {
    return () => {
      const temp = this.state.theList;
      const text = temp[index].message;
      if (text === "") {
        temp.splice(index + 1, 1);
      }
      this.setState({ theList: temp });
      this.props.onChange(this.state.theList, this.props.name);
    };
  };
  onTodoFocus = (index) => {
    return () => {
      const temp = this.state.theList;
      if (!temp[index + 1]) {
        temp.push({ index: index + 1, message: "" });
      }
      this.setState({ theList: temp });
    };
  };
  onChange = ({ target: { name, value } }) => {
    const temp = this.state.theList;
    temp[name].message = value;
    this.setState({ theList: temp });
  };
  render() {
    const { theList } = this.state;
    const { placeholder } = this.props;
    return (
      <>
        {theList.map((item, index) => {
          return (
            <Box
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton>
                {item.message === "" ? (
                  <Add color="secondary" fontSize="small" />
                ) : (
                  <Check color="success" fontSize="small" />
                )}
              </IconButton>

              <FormControl
                style={{ width: "100vh" }}
                onFocus={this.onTodoFocus(index)}
                onBlur={this.onTodoBlur(index)}
              >
                <TextField
                  fullWidth
                  name={index}
                  onChange={this.onChange}
                  variant="standard"
                  defaultValue={item.message}
                  placeholder={placeholder}
                  InputProps={{ disableUnderline: true }}
                />
              </FormControl>
            </Box>
          );
        })}
      </>
    );
  }
}
