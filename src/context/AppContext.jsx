import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    console.log(rates)

    const getData = async (baseCurrency = "USD") => {
        // console.log(baseCurrency, "baseCurrency---------");
        try {
            let res = await axios.get(`https://v6.exchangerate-api.com/v6/6a276e4e8ff8e3a2f7f702d7/latest/${baseCurrency}`).then(res =>
                setRates(res.data.conversion_rates || {})
            )
            console.log(res)
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <AppContext.Provider value={{ rates, loading, getData }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);