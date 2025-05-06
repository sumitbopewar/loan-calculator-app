import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CustomPaginationActionsTable from './CustomPaginationActionsTable'; // or whatever file name

const ExchangeRates = () => {
  const { rates, loading } = useAppContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (loading) return <p>Loading exchange rates...</p>;

  const currencyEntries = Object.entries(rates).map(([currency, rate]) => ({
    currency,
    rate,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Exchange Rates (Base: {Object.keys(rates)[0]})</h2>
      <CustomPaginationActionsTable
        rows={currencyEntries}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ExchangeRates;
