import { DetailSection } from 'shared/utils'
import React from 'react'
import { InfoCard, InsightCard, OnlyResponsible, Methodology } from 'shared/components/'


export const HomeDetails = () => {
    return (
        <DetailSection >
            <div >
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
                <br />
                <br />
            </div>
        </DetailSection>
    )
}