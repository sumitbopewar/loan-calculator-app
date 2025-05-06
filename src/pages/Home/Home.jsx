import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import { useEMICalculator } from '../../hooks/useEMICalculator';
import { useAppContext } from '../../context/AppContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CommonTable from '../CommonTable';

const Home = () => {
    const [P, setP] = useState(100000);
    const [R, setR] = useState(8.5);
    const [N, setN] = useState(5);
    const [emiData, setEmiData] = useState(null);
    const { rates, getData, loading } = useAppContext();
    const [Currency, setCurrency] = React.useState('USD');

    // console.log( Currency);

    const conversionRates = {
        USD: 1,
        INR: 83,
        EUR: 0.93,
        GBP: 0.79,
        JPY: 155.31,
        AUD: 1.53,
    };


    const handleChange = (event) => {
        let currencyVal = event.target.value
        setCurrency(currencyVal);
        getData(currencyVal); // Fetch new exchange rates based on selected currency
    };


    const handleCalculate = () => {
        const result = useEMICalculator(P, R, N, Currency);
        setEmiData(result);
    };

    useEffect(() => {
        handleCalculate();
    }, [Currency])
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Loan Calculator Dashboard
            </Typography>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Loan Amount" variant="outlined" defaultValue={100000} onChange={e => setP(+e.target.value)} />
                <TextField id="outlined-basic" label="Interest Rate (%)" variant="outlined" defaultValue={8.5} onChange={e => setR(+e.target.value)} />
                <TextField id="outlined-basic" label="Term (Years)" variant="outlined" defaultValue={5} onChange={e => setN(+e.target.value)} />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleCalculate} sx={{ fontWeight: 400 }}>Calculate</Button>
                </Stack>
            </Box>

            {emiData && (
                <>
                    <Typography variant="h5" sx={{ fontSize: "20px", margin: "32px 0px -9px" }} gutterBottom>
                        Monthly EMI: ${emiData.static}
                    </Typography>


                    <div className="d" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ margin: "30px 0px", display: "flex", gap: "10px", alignItems: "center" }}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label" >Currency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Currency}
                                    label="Currency"
                                    onChange={handleChange}
                                    sx={{ padding: "0px 2px" }}
                                >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="EUR">EUR</MenuItem>
                                    <MenuItem value="INR">INR</MenuItem>
                                    <MenuItem value="GBP">GBP</MenuItem>
                                    <MenuItem value="JPY">JPY</MenuItem>
                                    <MenuItem value="AUD">AUD</MenuItem>
                                    <MenuItem value="EUR">EUR</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography variant="h5" sx={{ fontSize: "17px" }} gutterBottom>
                                Converted EMI: {emiData.emi + " " + Currency}
                            </Typography>
                        </Box>
                        <Button color="secondary" variant="outlined" style={{ minHeight: "50px" }} onClick={() => setEmiData(null)}>RESET TABLE</Button>
                    </div>
                    <CommonTable emiData={emiData} currency={Currency} />
                </>
            )}
        </>
    );
};

export default Home;