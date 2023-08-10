import { tooltip_10YrPopulation, tooltip_homePriceToIncome, tooltip_medianHouseHold, useCaseChipValue } from 'shared/constants/attachment-extention'

export const ArrangeSearchData = (data) => {
    let finalData = []
    const cityData = data['CityData']
    const marketData = data['MarketSegmentData']
    const generalStat = data['GeneralStat']
    const useCasesData = data['UseCases']
    if (cityData && cityData.length > 0) {
        let row = {
            type: 1,
            cols: []
        }
        const coldata = cityData[0].map((city) => {
            return city['name']
        })
        row['cols'] = ["", ...coldata]
        finalData = [...finalData, row]

    }
    if (marketData && marketData.length > 0) {
        let row = {
            type: 2,
            cols: []
        }
        const coldata = marketData[0].map(({ clusterName, cluster_code }) => {
            return {
                clusterName: clusterName,
                clusterCode: cluster_code
            }
        })
        row['cols'] = ["Market Segment", ...coldata]
        finalData = [...finalData, row]
    }
    if (generalStat && generalStat[0].data && generalStat[0].data.length > 0) {
        let row = {
            type: 3,
            cols: ["General Statistics"]
        }
        finalData = [...finalData, row]

        let homePToIncomeValues = [];
        let tenYrPopulationValues = [];
        let medianIncomeValues = [];
        generalStat[0].data.map(({ homePToIncome, tenYearPopGrowthRate, medianIncome }) => {
            homePToIncomeValues = [...homePToIncomeValues, homePToIncome];
            tenYrPopulationValues = [...tenYrPopulationValues, tenYearPopGrowthRate];
            medianIncomeValues = [...medianIncomeValues, medianIncome]
        })
        let generalStatValues = []
        generalStatValues = [...generalStatValues, { tableHeaderTitle: "10-year Population Growth Rate", toolTip: tooltip_10YrPopulation, groupData: tenYrPopulationValues }]
        generalStatValues = [...generalStatValues, { tableHeaderTitle: "Home Price to Income Ratio", toolTip: tooltip_homePriceToIncome, groupData: homePToIncomeValues }]
        generalStatValues = [...generalStatValues, { tableHeaderTitle: "Median Income", toolTip: tooltip_medianHouseHold, groupData: medianIncomeValues }]
        finalData = [
            ...finalData,
            {
                type: 4,
                cols: generalStatValues
            }
        ]
    }
    if (useCasesData && useCasesData[0].data && useCasesData[0].data.length > 0) {
        let row = {
            type: 5,
            cols: ["Use Case Score"]
        }
        finalData = [...finalData, row]
        let useCaseValue = [];
        let { data, label } = useCasesData[0];
        label.map(({ use_case_group, use_case_group_desc, use_case_color }) => {
            let useCaseRow = { use_case_group, use_case_group_desc, use_case_color }
            const groupData = data.map((element) => {
                const isMax = use_case_group === element.max;
                return {
                    isMax,
                    value: {
                        ...element[use_case_group],
                        statusChipBgcolor: useCaseChipValue[element[use_case_group].grade],
                        percentileChipBgcolor: useCaseChipValue["PE"]
                    }
                }

            })
            useCaseRow = { ...useCaseRow, groupData }
            useCaseValue = [...useCaseValue, useCaseRow]
        })
        finalData = [
            ...finalData,
            {
                type: 6,
                cols: useCaseValue
            }
        ]
    }
    return finalData
}
