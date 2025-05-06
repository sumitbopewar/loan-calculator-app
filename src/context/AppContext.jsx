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
            let res = await axios.get(`https://v6.exchangerate-api.com/v6/d5394cdde95ff1c746f9dfc6/latest/${baseCurrency}`).then(res =>
                setRates(res.data.conversion_rates || {})
            )
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