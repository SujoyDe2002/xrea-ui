import { DetailSection } from 'shared/utils'
import React from 'react'
import { InfoCard, InsightCard, OnlyResponsible, Methodology } from 'shared/components/'
import { useEffect } from 'react'

// import DetailSection from './DetailSection'
// import InfoCard from './InfoCard'
// import OnlyResponsible from './OnlyResponsible'
// import ViewInsights from './ViewInsights'
// import XreaMethodology from './XreaMethodology'


export const HomeDetails = ({setDisbled}) => {

    useEffect(() => {
        setDisbled(false)
      
      }, [])
    
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
              
            </div>
        </DetailSection>
    )
}