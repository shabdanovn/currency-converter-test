import React, {useEffect, useState} from 'react';
import usa from "../../images/usa.svg";
import ukraine from "../../images/ukraine.jpg";
import euro from "../../images/euro.svg";
import {API_KEY} from "../../utils/constants";
import './CurrencyTable.scss'

const CurrencyTable = () => {
    const [usd, setUsd] = useState(1)
    const [eur, setEur] = useState(1)

    useEffect( ()=> {
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/UAH`)
            .then(response => response.json())
            .then(response => {
                setEur(response["conversion_rates"]["EUR"])
                setUsd(response["conversion_rates"]["USD"])
            })
    }, [])

    return (
        <div className="currencies">
            <div className="currency">
                <div className="currency-item">
                    <p>1 UAH</p>
                    <img src={ukraine} alt="Ukraine flag"/>
                </div>
                <div className="currency-item">
                    <p>{usd.toFixed(3)} USD</p>
                    <img src={usa} alt="USA flag"/>
                </div>
            </div>
            <div className="currency">
                <div className="currency-item">
                    <p>1 UAH</p>
                    <img src={ukraine} alt="Ukraine flag"/>
                </div>
                <div className="currency-item">
                    <p>{eur.toFixed(3)} EUR</p>
                    <img src={euro} alt="Euro flag"/>
                </div>
            </div>
        </div>
    );
};

export default CurrencyTable;
