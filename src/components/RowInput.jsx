import React, { useState, useRef, memo } from "react";
import { Box, TextField, Typography, Chip, FormControl } from "@mui/material";
import { useDebounce } from "../hooks";

export const RowInput = memo(
  ({
    label,
    title,
    value,
    total = 80,
    onChangeText,
    name,
    suggestions = [],
    ...otherProps
  }) => {
    const textInput = useRef(null);
    const [typed, setTyped] = useState(0);
    const [text, setText] = useState(value);
    useDebounce(handlChangeText, 500, [text]);
    const onChange = ({ target: { value } }) => {
      setTyped(value.length);
      setText(value);
    };
    function handlChangeText() {
      onChangeText(text, name);
    }
    return (
      <Box container style={{ width: "110vh", padding: 8 }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ padding: 6 }}>{title}</Typography>
          <Typography>{`${typed}/${total}`}</Typography>
        </Box>
        {suggestions.map((item) => {
          return (
            <Chip
              sx={{ m: 1 }}
              label={item.title}
              onClick={() => {
                textInput.current.focus();
                setText(item.description);
              }}
            />
          );
        })}
        <FormControl ref={textInput} fullWidth>
          <TextField
            disabled={typed === total}
            color="secondary"
            fullWidth
            value={text}
            name={name}
            label={label}
            onChange={onChange}
            {...otherProps}
          />
        </FormControl>
      </Box>
    );
  }
);
