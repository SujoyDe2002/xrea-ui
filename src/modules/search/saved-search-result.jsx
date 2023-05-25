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
} from "app";
import { React, useEffect, useState, useContext } from "react";
import { SearchSectionHeading } from "./search-section-heading";
import {
  SectionSearchCard,
  DateFilter,
  getLocalStorageItem,
  setLocalStorageItem,
  GetAttribute,
  updateLocalStorage,
} from "shared/utils";
import { getSavedSearch } from "server/api/saved-search";
import { message_nodata } from "shared/constants/attachment-extention";
import { LoadingContext } from "store2/loading-context-provider";
import ConfirmationBox from "shared/utils/confirmation-box/confirmation-box";
import { deleteSearch } from "server/api/delete-search";
import { Link } from "react-router-dom";

const SavedSearchResult = ({ setSaveSearchId }) => {
  const [searchList, setSearchList] = useState(null);
  const [userId, setUserId] = useState(
    getLocalStorageItem("xrea")?.data?.loginData?.userId
  );
  const setSearchedData = async () => {
    const { response } = await getSavedSearch(userId);
    const { maxSavedLength } = response;
    let { savedList } = response;
    // todo make another function
    savedList = savedList.map((item) => {
      item.deleteConfirmationOpen = false;
      return item;
    });

    setSearchList(savedList);
    const noOfsearch = savedList.length;
    // const xreaData = getLocalStorageItem("xrea")?.data;
    // setLocalStorageItem("xrea", { ...xreaData, maxSavedLength, noOfsearch });
    // updateLocalStorage("xrea", { maxSavedLength, noOfsearch })
  };
  useEffect(() => {
    setSearchedData();
  }, []);

  const openModel = async (element) => {
    const currentIndex = GetAttribute(element, "index");
    console.log("currentIndex", currentIndex);
    let confirmationUpdatedSearchList = searchList.map((item, index) => {
      // console.log("savedList index", index);
      if (currentIndex == index) {
        item.deleteConfirmationOpen = true;
      } else {
        item.deleteConfirmationOpen = false;
      }
      return item;
    }, currentIndex);
    setSearchList(confirmationUpdatedSearchList);

    // const payLoad = {
    //     userId,
    //     searchName
    // }
    // await deleteSearch(payLoad);
    // setSearchedData();
  };
  const handleDelete = async (element) => {
    const searchName = GetAttribute(element, "searchName");
    const payLoad = {
      userId,
      searchName,
    };
    await deleteSearch(payLoad);
    setSearchedData();
  };
  const handleClose = (element) => {
    const updatedSearchList = searchList.map((item) => {
      item.deleteConfirmationOpen = false;
      return item;
    });
    setSearchList(updatedSearchList);
  };
  const handleSearch = (element) => {
    const searchId = GetAttribute(element, "searchId");

    setSaveSearchId(searchId);
  };
  return (
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
                <Box key={index}>
                  <Stack sx={{ ...searchSavedList, position: "relative" }}>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={4}
                        // searchId={save_search_id}
                        //onRowClick={handleSearch}
                      >
                        {/* <Link
                          to={{
                            pathname: "/search",
                            state: {
                              id: { save_search_id },
                            },
                          }}
                        > */}
                        <Button
                          searchId={save_search_id}
                          onClick={handleSearch}
                          sx={text1}
                        >
                          {save_search_title}
                          {/* </Link> */}k{" "}
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={{ ...text2, textAlign: "center" }}>
                          {DateFilter(created_on)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Stack alignItems={"end"}>
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
                        {/* todo make confrimation box and replace the BOX code */}
                        {/* <ConfirmationBox /> */}
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
                                  searchName={save_search_title}
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
                </Box>
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
  );
};

export default SavedSearchResult;
