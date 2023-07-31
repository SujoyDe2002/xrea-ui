import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
    CssBaseline,
    Grid,
    GlobalStyles,
    Link,
    Container,
    Stack
} from "@mui/material";
import { AppStyle } from 'app';
import ContentWrapper from 'shared/utils/layout/content-wrapper';
import ScrollToTop from 'shared/utils/scroll-to/scroll-to-top';


const tiers = [
    {
        title: 'Free',
        price: '19',
        description: [
            'Consequat ex proident',
            'Deserunt sit cupidatat',
            'Amet id ea et nisi cillum '
        ],
        buttonText: 'Get started',
        buttonVariant: 'outlined',
        priceTitle: 'Basic'
    },
    {
        title: 'Most popular',
        subheader: 'Most popular',
        price: '59',
        description: [
            'I’m editing text here',
            'Deserunt sit cupidatat adipisicing',
            'Amet id ea et nisi cillum consectetur',
            'Excepteur nisi eiusmod proident',
            'Magna eu anim commodo qui nisif'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
        priceTitle: 'Essential'
    },
    {
        title: 'Enterprise',
        price: '119',
        description: [
            'Consequat ex proident',
            'Deserunt sit cupidatat',
            'Amet id ea et nisi cillum '
        ],
        buttonText: 'Get started',
        buttonVariant: 'outlined',
        priceTitle: 'Premium'
    },
];

const PricingContent = () => {


    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <Box sx={{
                height: 'calc(100% - 100px)',
                width: "100%",
                paddingBottom: "32px",
                backgroundColor: AppStyle.palette.common.white
            }}>

                <ContentWrapper>
                    {/* Hero unit */}
                    <Container disableGutters sx={{ pt: 2, pb: 6 }}>
                        {/* to do page heading */}
                        {/* <PageHeading1 /> */}
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            sx={{ fontSize: '3.7vw', lineHeight: '150%' }}
                            gutterBottom
                        >
                            Upgrade your XREA Experience

                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ width: '70%', margin: 'auto', fontSize: { xs: ".95rem", md: "1.158vw" } }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                        </Typography>
                    </Container>
                    {/* End hero unit */}
                    <Box sx={{ padding: "24px", maxWidth: "1317px", margin: "auto", padding: '0' }}>
                        <Grid container spacing={0} alignItems="center">
                            {tiers.map((tier) => (
                                // Enterprise card is full width at sm breakpoint
                                <Grid
                                    item
                                    key={tier.title}
                                    xs={12}
                                    md={tier.title === 'Most popular' ? 5 : 3.5}
                                    sx={{
                                        bottom: '16px'
                                    }}
                                >
                                    <Card sx={{
                                        border: tier.title === 'Most popular' ? '2px solid #3478D6' : 'none',
                                        borderRadius: '12px',
                                        height: tier.title === 'Most popular' ? '100%' : '65.47%',
                                        margin: "10px 0"
                                    }}>
                                        <CardHeader
                                            title={tier.title}
                                            // subheader={tier.subheader}
                                            titleTypographyProps={{ align: 'center', fontWeight: '700', color: 'white', fontSize: { md: "1.2vw" } }}
                                            action={tier.title === 'Most popular'}
                                            subheaderTypographyProps={{
                                                align: 'center',

                                            }}
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? '#3478D6'
                                                        : theme.palette.grey[700],
                                                display: tier.title === 'Most popular' ? 'visible' : 'none',
                                                fontWeight: '700'
                                            }}
                                        />
                                        <CardContent sx={{
                                            padding: '0', "&:last-child": {
                                                padding: 0
                                            }
                                        }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline',
                                                    mb: 2,
                                                    padding: '2rem 40px',
                                                    height: { xs: "fit-content", lg: tier.title === 'Most popular' ? '16rem' : '11.5rem' }
                                                }}
                                            >
                                                <Stack>
                                                    <Typography component="h2" variant="h3" sx={{ fontWeight: '700', fontSize: { xs: "3.78vw", md: tier.title === 'Most popular' ? '2.78vw' : '1.86vw' }, textAlign: "center" }} color="text.primary">
                                                        {tier.priceTitle}
                                                    </Typography>
                                                    <Typography component="h2" variant="h3" sx={{ fontSize: { xs: "4vw", md: tier.title === 'Most popular' ? '4.65vw' : '2.78vw' }, fontWeight: '700' }} color="text.primary">
                                                        ${tier.price + " "}
                                                        <Typography variant="span" sx={{ fontSize: { xs: '4vw', md: "1.5rem" }, fontWeight: '400' }} color="text.secondary">
                                                            /month
                                                        </Typography>
                                                    </Typography>
                                                </Stack>


                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'block',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline',
                                                    mb: 2,
                                                    margin: '0',
                                                    padding: '1rem 2rem',
                                                    background: '#F5F5F5',

                                                }}
                                            >
                                                <Stack sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                                    {tier.description.map((line) => (

                                                        <Stack sx={{ flexDirection: 'row' }}>

                                                            <Box sx={{ display: 'flex', ml: 1 }}>
                                                                <img className='image' src='/playground_assets/pricing_check.svg' />
                                                            </Box>


                                                            <Typography

                                                                variant="subtitle1"
                                                                align="center"
                                                                key={line}
                                                                sx={{ lineHeight: { xs: '1.75', lg: '2.75' }, fontSize: { xs: ".95rem", md: "1.18vw" }, textAlign: 'left', marginLeft: '1rem' }}
                                                            >
                                                                {line}
                                                            </Typography>

                                                        </Stack>


                                                    ))}
                                                </Stack>

                                                <Button
                                                    fullWidth
                                                    variant={tier.buttonVariant}
                                                    sx={{
                                                        padding: '1rem 1.5rem',
                                                        marginTop: '1rem',
                                                        background: tier.title === 'Most popular' ? '#3478D6' : 'rgba(129, 144, 187, 0.2)',
                                                        borderRadius: '8px',
                                                        fontSize: { xs: "0.875rem", md: ".9vw" }
                                                    }}
                                                >
                                                    {tier.buttonText}
                                                </Button>
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </ContentWrapper>

            </Box>

        </React.Fragment >
    );
}

export default ScrollToTop(PricingContent)