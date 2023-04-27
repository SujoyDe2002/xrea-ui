import { Button, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { React, useState, useEffect } from 'react'
import { AutoCompleteSelect } from 'shared/utils'
import { AppStyle, clearLinkStyle, searchButtonContainer, searchButtonStyle, searchContainter } from 'app'
import { getCityList } from 'server/api/get-citylist'
import { getUseCaseList } from 'server/api/get-usecase-list'



const SearchSection = ({ searchCriteria, tableActive, setCityList, cityList, selectedUseCaseList, selectedCityList, searchFunction, handleClear, setSelectedCityList, setSelectedUseCaseList }) => {

  const searchSectionButton = {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 700,
    bgcolor: AppStyle.palette.primary.main,
    "&:hover": {
      bgcolor: AppStyle.palette.primary.main

    }
  }

  const [useCaseList, setUseCaseList] = useState([]);
  const [city, setCity] = useState();


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
        // setCity(e.currentTarget.value)
      }
    } else {

      setCityList([]);

    }

    // console.log("city ", city);
    // console.log("e.target.value", e.currentTarget.value);
  }

  let autoCompleteSelectPropsCity = {
    headerName: "Location (city, state)",
    tableActive,
    multiSelectInputList: cityList,
    setSelectedList: setSelectedCityList,
    selectedList: selectedCityList,
    list: true,
    handleChange: handleChangeCity,
  }
  let autoCompleteSelectPropsUseCase = {
    headerName: "Use case",
    tableActive,
    multiSelectInputList: useCaseList,
    setSelectedList: setSelectedUseCaseList,
    list: false,
    selectedList: selectedUseCaseList
  }

  return (
    <Box sx={searchContainter}>

      <Grid container spacing={1}>
        <Grid item xs={5}>
          <AutoCompleteSelect props={autoCompleteSelectPropsCity} />

        </Grid>
        <Grid item xs={5}>
          <AutoCompleteSelect props={autoCompleteSelectPropsUseCase} />
        </Grid>
        <Grid item xs={2}>
          <Stack sx={searchButtonContainer}>
            <Box sx={searchButtonStyle}>

              <Button sx={searchSectionButton} onClick={searchFunction}>

                <Typography variant='h2' fontSize={"1rem"}>Search</Typography>
                <Box sx={{ width: "20px", ml: 1 }}>

                  <img className='image' src='/playground_assets/logo_icon.png' />
                </Box>

              </Button>
            </Box>

            {tableActive ? <Box variant='contained' sx={clearLinkStyle} onClick={handleClear} >Clear search</Box> : null}
          </Stack>

        </Grid>

      </Grid>

    </Box>
  )
}

export default SearchSection