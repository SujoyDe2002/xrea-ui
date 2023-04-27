import { React, useState } from 'react'
import SearchSection from './search-section'
import SearchReasult from './search-reasult'
import { DetailSection } from 'shared/utils'
import { SectionCard } from 'shared/components'
import { getSearchedResult } from 'server/api/city-search'
import { MarketSegmentView } from 'modules/market'


export const SearchDetails = ({ children, searchDetailsProps }) => {
    const [tableActive, setTableActive] = useState(false);
    const [selectedCityList, setSelectedCityList] = useState([]);
    const [selectedUseCaseList, setSelectedUseCaseList] = useState([]);
    const [searchedReasult, setSearchedReasult] = useState([]);
    const [cityNameResultList, setCityNameResultList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [activeSearch, setActiveSearch] = useState(true);
    const [marketSegmentData, setMarketSegmentData] = useState(null);
    let searchCriteria = {};
    console.log("children", children);
    if (children?.searchId) {
        if (children?.searchId === 1) {
            searchCriteria = {
                city: [{ name: 'Peoria city, Illinois', id: '1600000US1759000' }],
                useCase: [

                    { name: 'Young Professionals', id: 5, code: 'OR_YP', priority: 7 },
                    { name: 'Couples with Young Kids', id: 4, code: 'OR_CWYK', priority: 6 }
                ]
            }
        }
        if (children?.searchId === 2) {
            searchCriteria = {
                city: [{ name: 'Peoria city, Illinois', id: '1600000US1759000' }],
                useCase: []
            }
        }
        if (children?.searchId === 3) {
            searchCriteria = {
                city: [{ name: 'Peoria city, Illinois', id: '1600000US1759000' },
                { name: 'Chicago city, Illinois', id: '1600000US1714000' },
                { name: 'Springfield city, Illinois', id: '1600000US1772000' }],
                useCase: [


                    { name: 'Young Professionals', id: 5, code: 'OR_YP', priority: 7 },
                    { name: 'Couples with Young Kids', id: 4, code: 'OR_CWYK', priority: 6 }
                ]
            }
        }
    }

    const searchFunction = async () => {
        let location = selectedCityList.map((city) => {

            return {
                geo_id: city?.id,
                geographic_area_name: city?.name
            }
        })
        console.log("location", location);
        let useCase = selectedUseCaseList.map((element) => {

            return {
                use_case_group: element.code
            }
        })

        const payLoad = {
            location,
            usecase: useCase
        }
        const { data } = await getSearchedResult(payLoad)
        if (data) {

            setSearchedReasult(data);
            setCityNameResultList(selectedCityList)
            setTableActive(true);
        }

    }
    const reinitializeSearcheSection = () => {
        setActiveSearch(false);
        setTimeout(() => {
            setActiveSearch(true);

        },);
    }
    const handleClear = () => {
        setTableActive(false);
        setCityNameResultList([]);
        setSearchedReasult([]);
        setSelectedCityList([]);
        setCityList([])
        reinitializeSearcheSection();
    }
    console.log("selectedUseCaseList", selectedUseCaseList);
    console.log("selectedCityList", selectedCityList);
    const getAttributeValue = (e, attributeName) => {
        return e.target.getAttribute(attributeName)

    }
    const getCityIndex = (e) => {
        const indexValue = getAttributeValue(e, "indexid");
        console.log("searchedReasult", searchedReasult);
        const selectedResultRow = searchedReasult.general_stat.data[indexValue]
        const { tenYearPopGrowthRate, medianIncome, homePToIncome } = selectedResultRow;
        const cityName = cityNameResultList[indexValue].name
        setMarketSegmentData({ cityName, tenYearPopGrowthRate, medianIncome, homePToIncome })
    }
    const searchReasultProps = {
        cityNameResultList,
        searchedReasult,
        searchDetailsProps,
        getCityIndex

    }
    const marketSegmentProps = {
        marketSegmentData,
        setMarketSegmentData
    }
    return (
        <DetailSection>
            <SectionCard >
                {activeSearch ? <SearchSection searchCriteria={searchCriteria} cityList={cityList} setCityList={setCityList} selectedCityList={selectedCityList} selectedUseCaseList={selectedUseCaseList} setSelectedCityList={setSelectedCityList} setSelectedUseCaseList={setSelectedUseCaseList} tableActive={tableActive} handleClear={handleClear} searchFunction={searchFunction} /> : null}

            </SectionCard>

            {tableActive ?

                marketSegmentData ?
                    <MarketSegmentView props={marketSegmentProps} /> :
                    <SearchReasult searchReasultProps={searchReasultProps} />

                : null}
        </DetailSection>
    )
}
