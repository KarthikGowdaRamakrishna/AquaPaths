import { LOOKUP } from "../Static/lookup";
import { useTranslation } from 'react-i18next';

const CO2Metrics = (co2data: any) => {
    const { t } = useTranslation();
    return (
        <div className="carbon-emission">
            <>
                <h4>{t(LOOKUP.CARBON_EMISSIONS.CO2_EMISSIONS_STATISTICS)}</h4>
                <ul>
                    <li>{LOOKUP.CARBON_EMISSIONS.AVERAGE}: {co2data.co2data?.average} {LOOKUP?.CARBON_EMISSIONS?.GPT}</li>
                    <li>{LOOKUP.CARBON_EMISSIONS.MINIMUM}: {co2data.co2data?.min} {LOOKUP?.CARBON_EMISSIONS?.GPT}</li>
                    <li>{LOOKUP.CARBON_EMISSIONS.MAXIMUM}: {co2data.co2data?.max} {LOOKUP?.CARBON_EMISSIONS?.GPT}</li>
                    <li>{LOOKUP.CARBON_EMISSIONS.STANDARD_DEVIATION}: {LOOKUP?.CARBON_EMISSIONS?.GPT} {co2data?.co2data.standardDeviation} </li>
                </ul>
                <div>
                    {LOOKUP?.CARBON_EMISSIONS?.GPT} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}
                </div>
            </>

            {/* <h2>{LOOKUP.CARBON_EMISSIONS.WELL_TO_WHEELS_EMISSIONS}</h2>
            <ul>
                <li>{LOOKUP.CARBON_EMISSIONS.AVERAGE_WTW_EMISSIONS}: {co2data?.intensity?.average} {LOOKUP.CARBON_EMISSIONS.KG_OF_CO2_PER_TON_KILOMETER}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.MINIMUM_WTW_EMISSIONS}: {co2data?.intensity?.min} {LOOKUP.CARBON_EMISSIONS.KG_OF_CO2_PER_TON_KILOMETER}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.MAXIMUM_WTW_EMISSIONS}: {co2data?.intensity?.max} {LOOKUP.CARBON_EMISSIONS.KG_OF_CO2_PER_TON_KILOMETER}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.STANDARD_DEVIATION_WTW_EMISSIONS}: {co2data?.intensity?.standardDeviation} {LOOKUP.CARBON_EMISSIONS.KG_OF_CO2_PER_TON_KILOMETER}</li>
            </ul>

            <h2>{LOOKUP.CARBON_EMISSIONS.TANK_TO_WHEELS_EMISSIONS}</h2>
            <ul>
                <li>{LOOKUP.CARBON_EMISSIONS.AVERAGE_TTW_EMISSIONS}: {co2data?.ttw?.average} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.MINIMUM_TTW_EMISSIONS}: {co2data?.ttw?.min} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.MAXIMUM_TTW_EMISSIONS}: {co2data?.ttw?.max} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}</li>
            </ul>

            <h2>{LOOKUP.CARBON_EMISSIONS.WELL_TO_TANK_EMISSIONS}</h2>
            <ul>
                <li>{LOOKUP.CARBON_EMISSIONS.AVERAGE_WTT_EMISSIONS}: {co2data?.wtt?.average} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.MINIMUM_WTT_EMISSIONS}: {co2data?.wtt?.min} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}</li>
                <li>{LOOKUP.CARBON_EMISSIONS.MAXIMUM_WTT_EMISSIONS}: {co2data?.wtt?.max} {LOOKUP.CARBON_EMISSIONS.GRAMS_PER_TEU}</li>
            </ul> */}
        </div>
    );
};

export default CO2Metrics;
