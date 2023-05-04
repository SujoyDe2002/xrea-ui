import { Button, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { React, useState, useEffect } from 'react'
import { AutoCompleteSelect } from 'shared/utils'
import { AppStyle, clearLinkStyle, disable, searchButtonContainer, searchButtonStyle, searchContainter, searchSectionButton } from 'app'
import { getCityList } from 'server/api/get-citylist'
import { getUseCaseList } from 'server/api/get-usecase-list'



const SearchSection = ({ searchCriteria, tableActive, setCityList, cityList, selectedUseCaseList, selectedCityList, searchFunction, handleClear, setSelectedCityList, setSelectedUseCaseList }) => {

  const [useCaseList, setUseCaseList] = useState([]);
  const [city, setCity] = useState(); 
  let disabled = searchCriteria !== undefined ? true : false;
  useEffect(() => {
    (async () => {

      const { data } = await getUseCaseList();
      setUseCaseList(data);

      if (searchCriteria?.city) {
        setSelectedCityList(searchCriteria?.city);
        searchContainter = {
          ...searchContainter,
          pointerEvents: "none",
          opacity: "0.4"
        }
      }
      if (searchCriteria?.useCase) {
        setSelectedUseCaseList(searchCriteria?.useCase);
      }

      return () => {
        if (searchCriteria?.city) {
          delete searchContainter.opacity;
          delete searchContainter.pointerEvents;
        }
      }
    })()

  }, [])
  useEffect(() => {
    if (searchCriteria?.city) {
      console.log("searchCriteria", searchCriteria.city);
      searchFunction();
    }
  }, [selectedCityList])

  const handleChangeCity = async (e) => {

    if (selectedCityList.length <= 4) {
      const { value } = e.currentTarget;
      if (value.length >= 2) {
        const { data } = await getCityList(value);
        console.log("cityList", data);
        setCityList(data)
      }
    } else {

      setCityList([]);

    }

  }

  let autoCompleteSelectPropsCity = {
    headerName: "Location (city, state)",
    tableActive,
    multiSelectInputList: cityList,
    setSelectedList: setSelectedCityList,
    selectedList: selectedCityList,
    list: true,
    handleChange: handleChangeCity,
    disabled
  }
  let autoCompleteSelectPropsUseCase = {
    headerName: "Use case",
    tableActive,
    multiSelectInputList: useCaseList,
    setSelectedList: setSelectedUseCaseList,
    list: false,
    selectedList: selectedUseCaseList,
    disabled
  }
  return (
    <Box sx={searchContainter}>

      <Grid container spacing={1}>
        <Grid item xs={5.25}>
          <AutoCompleteSelect props={autoCompleteSelectPropsCity} />

        </Grid>
        <Grid item xs={5.25}>
          <AutoCompleteSelect props={autoCompleteSelectPropsUseCase} />
        </Grid>
        <Grid item xs={1.5}>
          <Stack sx={searchButtonContainer}>
            <Box sx={searchButtonStyle}>

              <Button sx={{ ...searchSectionButton, bgcolor: disabled ? "#cccccc" : AppStyle.palette.primary.main }} onClick={searchFunction} disabled={disabled}>

                <Typography variant='h2' fontSize={"1.125rem"}>Search</Typography>
                <Box sx={{ width: "20px", ml: 1 }}>

                  <img className='image' src='/playground_assets/logo_icon.png' />
                </Box>

              </Button>
              {disabled ? <Box variant='contained' sx={{...clearLinkStyle, ...disable}}>Clear search</Box> :
                (tableActive ? <Box variant='contained' sx={clearLinkStyle} onClick={handleClear}>Clear search</Box> : null)
              }

            </Box>

          </Stack>

        </Grid>

      </Grid>

    </Box>
  )
}

export default SearchSection