import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import './CurrencyConverter.scss'
import {API_KEY} from "../../utils/constants";

const CurrencyConverter = () => {
    const [firstCur, setFisrtCur] = useState('');
    const [secondCur, setSecondCur] = useState('');
    const [firstValue, setFirstValue] = useState(1)
    const [secondValue, setSecondValue] = useState(1)

    const fetchData = (base1, base2, type, amount=1) => {
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${base1}/${base2}/${amount}`)
            .then(response => response.json())
            .then(response => {
                if(type === 1) setFirstValue(response["conversion_result"].toFixed(3))
                else setSecondValue(response["conversion_result"].toFixed(3))
            })
    }

    const firstCurHandle =async (event) => {
        setFisrtCur(event.target.value);
        if(secondCur)
            fetchData(secondCur, event.target.value, 1, secondValue)
        else setFirstValue(1)
    };

    const secondCurHandle =async (event) => {
        setSecondCur(event.target.value);
        if(firstCur)
            fetchData(firstCur, event.target.value, 2, firstValue)
        else setSecondValue(1)
    };

    const firstValueChange =async (event) => {
        setFirstValue(event.target.value)
        if(+event.target.value === 0) setSecondValue(0)
        else if(secondCur && event.target.value)
            fetchData(firstCur, secondCur, 2, +event.target.value)
    }

    const secondValueChange =async (event) => {
        setSecondValue(event.target.value)
        if(+event.target.value === 0) setFirstValue(0)
        else if(firstCur && event.target.value)
            fetchData(secondCur, firstCur, 1, +event.target.value)
    }

    return (
        <div className="currency-converter">
            <div className="currency-converter__item">
                <Box sx={{ width: 180, margin: "0 auto 1rem auto" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={firstCur}
                            label="Currency"
                            onChange={firstCurHandle}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                            <MenuItem value={'UAH'}>UAH</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        '& > :not(style)': { width: 180 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Value"
                        variant="outlined"
                        value={firstValue}
                        onChange={firstValueChange}
                        disabled={!firstCur}
                        type="number"
                    />
                </Box>
            </div>

            <div className="currency-converter__item">
                <Box sx={{ width: 180, margin: "0 auto 1rem auto" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={secondCur}
                            label="Currency"
                            onChange={secondCurHandle}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                            <MenuItem value={'UAH'}>UAH</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box
                    sx={{
                        '& > :not(style)': { width: 180 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Value"
                        variant="outlined"
                        value={secondValue}
                        onChange={secondValueChange}
                        disabled={!secondCur}
                        type="number"
                    />
                </Box>
            </div>
        </div>
    );
};

export default CurrencyConverter;
