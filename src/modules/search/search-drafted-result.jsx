import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  heading2,
  searchSavedList,
  text1,
  text2,
  confirmationBoxposition,
  button3,
  buttonContainer,
  smallMessageBox,
  centeralignment,
} from "app";
import { React, useEffect, useState, useContext } from "react";
import { SearchSectionHeading } from "./search-section-heading";
import {
  SectionSearchCard,
  dateFilter,
  getLocalStorageItem,
  GetAttribute,
  updateLocalStorage,
  DetailSection
} from "shared/utils";
import { getSavedSearch } from "server/api/saved-search";
import { message_nodata } from "shared/constants/attachment-extention";
import { LoadingContext } from "store2/loading-context-provider";
import ConfirmationBox from "shared/utils/confirmation-box/confirmation-box";
import { deleteSearch } from "server/api/delete-search";
import { Link, Route } from "react-router-dom";
import SearchSection from "./search-section";
import { OrderXrea } from "./order-xrea";
import { ResultList } from "./search-result-list";
import { useUser } from "@clerk/clerk-react";

const SearchDraftedResult = () => {
  const { searchTitleGetterSetter, userGetterSetter, setSaveSearchId  } = useContext(LoadingContext);
  const { setSearchTitle } = searchTitleGetterSetter;
  const { isSignedIn, user, isLoaded } = useUser();
  const [searchList, setSearchList] = useState(null);
  const userId = user?.id;

  const setSearchedData = async () => {
    const data = (await getSavedSearch(userId)).data;
    let { maxSavedLength, savedList } = data.response;
    // todo make another function
    savedList = savedList.map((item) => {
      item.deleteConfirmationOpen = false;
      return item;
    });

    setSearchList(savedList);
    const noOfsearch = savedList.length;
    updateLocalStorage("xrea", { maxSavedLength, noOfsearch })
  };
  useEffect(() => {
    if(isLoaded && isSignedIn)
    {
      setSearchedData();
    }
  }, [isLoaded, isSignedIn]);

  const openModel = async (element) => {
    const currentIndex = GetAttribute(element, "index");
    let confirmationUpdatedSearchList = searchList.map((item, index) => {
      if (currentIndex == index) {
        item.deleteConfirmationOpen = true;
      } else {
        item.deleteConfirmationOpen = false;
      }
      return item;
    }, currentIndex);
    setSearchList(confirmationUpdatedSearchList);
  };
  const handleDelete = async (element) => {
    const searchId = GetAttribute(element, "searchId");
    const payLoad = {
      searchId
    };
    await deleteSearch(payLoad);
    await setSearchedData();
  };
  const handleClose = (element) => {
    const updatedSearchList = searchList.map((item) => {
      item.deleteConfirmationOpen = false;
      return item;
    });
    setSearchList(updatedSearchList);
  };
  const handleSearch = (element) => {
    const searchId = GetAttribute(element, "searchid");
    const searchTitle = GetAttribute(element, "searchTitle");
    setSearchTitle(searchTitle);
    setSaveSearchId(searchId);
  };
  const draftrowtextstyle = {
    ...text1,
    whiteSpace: "normal",
    maxWidth: "500px",
    overflowWrap: "break-word",
    p: "2px 0"
  };
  return (
    <>

      <DetailSection>
        
        <SearchSection />
        <SectionSearchCard>
          <Box width={"100%"}>
            <SearchSectionHeading>
              <Typography sx={heading2}> Saved Searches</Typography>
            </SearchSectionHeading>
            {searchList?.length > 0 ? (
              searchList.map(
                (
                  {
                    save_search_title,
                    created_on,
                    deleteConfirmationOpen,
                    save_search_id,
                  },
                  index
                ) => {
                  return (

                    <Stack key={index} sx={{ ...searchSavedList, position: "relative" }}>
                      <Grid
                        container spacing={1}
                      >
                        <Grid
                          container
                          spacing={1}
                          item xs={10}
                          searchid={save_search_id}
                          searchTitle={save_search_title}
                          onClick={handleSearch}
                          sx={{ cursor: "pointer" }}
                        >
                          <Grid item xs={5}>
                            <Typography
                              sx={draftrowtextstyle}
                            >
                              {save_search_title}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Stack sx={centeralignment}>
                              <Typography sx={{ ...text2, textAlign: "center" }}>
                                {dateFilter(created_on)}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item xs={2}>

                          <Stack alignItems={"end"} justifyContent={"center"} height={"100%"}>
                            <Button
                              sx={{
                                justifyContent: "end",
                                width: "fit-content",
                                padding: 0,
                              }}
                              index={index}
                              onClick={openModel}
                            >
                              <Typography sx={{ textAlign: "right" }}>
                                X
                              </Typography>
                            </Button>
                          </Stack>
                          {deleteConfirmationOpen && (
                            <Box sx={confirmationBoxposition}>
                              <Box sx={smallMessageBox}>
                                Delete this saved search?
                                <Stack sx={buttonContainer}>
                                  <Button index={index} onClick={handleClose}>
                                    Cancel
                                  </Button>
                                  <Button
                                    sx={button3}
                                    searchId={save_search_id}
                                    onClick={handleDelete}
                                  >
                                    Delete
                                  </Button>
                                </Stack>
                              </Box>
                            </Box>
                          )}

                        </Grid>
                      </Grid>
                    </Stack>

                  );
                }
              )
            ) : (
              <Box>
                <Stack sx={searchSavedList}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography sx={{ ...text1, textAlign: "center" }}>
                        {message_nodata}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            )}
          </Box>
        </SectionSearchCard>
      </DetailSection>
      <OrderXrea />
    </>
  );
};

export default SearchDraftedResult;
