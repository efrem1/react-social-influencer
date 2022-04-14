import React, {memo} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';


const languages = [
    {
        code:'nl',
        name:'Deutsch'
    },
    {
        code: 'en',
        name: 'English'
    }
]
export const  Language = memo(()=>{
    const { t, i18n } = useTranslation();
    const handleChange = ({target:{value}})=>{
        i18n.changeLanguage(value);
    }
    return(
    <FormControl variant="standard" sx={{  minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={i18n.language}
          onChange={handleChange}
          label="Age"
        >
         {languages.map(lang=>{
             return <MenuItem key={lang.code} value={lang.code}>{lang.name}</MenuItem>
         })}
        </Select>
    </FormControl>
    )
});