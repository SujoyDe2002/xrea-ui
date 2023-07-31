import { DetailSection, removeLocalStorageItems } from "shared/utils";
import React, { useContext } from "react";
import {
  InfoCard,
  InsightCard,
  OnlyResponsible,
  Methodology,
} from "shared/components/";
import { useEffect } from "react";
import { LoadingContext } from "store2/loading-context-provider";


export const HomeDetails = () => {
  const { userGetterSetter } = useContext(LoadingContext);
  const { setUser } = userGetterSetter;
  useEffect(() => {
    removeLocalStorageItems(["xrea"]);
    setUser(false);
  }, []);


  return (
    <DetailSection>
      <div>
        <InfoCard />
        <br />
        <br />

        <InsightCard />
        <br />
        <br />

        <OnlyResponsible />

        <br />
        <br />
        <Methodology />
        <br />
        <br />
      </div>
    </DetailSection>
  );
};
