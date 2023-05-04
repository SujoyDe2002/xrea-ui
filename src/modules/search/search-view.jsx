import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchDetails } from './search-details'
import { MarketSegmentView } from 'modules/market'
import { Box } from '@mui/material'
import { searchViewcontainer } from 'app'
import { useEffect } from 'react'

export const SearchView = ({setDisbled}) => {

  const location = useLocation()
  const { id } = location?.state || {}
  const SearchCriteria = {
    searchId: id
  }
  useEffect(() => {
    setDisbled(id !==undefined? true : false)
  
  }, [])
  
  const [marketSegmentData, setMarketSegmentData] = useState(null);


  const handleOnClick = () => {
    setMarketSegmentData({ homePToIncome: "5.5", tenYearPopGrowthRate: "0.3%", medianIncome: "$49.0k" });

  }
  const searchDetailsProps = {
    handleOnClick: handleOnClick,
    setMarketSegmentData
  }
  const marketSegmentProps = {
    marketSegmentData,
    setMarketSegmentData
  }
  const handleClick = () => {
    console.log("setMarketSegmentData", setMarketSegmentData);
    setMarketSegmentData(null);
  }
  return (
    <Box sx={searchViewcontainer}>
      
      {/* <Box sx={{ display: marketSegmentData ? "block" : "none" }}>
        <MarketSegmentView  setMarketSegmentData={setMarketSegmentData} />
        
      </Box> */}
      <Box sx={{ display: marketSegmentData ? "none" : "block", paddingBottom: "2rem"}}>
        <SearchDetails searchDetailsProps={searchDetailsProps}>
          {SearchCriteria}
        </SearchDetails>
      </Box>
    </Box>
  )
}

