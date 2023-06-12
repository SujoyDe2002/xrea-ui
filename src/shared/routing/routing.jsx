import { HomeDetails } from 'modules/home/homeDetails'
import { MarketSegmentView } from 'modules/market'
import { PricingContent } from 'modules/pricing'
import SearchDraftedResult from 'modules/search/search-drafted-result'
import SearchReasult from 'modules/search/search-reasult'
import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'

const Routing = () => {


    
    return (
        <Switch>
            <Route exact path="/">
                <HomeDetails/>
            </Route>
            {/* <PrivateRoute component={SearchDraftedResult}  exact path="/saved_searches"/> */}
            <Route exact path="/saved_searches">
                <SearchDraftedResult />
            </Route>
            <Route exact path="/search_result">
                <SearchReasult />
            </Route>
            <Route exact path="/market_segment">
                <MarketSegmentView />
            </Route>
            <Route exact path="/pricing">
                <PricingContent />
            </Route>
        </Switch>
    )
}

export default Routing