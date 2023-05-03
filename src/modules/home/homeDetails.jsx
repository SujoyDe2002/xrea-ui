import { DetailSection } from 'shared/utils'
import React from 'react'
import { InfoCard, InsightCard, OnlyResponsible, Methodology } from 'shared/components/'

// import DetailSection from './DetailSection'
// import InfoCard from './InfoCard'
// import OnlyResponsible from './OnlyResponsible'
// import ViewInsights from './ViewInsights'
// import XreaMethodology from './XreaMethodology'


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
                <br/>
                <br/>
                <br />
                <br />
            </div>
        </DetailSection>
    )
}